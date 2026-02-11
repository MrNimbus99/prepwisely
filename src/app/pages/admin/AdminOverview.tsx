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
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Overview</h2>
        <p className="text-lg text-slate-700 dark:text-slate-300">Key metrics and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-green-200 dark:border-green-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-xl shadow-md">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-600 text-white dark:bg-green-700 font-semibold">All Time</Badge>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">${stats.totalRevenue.toFixed(2)}</div>
          <div className="text-sm font-medium text-green-900 dark:text-green-100">Total Revenue</div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-blue-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-blue-600 text-white dark:bg-blue-700 font-semibold">This Month</Badge>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">${stats.monthlyRevenue.toFixed(2)}</div>
          <div className="text-sm font-medium text-blue-900 dark:text-blue-100">Monthly Revenue</div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-xl shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-purple-600 text-white dark:bg-purple-700 font-semibold">Total</Badge>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-1">{stats.totalUsers}</div>
          <div className="text-sm font-medium text-purple-900 dark:text-purple-100">Total Users</div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-orange-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500 rounded-xl shadow-md">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-orange-600 text-white dark:bg-orange-700 font-semibold">Active</Badge>
          </div>
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-1">{stats.activeSubscriptions}</div>
          <div className="text-sm font-medium text-orange-900 dark:text-orange-100">Subscriptions</div>
        </Card>
      </div>

      <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalPayments}</div>
            <div className="text-sm text-slate-700 dark:text-slate-300">Total Payments</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">${(stats.totalRevenue / stats.totalPayments).toFixed(2)}</div>
            <div className="text-sm text-slate-700 dark:text-slate-300">Avg Payment</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.activeSubscriptions}</div>
            <div className="text-sm text-slate-700 dark:text-slate-300">Active Subs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">${(stats.activeSubscriptions * 20).toFixed(2)}</div>
            <div className="text-sm text-slate-700 dark:text-slate-300">MRR</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AdminOverview
