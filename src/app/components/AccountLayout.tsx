import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Settings, Receipt, Gift, CreditCard, Package, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { createPortalSession } from '../services/stripe'

interface AccountLayoutProps extends NavigationProps {
  children: React.ReactNode
  activeTab: 'settings' | 'history' | 'refer' | 'billing' | 'membership'
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({ children, onNavigate, activeTab }) => {
  const { user } = useAuth()
  const [showBillingError, setShowBillingError] = useState(false)

  const menuItems = [
    { id: 'settings', label: 'Account Settings', icon: Settings, action: () => onNavigate('account-settings') },
    { id: 'history', label: 'Purchase History', icon: Receipt, action: () => onNavigate('purchase-history') },
    { id: 'refer', label: 'Refer a Friend (20% Off)', icon: Gift, action: () => onNavigate('refer-friend') },
    { id: 'membership', label: 'Membership & Subscriptions', icon: Package, action: () => onNavigate('subscription') },
    { 
      id: 'billing', 
      label: 'Manage Billing & Payment', 
      icon: CreditCard, 
      action: async () => {
        if (user) {
          try {
            const { url } = await createPortalSession(user.userId)
            window.location.href = url
          } catch (error) {
            console.error('Portal error:', error)
            setShowBillingError(true)
            setTimeout(() => setShowBillingError(false), 5000)
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

      {/* Billing Error Modal */}
      {showBillingError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl border-2 border-red-200 dark:border-red-800 animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    No Billing History Found
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Please make a purchase first to access billing management.
                  </p>
                  <Button 
                    onClick={() => setShowBillingError(false)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
