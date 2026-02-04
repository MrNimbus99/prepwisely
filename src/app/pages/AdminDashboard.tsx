import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { FileEdit, Users, CreditCard, LogOut } from 'lucide-react'

const AdminDashboard: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<'questions' | 'users' | 'billing'>('questions')

  const handleSignOut = async () => {
    await signOut()
    onNavigate('landing')
  }

  if (user?.email !== 'admin@prepwisely.com') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You don't have permission to access the admin portal.</p>
          <Button onClick={() => onNavigate('dashboard')} className="mt-4">Go to Dashboard</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PrepWisely Admin
              </h1>
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Admin</Badge>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'questions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <FileEdit className="w-5 h-5 inline mr-2" />
              Question Editor
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              User Management
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'billing'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <CreditCard className="w-5 h-5 inline mr-2" />
              Billing & Invoices
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'questions' && <QuestionEditor />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'billing' && <BillingManagement />}
      </main>
    </div>
  )
}

const QuestionEditor: React.FC = () => {
  const [certId, setCertId] = useState('solutions-architect-associate')
  const [domain, setDomain] = useState('design-resilient-architectures')
  const [difficulty, setDifficulty] = useState('easy')
  const [status, setStatus] = useState('draft')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Question Editor</h2>
        <div className="flex gap-3">
          <Button variant="outline" size="lg">Preview</Button>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">Save Changes</Button>
        </div>
      </div>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Basic Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Certification</label>
            <select
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="solutions-architect-associate">Solutions Architect Associate</option>
              <option value="developer-associate">Developer Associate</option>
              <option value="sysops-administrator-associate">SysOps Administrator Associate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Domain</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="design-resilient-architectures">Design Resilient Architectures</option>
              <option value="design-high-performing-architectures">Design High-Performing Architectures</option>
              <option value="design-secure-applications">Design Secure Applications</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Question #142</label>
          <textarea
            className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="Enter question text..."
          />
        </div>

        <div className="mt-8 space-y-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Answer Options</label>
          {['A', 'B', 'C', 'D'].map((option) => (
            <div key={option} className="flex gap-3 items-center">
              <input type="radio" name="correct" className="w-5 h-5 text-blue-600" />
              <input
                type="text"
                placeholder={`Option ${option}`}
                className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Explanation</label>
          <textarea
            className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-24 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="Explain the correct answer..."
          />
        </div>
      </Card>
    </div>
  )
}

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

export default AdminDashboard
