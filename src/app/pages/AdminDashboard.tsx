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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Question Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Certification</label>
            <select
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
            >
              <option value="solutions-architect-associate">Solutions Architect Associate</option>
              <option value="developer-associate">Developer Associate</option>
              <option value="sysops-administrator-associate">SysOps Administrator Associate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Domain</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
            >
              <option value="design-resilient-architectures">Design Resilient Architectures</option>
              <option value="design-high-performing-architectures">Design High-Performing Architectures</option>
              <option value="design-secure-applications">Design Secure Applications</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Question #142</label>
          <textarea
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 h-32"
            placeholder="Enter question text..."
          />
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium">Answer Options</label>
          {['A', 'B', 'C', 'D'].map((option) => (
            <div key={option} className="flex gap-2">
              <input type="radio" name="correct" className="mt-1" />
              <input
                type="text"
                placeholder={`Option ${option}`}
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Explanation</label>
          <textarea
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 h-24"
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
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h2>
      <p className="text-slate-600 dark:text-slate-400">View and manage all platform users</p>

      <Card className="p-6">
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search users..."
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Subscription</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Joined</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 px-4">user@example.com</td>
                <td className="py-3 px-4">
                  <Badge>Monthly</Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </td>
                <td className="py-3 px-4">2026-02-01</td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="outline">Manage</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Entitlements & Subscriptions</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Manage user subscriptions and access rights</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">247</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Active Subscriptions</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Lifetime Access</div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Trial Users</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const BillingManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Invoices & Billing History</h2>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">$24,580</div>
          <div className="text-sm text-green-600">+12% this month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Recurring</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">$4,940</div>
          <div className="text-sm text-green-600">247 subscribers</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">Annual Revenue</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">$8,010</div>
          <div className="text-sm text-green-600">89 subscribers</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">Lifetime Sales</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">$10,680</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">89 purchases</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left py-3 px-4">Invoice #</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Plan</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 px-4">#INV-2026-001</td>
                <td className="py-3 px-4">user@example.com</td>
                <td className="py-3 px-4">Monthly</td>
                <td className="py-3 px-4">$20.00</td>
                <td className="py-3 px-4">2026-02-05</td>
                <td className="py-3 px-4">
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 px-4">#INV-2026-002</td>
                <td className="py-3 px-4">another@example.com</td>
                <td className="py-3 px-4">Annual</td>
                <td className="py-3 px-4">$90.00</td>
                <td className="py-3 px-4">2026-02-04</td>
                <td className="py-3 px-4">
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
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
