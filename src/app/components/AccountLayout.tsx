import React from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Settings, Receipt, Gift, CreditCard, Package, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import { createPortalSession } from '../services/stripe'

interface AccountLayoutProps extends NavigationProps {
  children: React.ReactNode
  activeTab: 'settings' | 'history' | 'refer' | 'billing' | 'membership'
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({ children, onNavigate, activeTab }) => {
  const { user } = useAuth()

  const menuItems = [
    { id: 'settings', label: 'Account Settings', icon: Settings, action: () => onNavigate('account-settings') },
    { id: 'history', label: 'Purchase History', icon: Receipt, action: () => onNavigate('purchase-history') },
    { id: 'refer', label: 'Refer a Friend (20% Off)', icon: Gift, action: () => onNavigate('refer-friend') },
    { 
      id: 'billing', 
      label: 'Manage Billing', 
      icon: CreditCard, 
      action: async () => {
        if (user) {
          try {
            const { url } = await createPortalSession(user.userId)
            window.location.href = url
          } catch (error) {
            console.error('Portal error:', error)
          }
        }
      }
    },
    { id: 'membership', label: 'Membership & Subscriptions', icon: Package, action: () => onNavigate('subscription') },
    { 
      id: 'card', 
      label: 'Add / Change Credit Card', 
      icon: CreditCard, 
      action: async () => {
        if (user) {
          try {
            const { url } = await createPortalSession(user.userId)
            window.location.href = url
          } catch (error) {
            console.error('Portal error:', error)
          }
        }
      }
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="outline" onClick={() => onNavigate('dashboard')} className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-2 sticky top-8">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = item.id === activeTab
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
