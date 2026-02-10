import React, { useState, useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Loader2, DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react'

const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

interface Stats {
  totalRevenue: number
  monthlyRevenue: number
  totalUsers: number
  activeSubscriptions: number
  totalPayments: number
}

const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/stats`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!stats) {
    return <div className="text-center py-12 text-slate-500">Failed to load stats</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Dashboard Overview</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">Key metrics and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">All Time</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">${stats.totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">This Month</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">${stats.monthlyRevenue.toFixed(2)}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Revenue</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Total</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.totalUsers}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Users</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Active</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.activeSubscriptions}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Subscriptions</div>
        </Card>
      </div>

      <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalPayments}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Payments</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">${(stats.totalRevenue / stats.totalPayments).toFixed(2)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Avg Payment</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{stats.activeSubscriptions}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Active Subs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">${(stats.activeSubscriptions * 20).toFixed(2)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">MRR</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AdminOverview
