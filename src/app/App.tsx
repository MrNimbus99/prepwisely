import React, { useState } from 'react'
import { PageName } from './types'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

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
import ExamPage from './pages/ExamPage'

const AppContent: React.FC = () => {
  const { user, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState<PageName>(() => {
    // Persist current page in sessionStorage
    const saved = sessionStorage.getItem('currentPage')
    if (saved && user) {
      return saved as PageName
    }
    return user ? 'dashboard' : 'landing'
  })

  const handleNavigate = (page: PageName) => {
    setCurrentPage(page)
    sessionStorage.setItem('currentPage', page)
    window.scrollTo(0, 0)
  }

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect authenticated users away from auth pages
  if (user && ['login', 'register', 'email-verification', 'forgot-password'].includes(currentPage)) {
    setCurrentPage('dashboard')
    sessionStorage.setItem('currentPage', 'dashboard')
  }

  // Redirect unauthenticated users away from protected pages
  if (!user && ['dashboard', 'exam', 'account'].includes(currentPage)) {
    setCurrentPage('landing')
    sessionStorage.setItem('currentPage', 'landing')
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
      case 'exam':
        return <ExamPage onNavigate={handleNavigate} />
      
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

  return renderPage()
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <AppContent />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
