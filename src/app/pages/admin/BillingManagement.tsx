import React from 'react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

const BillingManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Invoices & Billing History</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">Track revenue and manage billing</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Total Revenue</div>
          <div className="text-4xl font-bold mb-2">$24,580</div>
          <div className="text-sm font-medium opacity-90">+12% this month</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Monthly Recurring</div>
          <div className="text-4xl font-bold mb-2">$4,940</div>
          <div className="text-sm font-medium opacity-90">247 subscribers</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Annual Revenue</div>
          <div className="text-4xl font-bold mb-2">$8,010</div>
          <div className="text-sm font-medium opacity-90">89 subscribers</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Lifetime Sales</div>
          <div className="text-4xl font-bold mb-2">$10,680</div>
          <div className="text-sm font-medium opacity-90">89 purchases</div>
        </Card>
      </div>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Recent Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Invoice #</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Plan</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">#INV-2026-001</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">user@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Monthly</Badge>
                </td>
                <td className="py-4 px-6 text-slate-900 dark:text-white font-semibold">$20.00</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-02-05</td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
                </td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">#INV-2026-002</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">another@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Annual</Badge>
                </td>
                <td className="py-4 px-6 text-slate-900 dark:text-white font-semibold">$90.00</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-02-04</td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
                </td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">#INV-2026-003</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">lifetime@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Lifetime</Badge>
                </td>
                <td className="py-4 px-6 text-slate-900 dark:text-white font-semibold">$120.00</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-02-03</td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default BillingManagement
