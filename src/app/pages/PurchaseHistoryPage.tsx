import React, { useState, useEffect } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, Download, ExternalLink, Loader2, Receipt } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="outline" onClick={() => onNavigate('dashboard')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Purchase History</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">View and download your receipts</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : payments.length === 0 ? (
          <Card className="p-12 text-center">
            <Receipt className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No purchases yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Your purchase history will appear here</p>
            <Button onClick={() => onNavigate('pricing')}>Browse Certifications</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment.id} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        ${(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
                      </h3>
                      <Badge className={
                        payment.status === 'succeeded' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }>
                        {payment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {payment.description || 'Purchase'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {new Date(payment.created * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  {payment.receipt_url && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(payment.receipt_url, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Receipt
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default PurchaseHistoryPage
