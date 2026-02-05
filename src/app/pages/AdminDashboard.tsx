import React from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { FileEdit, Users, CreditCard, LogOut, Eye, List } from 'lucide-react'

const AdminDashboard: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth()

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
                PrepWisely Admin
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-6">
          <Card 
            className="p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-blue-200 dark:border-blue-800"
            onClick={() => onNavigate('admin-questions')}
          >
            <FileEdit className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Question Editor</h2>
            <p className="text-slate-600 dark:text-slate-400">Create and edit exam questions</p>
          </Card>

          <Card 
            className="p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-200 dark:border-purple-800"
            onClick={() => onNavigate('admin-view-questions')}
          >
            <List className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">View Questions</h2>
            <p className="text-slate-600 dark:text-slate-400">Browse and manage questions</p>
          </Card>

          <Card 
            className="p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800"
            onClick={() => onNavigate('admin-users')}
          >
            <Users className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">User Management</h2>
            <p className="text-slate-600 dark:text-slate-400">Manage users and subscriptions</p>
          </Card>

          <Card 
            className="p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-2 border-orange-200 dark:border-orange-800"
            onClick={() => onNavigate('admin-billing')}
          >
            <CreditCard className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Billing & Invoices</h2>
            <p className="text-slate-600 dark:text-slate-400">Track revenue and invoices</p>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
