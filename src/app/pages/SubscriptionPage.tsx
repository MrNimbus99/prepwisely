import React, { useState, useEffect } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { AccountLayout } from '../components/AccountLayout'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Loader2, CreditCard, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react'
import { createPortalSession } from '../services/stripe'

interface SubscriptionData {
  status: string
  hasAccess: boolean
  purchasedCerts: string[]
  subscriptionId?: string
  currentPeriodEnd?: number
}

const SubscriptionPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user } = useAuth()
  const [data, setData] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.userId) {
      fetch(`https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com/api/billing/subscription?userId=${user.userId}&t=${Date.now()}`)
        .then(r => r.json())
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [user?.userId])

  const handleManageBilling = async () => {
    if (user) {
      try {
        const { url } = await createPortalSession(user.userId)
        window.location.href = url
      } catch (error) {
        console.error('Portal error:', error)
      }
    }
  }

  const isActive = data?.status === 'active' || data?.status === 'trialing'

  return (
    <AccountLayout onNavigate={onNavigate} activeTab="membership">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Membership & Subscriptions</h1>
          <p className="text-slate-700 dark:text-slate-300 mt-2">Manage your subscription and access</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* Subscription Status Card */}
            <Card className={`p-6 border-2 ${isActive ? 'border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {isActive ? (
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-slate-400" />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {isActive ? 'Active Subscription' : 'No Active Subscription'}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {isActive ? 'You have full access to all certifications' : 'Subscribe to unlock all certifications'}
                    </p>
                  </div>
                </div>
                <Badge className={isActive ? 'bg-green-600 text-white' : 'bg-slate-400 text-white'}>
                  {data?.status || 'none'}
                </Badge>
              </div>

              {data?.currentPeriodEnd && isActive && (
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Renews on {new Date(data.currentPeriodEnd * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}

              <div className="flex gap-3">
                {isActive ? (
                  <Button onClick={handleManageBilling} className="bg-blue-600 hover:bg-blue-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                ) : (
                  <Button onClick={() => onNavigate('pricing')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg">
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Plans
                  </Button>
                )}
              </div>
            </Card>

            {/* Purchased Items */}
            {data && data.purchasedCerts.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Individual Purchases</h3>
                <div className="grid gap-3">
                  {data.purchasedCerts.map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">Certification Access</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Owned</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => onNavigate('purchase-history')} className="justify-start">
                  View Purchase History
                </Button>
                <Button variant="outline" onClick={handleManageBilling} className="justify-start">
                  Update Payment Method
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </AccountLayout>
  )
}

export default SubscriptionPage
