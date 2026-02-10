import React, { useState, useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Loader2, DollarSign, TrendingUp, CreditCard, Calendar } from 'lucide-react'

const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

interface Payment {
  id: string
  customer_email: string
  amount: number
  currency: string
  status: string
  created: number
  description?: string
}

const BillingManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    count: 0,
    thisMonth: 0
  })

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/payments`)
      const data = await response.json()
      setPayments(data.payments || [])
      
      // Calculate stats
      const total = data.payments.reduce((sum: number, p: Payment) => sum + p.amount, 0) / 100
      const thisMonth = data.payments
        .filter((p: Payment) => new Date(p.created * 1000).getMonth() === new Date().getMonth())
        .reduce((sum: number, p: Payment) => sum + p.amount, 0) / 100
      
      setStats({
        total,
        count: data.payments.length,
        thisMonth
      })
    } catch (error) {
      console.error('Failed to fetch payments:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Billing & Revenue</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">Track revenue and manage billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium opacity-90">Total Revenue</div>
            <DollarSign className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-4xl font-bold mb-2">${stats.total.toFixed(2)}</div>
          <div className="text-sm font-medium opacity-90">{stats.count} transactions</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium opacity-90">This Month</div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-4xl font-bold mb-2">${stats.thisMonth.toFixed(2)}</div>
          <div className="text-sm font-medium opacity-90">Current period</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium opacity-90">Avg Transaction</div>
            <CreditCard className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-4xl font-bold mb-2">
            ${stats.count > 0 ? (stats.total / stats.count).toFixed(2) : '0.00'}
          </div>
          <div className="text-sm font-medium opacity-90">Per payment</div>
        </Card>
      </div>

      <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-xl border-2 border-slate-100 dark:border-slate-700">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Recent Payments
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No payments yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Payment ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Description</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-green-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-mono text-sm">{payment.id.slice(-12)}</td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">{payment.customer_email || 'N/A'}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 text-sm">{payment.description || 'Payment'}</td>
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-bold">
                      ${(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                      {new Date(payment.created * 1000).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={
                        payment.status === 'succeeded' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }>
                        {payment.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default BillingManagement
