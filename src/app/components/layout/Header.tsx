import React, { useState } from 'react'
import { NavigationProps } from '../../types'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'
import { NestedCertsLogo } from '../NestedCertsLogo'

export const Header: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <button onClick={() => onNavigate('landing')} className="flex items-center space-x-2">
            <NestedCertsLogo className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NestedCerts
            </span>
          </button>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('certifications')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              Certifications
            </button>
            <button onClick={() => onNavigate('pricing')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              Pricing
            </button>
            <button onClick={() => onNavigate('help')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
              Help
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {user ? (
              <Button onClick={() => onNavigate('dashboard')} className="text-sm sm:text-base px-3 sm:px-4">
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => onNavigate('login')} className="text-sm sm:text-base px-3 sm:px-4">
                  Sign In
                </Button>
                <Button onClick={() => onNavigate('register')} className="text-sm sm:text-base px-3 sm:px-4">
                  <span className="hidden sm:inline">Start Free</span>
                  <span className="sm:hidden">Start</span>
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col space-y-3">
              <button onClick={() => { onNavigate('certifications'); setMobileMenuOpen(false); }} className="text-left px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Certifications
              </button>
              <button onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }} className="text-left px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Pricing
              </button>
              <button onClick={() => { onNavigate('help'); setMobileMenuOpen(false); }} className="text-left px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Help
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
