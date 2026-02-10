import React, { useState, useEffect } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { AccountLayout } from '../components/AccountLayout'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Download, ExternalLink, Loader2, Receipt } from 'lucide-react'

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  created: number
  description?: string
  receipt_url?: string
}

const PurchaseHistoryPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user } = useAuth()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.userId) {
      fetch(`https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com/api/billing/payments?userId=${user.userId}`)
        .then(r => r.json())
        .then(data => {
          setPayments(data.payments || [])
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [user?.userId])

  return (
    <AccountLayout onNavigate={onNavigate} activeTab="history">
      <div className="space-y-6">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black">Purchase History</h1>
                <p className="text-green-100 text-lg font-medium">All your transactions in one place</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : payments.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Receipt className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No purchases yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">Your purchase history will appear here once you make your first purchase</p>
            <Button onClick={() => onNavigate('pricing')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg font-semibold px-8 py-3">
              Browse Certifications
            </Button>
          </Card>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Total Purchases</p>
                    <p className="text-4xl font-black text-blue-600 dark:text-blue-400">{payments.length}</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Receipt className="w-8 h-8 text-white" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-800 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">Total Spent</p>
                    <p className="text-4xl font-black text-green-600 dark:text-green-400">
                      ${(payments.reduce((sum, p) => sum + (p.status === 'succeeded' ? p.amount : 0), 0) / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
              {payments.map((payment) => (
                <Card key={payment.id} className="p-6 hover:shadow-xl transition-all border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <Receipt className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            ${(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
                          </h3>
                          <Badge className={
                            payment.status === 'succeeded' ? 'bg-green-600 text-white font-semibold' :
                            payment.status === 'pending' ? 'bg-yellow-600 text-white font-semibold' :
                            'bg-red-600 text-white font-semibold'
                          }>
                            {payment.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          {payment.description || 'Purchase'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                          {new Date(payment.created * 1000).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {payment.receipt_url && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(payment.receipt_url, '_blank')}
                        className="flex items-center gap-2 border-2 border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold"
                      >
                        <Download className="w-4 h-4" />
                        Receipt
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </AccountLayout>
  )
}

export default PurchaseHistoryPage
