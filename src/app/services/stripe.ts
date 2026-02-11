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
  'developer-associate': 'price_1Szcq3EbihaDPG1kyYpuwV1v',
  'cloudops-engineer-associate': 'price_1Szcq3EbihaDPG1kgDDhAhFE',
  'data-engineer-associate': 'price_1Szcq4EbihaDPG1kaFOw88dF',
  'machine-learning-engineer-associate': 'price_1Szcq4EbihaDPG1k31yOpegi',
  'solutions-architect-professional': 'price_1Szcq5EbihaDPG1kxLL91FJM',
  'devops-engineer-professional': 'price_1Szcq5EbihaDPG1kk0aVHiPD',
  'generative-ai-developer-professional': 'price_1Szcq6EbihaDPG1kMwwRgPfk',
  'advanced-networking-specialty': 'price_1Szcq6EbihaDPG1kn3TaHiwe',
  'security-specialty': 'price_1Szcq6EbihaDPG1kvZaBmUlp',
  'machine-learning-specialty': 'price_1Szcq7EbihaDPG1keZYsrKfJ',
  
  // Bundles - USD prices ($45 Associate, $25 Professional, $25 Specialty)
  ASSOCIATE_BUNDLE: 'price_1SzcarEbihaDPG1kG8BfbBPV',
  PROFESSIONAL_BUNDLE: 'price_1SzcasEbihaDPG1kIz8sZSS3',
  SPECIALTY_BUNDLE: 'price_1SzcasEbihaDPG1kDTt2Nmcm'
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
