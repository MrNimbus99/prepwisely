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
            <div className="flex items-center gap-2 sm:gap-4">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NestedCerts Admin
              </h1>
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs">Admin</Badge>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="outline" onClick={() => onNavigate('dashboard')} className="text-xs sm:text-sm px-2 sm:px-4">
                <Eye className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Student View</span>
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="text-xs sm:text-sm px-2 sm:px-4">
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-8 min-w-max">
            <button
              onClick={() => navigate('/admin')}
              className={`py-3 sm:py-4 px-2 sm:px-2 border-b-2 font-medium transition-colors text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'questions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <FileEdit className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Question Editor</span>
              <span className="sm:hidden">Editor</span>
            </button>
            <button
              onClick={() => navigate('/admin/view-questions')}
              className={`py-3 sm:py-4 px-2 sm:px-2 border-b-2 font-medium transition-colors text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'view-questions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">View Questions</span>
              <span className="sm:hidden">View</span>
            </button>
            <button
              onClick={() => navigate('/admin/users')}
              className={`py-3 sm:py-4 px-2 sm:px-2 border-b-2 font-medium transition-colors text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">User Management</span>
              <span className="sm:hidden">Users</span>
            </button>
            <button
              onClick={() => navigate('/admin/billing')}
              className={`py-3 sm:py-4 px-2 sm:px-2 border-b-2 font-medium transition-colors text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'billing'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Billing & Invoices</span>
              <span className="sm:hidden">Billing</span>
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
