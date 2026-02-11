const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

export const PRICE_IDS = {
  // Subscriptions - Live prices ($20/mo, $70/yr, $100 lifetime)
  MONTHLY: 'price_1SzcZNEbihaDPG1kNHu1zEPa',
  ANNUAL: 'price_1SzcZOEbihaDPG1kwsD6PVEh',
  LIFETIME: 'price_1SzcZOEbihaDPG1krNLLplWG',
  
  // Individual Certs - USD $10 each (Cloud Practitioner FREE)
  'cloud-practitioner': 'price_1SzR79ETKsGuZh3dFwYceoLe',
  'ai-practitioner': 'price_1SzR78ETKsGuZh3d7OpgaPJS',
  'solutions-architect-associate': 'price_1SzR78ETKsGuZh3dK7qPc9GZ',
  'developer-associate': 'price_1SzR6sETKsGuZh3diuRdi6LJ',
  'cloudops-engineer-associate': 'price_1SzR6wETKsGuZh3d3vd4lrvd',
  'data-engineer-associate': 'price_1SzR6tETKsGuZh3dSDD6BmZY',
  'machine-learning-engineer-associate': 'price_1SzR6tETKsGuZh3dgiAV7cN0',
  'solutions-architect-professional': 'price_1SzR6uETKsGuZh3dmDtDZrpD',
  'devops-engineer-professional': 'price_1SzR6uETKsGuZh3dIRB47zmD',
  'generative-ai-developer-professional': 'price_1SzR6tETKsGuZh3deM4ldTOd',
  'advanced-networking-specialty': 'price_1SzR6wETKsGuZh3dv5OICXNW',
  'security-specialty': 'price_1SzR6vETKsGuZh3dcQ9x9QNt',
  'machine-learning-specialty': 'price_1SzR6wETKsGuZh3dyRdCYJ5k',
  
  // Bundles - USD prices (same as before)
  ASSOCIATE_BUNDLE: 'price_1SzR6uETKsGuZh3dQL2S8qOl',
  PROFESSIONAL_BUNDLE: 'price_1SzR6vETKsGuZh3dP2tSYj9k',
  SPECIALTY_BUNDLE: 'price_1SzR6xETKsGuZh3duUWYKVcK'
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
