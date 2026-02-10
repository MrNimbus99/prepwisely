import React, { useState, useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Loader2, Download, ExternalLink, Search, Filter } from 'lucide-react'

const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

interface Payment {
  id: string
  customer_email: string
  amount: number
  currency: string
  status: string
  created: number
  description?: string
  receipt_url?: string
}

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/payments`)
      const data = await response.json()
      setPayments(data.payments || [])
    } catch (error) {
      console.error('Failed to fetch payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.customer_email?.toLowerCase().includes(search.toLowerCase()) || 
                         p.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = filteredPayments
    .filter(p => p.status === 'succeeded')
    .reduce((sum, p) => sum + p.amount, 0) / 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Payments & Transactions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">View all payment history and download receipts</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1 p-4 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search by email or payment ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
            />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-900">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all"
            >
              <option value="all">All Status</option>
              <option value="succeeded">Succeeded</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-xl border-2 border-slate-100 dark:border-slate-700">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {search || statusFilter !== 'all' ? 'No payments found matching your filters' : 'No payments yet'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Description</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white">
                      {new Date(payment.created * 1000).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">
                      {payment.customer_email || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-bold">
                      ${(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={
                        payment.status === 'succeeded' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 text-sm">
                      {payment.description || 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      {payment.receipt_url ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(payment.receipt_url, '_blank')}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Receipt
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      ) : (
                        <span className="text-slate-400 text-sm">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Payment Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-green-600">{filteredPayments.filter(p => p.status === 'succeeded').length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Successful</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">{filteredPayments.filter(p => p.status === 'pending').length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Pending</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{filteredPayments.filter(p => p.status === 'failed').length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Failed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">${totalRevenue.toFixed(2)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PaymentsPage
