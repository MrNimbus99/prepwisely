const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

export const PRICE_IDS = {
  MONTHLY: 'price_1Sz5qOETKsGuZh3ds7lwQw8P',
  ANNUAL: 'price_1Sz5qPETKsGuZh3d6oYjKBul',
  LIFETIME: 'price_1Sz5qQETKsGuZh3dD9HMyxMT',
  
  // Individual Certs - USD $49 each
  'cloud-practitioner': 'price_1Sz5yAETKsGuZh3dYz1jk7Db',
  'ai-practitioner': 'price_1Sz5yBETKsGuZh3dHqZe0xKD',
  'solutions-architect-associate': 'price_1Sz5yCETKsGuZh3d6AytlJd2',
  'developer-associate': 'price_1Sz5yCETKsGuZh3dOdoYnJQW',
  'cloudops-engineer-associate': 'price_1Sz5yDETKsGuZh3d5ZiJHwuy',
  'data-engineer-associate': 'price_1Sz5yEETKsGuZh3doWIbNDKJ',
  'machine-learning-engineer-associate': 'price_1Sz5yFETKsGuZh3dtQ77V1l7',
  'solutions-architect-professional': 'price_1Sz5yGETKsGuZh3d4rZNH2jF',
  'devops-engineer-professional': 'price_1Sz5yGETKsGuZh3dTNOknjsj',
  'generative-ai-developer-professional': 'price_1Sz5yHETKsGuZh3dg7ELNwGS',
  'advanced-networking-specialty': 'price_1Sz5yIETKsGuZh3dxa7ocfXK',
  'security-specialty': 'price_1Sz5yJETKsGuZh3dQylBg1Up',
  'machine-learning-specialty': 'price_1Sz5yKETKsGuZh3d0LXP0Kd5',
  
  // Bundles - USD prices
  ASSOCIATE_BUNDLE: 'price_1Sz5yLETKsGuZh3dAzQErHjz',
  PROFESSIONAL_BUNDLE: 'price_1Sz5yLETKsGuZh3dzu9ArWCL',
  SPECIALTY_BUNDLE: 'price_1Sz5yMETKsGuZh3dO8n8c7N2'
}

export async function createCheckoutSession(priceId: string, userId: string) {
  const response = await fetch(`${API_BASE}/api/billing/checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, userId })
  })
  
  if (!response.ok) {
    throw new Error('Failed to create checkout session')
  }
  
  return response.json()
}

export async function createPortalSession(userId: string) {
  const response = await fetch(`${API_BASE}/api/billing/portal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  })
  
  if (!response.ok) {
    throw new Error('Failed to create portal session')
  }
  
  return response.json()
}

export async function getSubscriptionStatus(userId: string) {
  const response = await fetch(`${API_BASE}/api/billing/subscription?userId=${userId}`)
  
  if (!response.ok) {
    throw new Error('Failed to get subscription status')
  }
  
  return response.json()
}
