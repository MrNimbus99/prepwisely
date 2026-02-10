import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'
import Stripe from 'stripe'

const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: 'ap-southeast-2' }))
const cognitoClient = new CognitoIdentityProviderClient({ region: 'ap-southeast-2' })
const secretsClient = new SecretsManagerClient({ region: 'ap-southeast-2' })

const USER_POOL_ID = 'ap-southeast-2_Y7EdgS9Vt'
const CUSTOMERS_TABLE = 'stripe-customers-prod'

let stripe

async function getStripe() {
  if (!stripe) {
    const secret = await secretsClient.send(new GetSecretValueCommand({ SecretId: 'stripe/test' }))
    const { STRIPE_SECRET_KEY } = JSON.parse(secret.SecretString)
    stripe = new Stripe(STRIPE_SECRET_KEY)
  }
  return stripe
}

export const handler = async (event) => {
  const path = event.path || event.rawPath
  const method = event.httpMethod || event.requestContext?.http?.method

  try {
    // GET /api/admin/users - List all users
    if (path === '/api/admin/users' && method === 'GET') {
      const cognitoUsers = await cognitoClient.send(new ListUsersCommand({ UserPoolId: USER_POOL_ID, Limit: 60 }))
      
      const users = cognitoUsers.Users.map(u => ({
        userId: u.Attributes.find(a => a.Name === 'sub')?.Value,
        email: u.Attributes.find(a => a.Name === 'email')?.Value,
        createdAt: u.UserCreateDate?.toISOString(),
        status: u.UserStatus
      }))

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ users })
      }
    }

    // GET /api/admin/customers - List all Stripe customers with subscriptions
    if (path === '/api/admin/customers' && method === 'GET') {
      const { Items } = await dynamoClient.send(new ScanCommand({ TableName: CUSTOMERS_TABLE }))
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ customers: Items || [] })
      }
    }

    // GET /api/admin/payments - List all payments from Stripe
    if (path === '/api/admin/payments' && method === 'GET') {
      const stripeClient = await getStripe()
      const charges = await stripeClient.charges.list({ limit: 100 })
      
      const payments = charges.data.map(c => ({
        id: c.id,
        amount: c.amount,
        currency: c.currency,
        status: c.status,
        customer_email: c.billing_details?.email || c.receipt_email,
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

    // GET /api/admin/subscriptions - List all subscriptions
    if (path === '/api/admin/subscriptions' && method === 'GET') {
      const stripeClient = await getStripe()
      const subscriptions = await stripeClient.subscriptions.list({ limit: 100, expand: ['data.customer'] })
      
      const subs = subscriptions.data.map(s => ({
        id: s.id,
        customer_email: s.customer?.email,
        status: s.status,
        plan: s.items.data[0]?.price?.id,
        amount: s.items.data[0]?.price?.unit_amount,
        current_period_end: s.current_period_end,
        created: s.created
      }))

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ subscriptions: subs })
      }
    }

    // GET /api/admin/stats - Revenue and user stats
    if (path === '/api/admin/stats' && method === 'GET') {
      const stripeClient = await getStripe()
      const charges = await stripeClient.charges.list({ limit: 100 })
      const subscriptions = await stripeClient.subscriptions.list({ limit: 100 })
      const cognitoUsers = await cognitoClient.send(new ListUsersCommand({ UserPoolId: USER_POOL_ID, Limit: 60 }))

      const totalRevenue = charges.data.reduce((sum, c) => sum + (c.status === 'succeeded' ? c.amount : 0), 0) / 100
      const thisMonth = charges.data
        .filter(c => new Date(c.created * 1000).getMonth() === new Date().getMonth())
        .reduce((sum, c) => sum + (c.status === 'succeeded' ? c.amount : 0), 0) / 100

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          totalRevenue,
          monthlyRevenue: thisMonth,
          totalUsers: cognitoUsers.Users.length,
          activeSubscriptions: subscriptions.data.filter(s => s.status === 'active').length,
          totalPayments: charges.data.filter(c => c.status === 'succeeded').length
        })
      }
    }

    return {
      statusCode: 404,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Not found' })
    }
  } catch (error) {
    console.error('Admin API error:', error)
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    }
  }
}
