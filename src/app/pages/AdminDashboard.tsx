import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { FileEdit, Users, CreditCard, LogOut, Eye, List } from 'lucide-react'
import QuestionEditor from './admin/QuestionEditor'
import ViewQuestions from './admin/ViewQuestions'
import UserManagement from './admin/UserManagement'
import BillingManagement from './admin/BillingManagement'

const AdminDashboard: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  
  // Determine active tab from URL
  const getActiveTab = () => {
    const path = location.pathname
    if (path.includes('/admin/view-questions')) return 'view-questions'
    if (path.includes('/admin/users')) return 'users'
    if (path.includes('/admin/billing')) return 'billing'
    return 'questions'
  }
  
  const activeTab = getActiveTab()

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
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NestedCerts Admin
              </h1>
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Admin</Badge>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                <Eye className="w-4 h-4 mr-2" />
                Student View
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => navigate('/admin')}
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
              onClick={() => navigate('/admin/view-questions')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'view-questions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-5 h-5 inline mr-2" />
              View Questions
            </button>
            <button
              onClick={() => navigate('/admin/users')}
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
              onClick={() => navigate('/admin/billing')}
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
        {activeTab === 'view-questions' && <ViewQuestions />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'billing' && <BillingManagement />}
      </main>
    </div>
  )
}

export default AdminDashboard
