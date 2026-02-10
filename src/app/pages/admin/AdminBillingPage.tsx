import React, { useState, useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { DollarSign, Download, Search, Calendar } from 'lucide-react'

interface Invoice {
  id: string
  customerId: string
  userId: string
  email: string
  amount: number
  status: string
  created: number
  pdfUrl?: string
}

const AdminBillingPage: React.FC = () => {
  const [invoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [searchEmail, setSearchEmail] = useState('')

  useEffect(() => {
    // TODO: Fetch invoices from DynamoDB
    setLoading(false)
  }, [])

  const filteredInvoices = invoices.filter(inv => 
    inv.email.toLowerCase().includes(searchEmail.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Billing & Invoices</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">$0</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">This Month</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">$0</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Invoices</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{invoices.length}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white"
          />
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    Loading invoices...
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No invoices found
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                      {new Date(invoice.created * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                      {invoice.email}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      ${(invoice.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {invoice.pdfUrl && (
                        <Button size="sm" variant="outline" onClick={() => window.open(invoice.pdfUrl, '_blank')}>
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default AdminBillingPage
