import React, { useState, useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Loader2, Calendar, Search } from 'lucide-react'

const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

interface Subscription {
  id: string
  customer_email: string
  status: string
  plan: string
  amount: number
  current_period_end: number
  created: number
}

const SubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/subscriptions`)
      const data = await response.json()
      setSubscriptions(data.subscriptions || [])
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSubs = subscriptions.filter(s =>
    s.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  )

  const mrr = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.amount || 0), 0) / 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Subscriptions</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">Manage all active and past subscriptions</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">${mrr.toFixed(2)}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Recurring Revenue</div>
        </div>
      </div>

      <Card className="p-4 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="search"
            placeholder="Search by email or subscription ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
          <div className="text-3xl font-bold text-green-600 mb-2">{subscriptions.filter(s => s.status === 'active').length}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Active Subscriptions</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800">
          <div className="text-3xl font-bold text-yellow-600 mb-2">{subscriptions.filter(s => s.status === 'trialing').length}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Trial Subscriptions</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800">
          <div className="text-3xl font-bold text-red-600 mb-2">{subscriptions.filter(s => s.status === 'canceled' || s.status === 'past_due').length}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Inactive Subscriptions</div>
        </Card>
      </div>

      <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-xl border-2 border-slate-100 dark:border-slate-700">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredSubs.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {search ? 'No subscriptions found matching your search' : 'No subscriptions yet'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Started</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Next Billing</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map((sub) => (
                  <tr key={sub.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">
                      {sub.customer_email || 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={
                        sub.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        sub.status === 'trialing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }>
                        {sub.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-bold">
                      ${((sub.amount || 0) / 100).toFixed(2)}/mo
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      {new Date(sub.created * 1000).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(sub.current_period_end * 1000).toLocaleDateString()}
                      </div>
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

export default SubscriptionsPage
