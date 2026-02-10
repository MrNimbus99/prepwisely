const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

export const PRICE_IDS = {
  MONTHLY: 'price_1Sz5qOETKsGuZh3ds7lwQw8P',
  ANNUAL: 'price_1Sz5qPETKsGuZh3d6oYjKBul',
  LIFETIME: 'price_1Sz5qQETKsGuZh3dD9HMyxMT'
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
