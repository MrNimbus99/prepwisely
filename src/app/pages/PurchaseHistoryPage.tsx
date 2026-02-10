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
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Purchase History</h1>
          <p className="text-slate-700 dark:text-slate-300 mt-2">View and download your receipts</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : payments.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No purchases yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Your purchase history will appear here once you make your first purchase</p>
            <Button onClick={() => onNavigate('pricing')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg">
              Browse Certifications
            </Button>
          </Card>
        ) : (
          <>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Purchases</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{payments.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Spent</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${(payments.reduce((sum, p) => sum + (p.status === 'succeeded' ? p.amount : 0), 0) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {payments.map((payment) => (
                <Card key={payment.id} className="p-6 hover:shadow-lg transition-shadow border-2 border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            ${(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {payment.description || 'Purchase'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-13">
                        <Badge className={
                          payment.status === 'succeeded' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }>
                          {payment.status}
                        </Badge>
                        <span className="text-xs text-slate-500 dark:text-slate-500">
                          {new Date(payment.created * 1000).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    {payment.receipt_url && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(payment.receipt_url, '_blank')}
                        className="flex items-center gap-2 border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
