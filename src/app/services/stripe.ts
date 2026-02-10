const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

export const PRICE_IDS = {
  MONTHLY: 'price_1Sz5qOETKsGuZh3ds7lwQw8P',
  ANNUAL: 'price_1Sz5qPETKsGuZh3d6oYjKBul',
  LIFETIME: 'price_1Sz5qQETKsGuZh3dD9HMyxMT',
  
  // Individual Certs - First one FREE, rest $10 each
  'cloud-practitioner': 'price_1Sz6OwETKsGuZh3d53WDpI5X',
  'ai-practitioner': 'price_1Sz6OwETKsGuZh3dpMKNYEGk',
  'solutions-architect-associate': 'price_1Sz6OyETKsGuZh3dy3UVCkKE',
  'developer-associate': 'price_1Sz6OzETKsGuZh3dpW6LAvZc',
  'cloudops-engineer-associate': 'price_1Sz6OzETKsGuZh3d7cymNzUG',
  'data-engineer-associate': 'price_1Sz6P0ETKsGuZh3dystnojnN',
  'machine-learning-engineer-associate': 'price_1Sz6P1ETKsGuZh3dCXNenr5x',
  'solutions-architect-professional': 'price_1Sz6P2ETKsGuZh3dSYHzmkZE',
  'devops-engineer-professional': 'price_1Sz6P3ETKsGuZh3dQgbGvZXg',
  'generative-ai-developer-professional': 'price_1Sz6P3ETKsGuZh3dwkCHMMmA',
  'advanced-networking-specialty': 'price_1Sz6P4ETKsGuZh3dfS498Ua0',
  'security-specialty': 'price_1Sz6P5ETKsGuZh3d73HnsepF',
  'machine-learning-specialty': 'price_1Sz6P6ETKsGuZh3dmtFZBT0s',
  
  // Bundles - Associate $45, Professional $25, Specialty $25
  ASSOCIATE_BUNDLE: 'price_1Sz6P7ETKsGuZh3d1j5j0cio',
  PROFESSIONAL_BUNDLE: 'price_1Sz6P8ETKsGuZh3dTtpUnpUU',
  SPECIALTY_BUNDLE: 'price_1Sz6P8ETKsGuZh3drB19tXES'
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
