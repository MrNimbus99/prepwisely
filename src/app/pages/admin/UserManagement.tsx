import React from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">User Management</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">View and manage all platform users</p>
      </div>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <div className="mb-6">
          <input
            type="search"
            placeholder="Search users by email..."
            className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Subscription</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Joined</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">user@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Monthly</Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                </td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-02-01</td>
                <td className="py-4 px-6">
                  <Button size="sm" variant="outline">Manage</Button>
                </td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">another@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Annual</Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                </td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-01-28</td>
                <td className="py-4 px-6">
                  <Button size="sm" variant="outline">Manage</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Entitlements & Subscriptions</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Manage user subscriptions and access rights</p>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">247</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Subscriptions</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">89</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Lifetime Access</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">12</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Trial Users</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserManagement
