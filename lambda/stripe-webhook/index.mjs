import Stripe from 'stripe'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb'

const secretsClient = new SecretsManagerClient({ region: 'ap-southeast-2' })
const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'ap-southeast-2' }))

const EVENTS_TABLE = process.env.EVENTS_TABLE
const CUSTOMERS_TABLE = process.env.CUSTOMERS_TABLE

let stripe
let webhookSecret

async function getSecrets() {
  if (stripe && webhookSecret) return { stripe, webhookSecret }
  
  const response = await secretsClient.send(new GetSecretValueCommand({ SecretId: 'stripe/test' }))
  const secrets = JSON.parse(response.SecretString)
  
  stripe = new Stripe(secrets.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' })
  webhookSecret = secrets.STRIPE_WEBHOOK_SECRET
  
  return { stripe, webhookSecret }
}

async function isEventProcessed(eventId) {
  try {
    const result = await dynamoClient.send(new GetCommand({
      TableName: EVENTS_TABLE,
      Key: { eventId }
    }))
    return !!result.Item
  } catch (error) {
    console.error('Error checking event:', error)
    return false
  }
}

async function markEventProcessed(eventId) {
  await dynamoClient.send(new PutCommand({
    TableName: EVENTS_TABLE,
    Item: {
      eventId,
      processedAt: new Date().toISOString(),
      ttl: Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60)
    }
  }))
}

async function updateCustomer(customerId, data) {
  await dynamoClient.send(new PutCommand({
    TableName: CUSTOMERS_TABLE,
    Item: {
      customerId,
      ...data,
      updatedAt: new Date().toISOString()
    }
  }))
}

export const handler = async (event) => {
  try {
    const { stripe, webhookSecret } = await getSecrets()
    
    const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature']
    if (!signature) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No signature' }) }
    }

    let stripeEvent
    try {
      stripeEvent = stripe.webhooks.constructEvent(event.body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid signature' }) }
    }

    if (await isEventProcessed(stripeEvent.id)) {
      console.log('Event already processed:', stripeEvent.id)
      return { statusCode: 200, body: JSON.stringify({ received: true, duplicate: true }) }
    }

    console.log('Processing event:', stripeEvent.type)

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object
        const userId = session.metadata?.userId
        
        if (userId) {
          await updateCustomer(session.customer, {
            userId,
            email: session.customer_details?.email,
            status: session.mode === 'subscription' ? 'active' : 'lifetime'
          })
        }
        console.log('Checkout completed:', session.id)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object
        const customer = await stripe.customers.retrieve(subscription.customer)
        
        await updateCustomer(subscription.customer, {
          userId: customer.metadata?.userId,
          subscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end,
          priceId: subscription.items.data[0]?.price.id
        })
        console.log('Subscription updated:', subscription.id, 'Status:', subscription.status)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object
        await updateCustomer(subscription.customer, {
          subscriptionId: subscription.id,
          status: 'canceled',
          currentPeriodEnd: subscription.current_period_end
        })
        console.log('Subscription deleted:', subscription.id)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = stripeEvent.data.object
        console.log('Payment succeeded:', invoice.id)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object
        await updateCustomer(invoice.customer, { status: 'past_due' })
        console.log('Payment failed:', invoice.id)
        break
      }

      default:
        console.log('Unhandled event type:', stripeEvent.type)
    }

    await markEventProcessed(stripeEvent.id)

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' })
    }
  }
}
