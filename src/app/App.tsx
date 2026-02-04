import React, { useState } from 'react'
import { PageName } from './types'
import { AuthProvider } from './contexts/AuthContext'

// Import AWS config
import './config/aws-config'

// Import pages
import LandingPage from './pages/LandingPage'
import CertificationsPage from './pages/CertificationsPage'
import PricingPage from './pages/PricingPage'
import HelpPage from './pages/HelpPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import StatusPage from './pages/StatusPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('landing')

  const handleNavigate = (page: PageName) => {
    setCurrentPage(page)
    // Scroll to top when navigating
    window.scrollTo(0, 0)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />
      case 'certifications':
        return <CertificationsPage onNavigate={handleNavigate} />
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />
      case 'help':
        return <HelpPage onNavigate={handleNavigate} />
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />
      case 'status':
        return <StatusPage onNavigate={handleNavigate} />
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />
      case 'email-verification':
        return <EmailVerificationPage onNavigate={handleNavigate} />
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />
      
      // Placeholder for other pages
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
            <div className="text-center bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
              <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' ')}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mb-6">This page is under construction</p>
              <button 
                onClick={() => handleNavigate('landing')}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium"
              >
                ← Back to Landing
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {renderPage()}
      </div>
    </AuthProvider>
  )
}

export default App
