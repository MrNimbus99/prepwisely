import Stripe from 'stripe'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

const secretsClient = new SecretsManagerClient({ region: 'ap-southeast-2' })
const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'ap-southeast-2' }))

const CUSTOMERS_TABLE = process.env.CUSTOMERS_TABLE
const SUCCESS_URL = process.env.SUCCESS_URL || 'https://nestedcerts.com/dashboard?session_id={CHECKOUT_SESSION_ID}'
const CANCEL_URL = process.env.CANCEL_URL || 'https://nestedcerts.com/pricing'

let stripe
let publishableKey

async function getSecrets() {
  if (stripe) return { stripe, publishableKey }
  
  const response = await secretsClient.send(new GetSecretValueCommand({ SecretId: 'stripe/test' }))
  const secrets = JSON.parse(response.SecretString)
  
  stripe = new Stripe(secrets.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' })
  publishableKey = secrets.STRIPE_PUBLISHABLE_KEY
  
  return { stripe, publishableKey }
}

async function getCustomerByUserId(userId) {
  const result = await dynamoClient.send(new QueryCommand({
    TableName: CUSTOMERS_TABLE,
    IndexName: 'UserIdIndex',
    KeyConditionExpression: 'userId = :uid',
    ExpressionAttributeValues: { ':uid': userId }
  }))
  return result.Items?.[0]
}

export const handler = async (event) => {
  const path = event.rawPath || event.path
  const method = event.requestContext?.http?.method || event.httpMethod

  try {
    const { stripe, publishableKey } = await getSecrets()

    // GET /config - Return publishable key
    if (path === '/api/billing/config' && method === 'GET') {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ publishableKey })
      }
    }

    // GET /api/billing/payments - Get user payments
    if (path.startsWith('/api/billing/payments') && method === 'GET') {
      const userId = event.queryStringParameters?.userId
      if (!userId) {
        return {
          statusCode: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Missing userId' })
        }
      }

      const customer = await getCustomerByUserId(userId)
      if (!customer?.customerId) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ payments: [] })
        }
      }

      const charges = await stripe.charges.list({ customer: customer.customerId, limit: 100 })
      const payments = charges.data.map(c => ({
        id: c.id,
        amount: c.amount,
        currency: c.currency,
        status: c.status,
        created: c.created,
        description: c.description,
        receipt_url: c.receipt_url
      }))

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ payments })
      }
    }

    // POST /payment-intent - Create payment intent for embedded checkout
    if (path === '/api/billing/payment-intent' && method === 'POST') {
      const body = JSON.parse(event.body)
      const { priceId, userId, email, name } = body

      if (!priceId || !userId) {
        return {
          statusCode: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Missing priceId or userId' })
        }
      }

      let customer = await getCustomerByUserId(userId)
      let customerId = customer?.customerId

      if (!customerId) {
        const stripeCustomer = await stripe.customers.create({ 
          metadata: { userId },
          email: email,
          name: name
        })
        customerId = stripeCustomer.id
      } else {
        // Update customer with email and name if provided
        if (email || name) {
          await stripe.customers.update(customerId, {
            email: email,
            name: name
          })
        }
      }

      const price = await stripe.prices.retrieve(priceId)
      
      // Check if it's a subscription or one-time payment
      if (price.type === 'recurring') {
        // Create subscription with payment intent
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: priceId }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent'],
          metadata: { userId, priceId }
        })

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ 
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id
          })
        }
      } else {
        // One-time payment
        const paymentIntent = await stripe.paymentIntents.create({
          amount: price.unit_amount,
          currency: price.currency,
          customer: customerId,
          automatic_payment_methods: { enabled: true },
          metadata: { userId, priceId }
        })

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
        }
      }
    }

    // POST /checkout-session - Create checkout
    if (path === '/api/billing/checkout-session' && method === 'POST') {
      const body = JSON.parse(event.body)
      const { priceId, userId } = body

      if (!priceId || !userId) {
        return {
          statusCode: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Missing priceId or userId' })
        }
      }

      // Check if customer exists
      let customer = await getCustomerByUserId(userId)
      let customerId = customer?.customerId

      // Create customer if doesn't exist
      if (!customerId) {
        const stripeCustomer = await stripe.customers.create({
          metadata: { userId }
        })
        customerId = stripeCustomer.id
      }

      // Determine if it's a subscription or one-time payment
      const price = await stripe.prices.retrieve(priceId)
      const mode = price.type === 'recurring' ? 'subscription' : 'payment'

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: SUCCESS_URL,
        cancel_url: CANCEL_URL,
        automatic_tax: { enabled: true },
        customer_update: { address: 'auto' },
        metadata: { userId }
      })

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ sessionId: session.id, url: session.url })
      }
    }

    // POST /portal - Create customer portal session
    if (path === '/api/billing/portal' && method === 'POST') {
      const body = JSON.parse(event.body)
      const { userId } = body

      if (!userId) {
        return {
          statusCode: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Missing userId' })
        }
      }

      const customer = await getCustomerByUserId(userId)
      if (!customer?.customerId) {
        return {
          statusCode: 404,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'No customer found' })
        }
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: customer.customerId,
        return_url: 'https://nestedcerts.com/dashboard',
        configuration: undefined // Use default portal config which includes billing details
      })

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ url: session.url })
      }
    }

    // GET /subscription - Get user subscription status
    if (path === '/api/billing/subscription' && method === 'GET') {
      const userId = event.queryStringParameters?.userId

      if (!userId) {
        return {
          statusCode: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Missing userId' })
        }
      }

      const customer = await getCustomerByUserId(userId)
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          hasAccess: customer?.status === 'active' || customer?.status === 'trialing',
          status: customer?.status || 'none',
          currentPeriodEnd: customer?.currentPeriodEnd,
          purchasedCerts: customer?.purchasedCerts || []
        })
      }
    }

    // GET /api/admin/users - List all users
    if (path === '/api/admin/users' && method === 'GET') {
      const result = await dynamoClient.send(new ScanCommand({
        TableName: CUSTOMERS_TABLE,
        ProjectionExpression: 'userId, customerId, createdAt'
      }))
      
      // Get emails from Stripe
      const usersWithEmails = await Promise.all(
        result.Items.map(async (item) => {
          try {
            const customer = await stripe.customers.retrieve(item.customerId)
            return {
              userId: item.userId,
              email: customer.email,
              createdAt: item.createdAt || new Date().toISOString()
            }
          } catch (e) {
            return {
              userId: item.userId,
              email: 'Unknown',
              createdAt: item.createdAt || new Date().toISOString()
            }
          }
        })
      )
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ users: usersWithEmails })
      }
    }

    // GET /api/admin/payments - List all payments
    if (path === '/api/admin/payments' && method === 'GET') {
      const charges = await stripe.charges.list({ limit: 100 })
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ payments: charges.data })
      }
    }

    return {
      statusCode: 404,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Not found' })
    }

  } catch (error) {
    console.error('Billing API error:', error)
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    }
  }
}
