import React, { useState, useEffect } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { AccountLayout } from '../components/AccountLayout'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Loader2, CreditCard, Calendar, DollarSign, CheckCircle, XCircle, Package, History } from 'lucide-react'
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
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black">Membership</h1>
                <p className="text-purple-100 text-lg font-medium">Manage your subscription and access</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* Subscription Status Card */}
            <Card className={`p-8 border-2 shadow-xl ${isActive ? 'border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30' : 'border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900'}`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${isActive ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`}>
                    {isActive ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <XCircle className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                      {isActive ? 'Active Subscription' : 'No Active Subscription'}
                    </h2>
                    <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                      {isActive ? 'You have full access to all certifications' : 'Subscribe to unlock all certifications'}
                    </p>
                  </div>
                </div>
                <Badge className={`text-sm font-bold px-4 py-2 ${isActive ? 'bg-green-600 text-white' : 'bg-slate-500 text-white'}`}>
                  {data?.status || 'none'}
                </Badge>
              </div>

              {data?.currentPeriodEnd && isActive && (
                <div className="flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-200 mb-6 bg-white/50 dark:bg-slate-800/50 rounded-lg p-4">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span>Renews on {new Date(data.currentPeriodEnd * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}

              <div className="flex gap-3">
                {isActive ? (
                  <Button onClick={handleManageBilling} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg font-semibold px-6 py-3">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Manage Subscription
                  </Button>
                ) : (
                  <Button onClick={() => onNavigate('pricing')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg font-semibold px-6 py-3">
                    <DollarSign className="w-5 h-5 mr-2" />
                    View Plans
                  </Button>
                )}
              </div>
            </Card>

            {/* Purchased Items */}
            {data && data.purchasedCerts.length > 0 && (
              <Card className="p-6 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-blue-600" />
                  Individual Purchases
                </h3>
                <div className="grid gap-3">
                  {data.purchasedCerts.map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-base font-bold text-slate-900 dark:text-white">Certification Access</span>
                      </div>
                      <Badge className="bg-green-600 text-white font-bold px-4 py-1">Owned</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('purchase-history')} 
                  className="justify-start border-2 border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 font-semibold text-slate-900 dark:text-white h-12"
                >
                  <History className="w-5 h-5 mr-2" />
                  View Purchase History
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleManageBilling} 
                  className="justify-start border-2 border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 font-semibold text-slate-900 dark:text-white h-12"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
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
