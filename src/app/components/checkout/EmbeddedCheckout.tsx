import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '../ui/button'
import { Loader2, Lock, CreditCard } from 'lucide-react'

const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

let stripePromise: Promise<any> | null = null

const getStripe = async () => {
  if (!stripePromise) {
    const { publishableKey } = await fetch(`${API_BASE}/api/billing/config`).then(r => r.json())
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

const CheckoutForm: React.FC<{ userId: string, priceId: string, onSuccess: () => void, onCancel: () => void }> = ({ userId, priceId, onSuccess, onCancel }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })

    if (submitError) {
      setError(submitError.message || 'Payment failed')
      setLoading(false)
      return
    }

    if (paymentIntent?.status === 'succeeded') {
      // Wait for webhook to process and unlock cert (up to 20 seconds)
      const maxAttempts = 20
      let previousCount = 0
      
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        try {
          const response = await fetch(`${API_BASE}/api/billing/subscription?userId=${userId}&t=${Date.now()}`)
          const data = await response.json()
          const currentCount = data.purchasedCerts?.length || 0
          
          // Check if a new cert was added
          if (currentCount > previousCount || data.purchasedCerts?.includes(priceId)) {
            onSuccess()
            return
          }
          previousCount = currentCount
        } catch (err) {
          console.error('Error checking cert status:', err)
        }
      }
      
      // Timeout after 20 seconds - redirect anyway
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg border border-blue-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
          <Lock className="w-4 h-4" />
          <span>Secure payment powered by Stripe</span>
        </div>
        <PaymentElement options={{
          layout: 'tabs',
          paymentMethodOrder: ['card'],
          fields: {
            billingDetails: {
              name: 'auto',
              email: 'auto',
              address: {
                country: 'auto',
                postalCode: 'auto',
                line1: 'auto',
                line2: 'auto',
                city: 'auto',
                state: 'auto'
              }
            }
          },
          defaultValues: { 
            billingDetails: { 
              address: { country: 'AU' } 
            } 
          }
        }} />
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm p-4 rounded-lg flex items-start gap-2">
          <span className="font-semibold">⚠</span>
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel} 
          disabled={loading} 
          className="flex-1 h-12"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || loading} 
          className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Complete Payment
            </>
          )}
        </Button>
      </div>
      
      <p className="text-xs text-center text-slate-500 dark:text-slate-400">
        Your payment information is encrypted and secure. We never store your card details.
      </p>
    </form>
  )
}

interface EmbeddedCheckoutProps {
  priceId: string
  userId: string
  amount: number
  planName: string
  onSuccess: () => void
  onCancel: () => void
  user?: { email?: string, name?: string }
}

export const EmbeddedCheckout: React.FC<EmbeddedCheckoutProps> = ({ priceId, userId, amount, planName, onSuccess, onCancel, user }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/billing/payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        priceId, 
        userId,
        email: user?.email,
        name: user?.name,
        description: planName
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setClientSecret(data.clientSecret)
      })
      .catch(err => setError(err.message))
  }, [priceId, userId, user, planName])

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg mb-4">
          {error}
        </div>
        <Button onClick={onCancel} variant="outline">Close</Button>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-slate-600 dark:text-slate-400">Preparing secure checkout...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-blue-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">{planName}</span>
            <span className="font-semibold text-slate-900 dark:text-white">${amount.toFixed(2)} AUD</span>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span className="text-slate-900 dark:text-white">Total</span>
              <span className="text-blue-600 dark:text-blue-400">${amount.toFixed(2)} AUD</span>
            </div>
          </div>
        </div>
      </div>

      <Elements stripe={getStripe()} options={{ 
      clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#2563eb',
          colorBackground: '#ffffff',
          colorText: '#1e293b',
          colorDanger: '#dc2626',
          fontFamily: 'system-ui, sans-serif',
          borderRadius: '8px',
        }
      }
    }}>
      <CheckoutForm userId={userId} priceId={priceId} onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
    </div>
  )
}
