import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { QuizProvider } from './contexts/QuizContext'
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
import FAQPage from './pages/FAQPage'
import ContactSupportPage from './pages/ContactSupportPage'
import Article30DayPath from './pages/Article30DayPath'
import ArticleUpgradePricing from './pages/ArticleUpgradePricing'
import ArticleExamResults from './pages/ArticleExamResults'
import ArticleCancelSubscription from './pages/ArticleCancelSubscription'
import ArticleQuestionUpdates from './pages/ArticleQuestionUpdates'
import AccessibilityPage from './pages/AccessibilityPage'
import RefundPolicyPage from './pages/RefundPolicyPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import CertificationDetailPage from './pages/CertificationDetailPage'
import ExamPage from './pages/ExamPage'
import NotFoundPage from './pages/NotFoundPage'
import CancellationPolicyPage from './pages/CancellationPolicyPage'
import ArticlesPage from './pages/ArticlesPage'
import AIPractitionerArticle from './pages/articles/AIPractitionerArticle'
import CloudPractitionerArticle from './pages/articles/CloudPractitionerArticle'
import SolutionsArchitectAssociateArticle from './pages/articles/SolutionsArchitectAssociateArticle'
import DeveloperAssociateArticle from './pages/articles/DeveloperAssociateArticle'
import SysOpsAdministratorArticle from './pages/articles/SysOpsAdministratorArticle'
import DataEngineerArticle from './pages/articles/DataEngineerArticle'
import MLEngineerArticle from './pages/articles/MLEngineerArticle'
import SolutionsArchitectProfessionalArticle from './pages/articles/SolutionsArchitectProfessionalArticle'
import DevOpsEngineerArticle from './pages/articles/DevOpsEngineerArticle'
import GenAIDeveloperArticle from './pages/articles/GenAIDeveloperArticle'
import SecuritySpecialtyArticle from './pages/articles/SecuritySpecialtyArticle'
import MLSpecialtyArticle from './pages/articles/MLSpecialtyArticle'
import AdvancedNetworkingArticle from './pages/articles/AdvancedNetworkingArticle'
import AdminDashboard from './pages/AdminDashboard'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()
  
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
  
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

const AppContent: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigate = (page: string) => {
    // Map cert pages to routes
    if (page.startsWith('cert-')) {
      const certId = page.replace('cert-', '')
      navigate(`/cert/${certId}`)
    } else {
      const route = page === 'landing' ? '/' : `/${page}`
      navigate(route)
    }
    window.scrollTo(0, 0)
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage onNavigate={handleNavigate} />} />
      <Route path="/certifications" element={<CertificationsPage onNavigate={handleNavigate} />} />
      <Route path="/pricing" element={<PricingPage onNavigate={handleNavigate} />} />
      <Route path="/help" element={<HelpPage onNavigate={handleNavigate} />} />
      <Route path="/articles" element={<ArticlesPage onNavigate={handleNavigate} />} />
      <Route path="/article-ai-practitioner" element={<AIPractitionerArticle onNavigate={handleNavigate} />} />
      <Route path="/article-cloud-practitioner" element={<CloudPractitionerArticle onNavigate={handleNavigate} />} />
      <Route path="/article-solutions-architect-associate" element={<SolutionsArchitectAssociateArticle onNavigate={handleNavigate} />} />
      <Route path="/article-developer-associate" element={<DeveloperAssociateArticle onNavigate={handleNavigate} />} />
      <Route path="/article-sysops-administrator" element={<SysOpsAdministratorArticle onNavigate={handleNavigate} />} />
      <Route path="/article-data-engineer" element={<DataEngineerArticle onNavigate={handleNavigate} />} />
      <Route path="/article-ml-engineer" element={<MLEngineerArticle onNavigate={handleNavigate} />} />
      <Route path="/article-solutions-architect-professional" element={<SolutionsArchitectProfessionalArticle onNavigate={handleNavigate} />} />
      <Route path="/article-devops-engineer" element={<DevOpsEngineerArticle onNavigate={handleNavigate} />} />
      <Route path="/article-genai-developer" element={<GenAIDeveloperArticle onNavigate={handleNavigate} />} />
      <Route path="/article-security-specialty" element={<SecuritySpecialtyArticle onNavigate={handleNavigate} />} />
      <Route path="/article-ml-specialty" element={<MLSpecialtyArticle onNavigate={handleNavigate} />} />
      <Route path="/article-advanced-networking" element={<AdvancedNetworkingArticle onNavigate={handleNavigate} />} />
      <Route path="/faq" element={<FAQPage onNavigate={handleNavigate} />} />
      <Route path="/contact-support" element={<ContactSupportPage onNavigate={handleNavigate} />} />
      <Route path="/article-30day" element={<Article30DayPath onNavigate={handleNavigate} />} />
      <Route path="/article-upgrade" element={<ArticleUpgradePricing onNavigate={handleNavigate} />} />
      <Route path="/article-results" element={<ArticleExamResults onNavigate={handleNavigate} />} />
      <Route path="/article-cancel" element={<ArticleCancelSubscription onNavigate={handleNavigate} />} />
      <Route path="/article-updates" element={<ArticleQuestionUpdates onNavigate={handleNavigate} />} />
      <Route path="/terms" element={<TermsPage onNavigate={handleNavigate} />} />
      <Route path="/privacy" element={<PrivacyPage onNavigate={handleNavigate} />} />
      <Route path="/accessibility" element={<AccessibilityPage onNavigate={handleNavigate} />} />
      <Route path="/refund-policy" element={<RefundPolicyPage onNavigate={handleNavigate} />} />
      <Route path="/cancellation-policy" element={<CancellationPolicyPage onNavigate={handleNavigate} />} />
      <Route path="/login" element={<LoginPage onNavigate={handleNavigate} />} />
      <Route path="/register" element={<RegisterPage onNavigate={handleNavigate} />} />
      <Route path="/email-verification" element={<EmailVerificationPage onNavigate={handleNavigate} />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage onNavigate={handleNavigate} />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage onNavigate={handleNavigate} /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard onNavigate={handleNavigate} /></ProtectedRoute>} />
      <Route path="/admin/view-questions" element={<ProtectedRoute><AdminDashboard onNavigate={handleNavigate} /></ProtectedRoute>} />
      <Route path="/admin/view-questions/:certId" element={<ProtectedRoute><AdminDashboard onNavigate={handleNavigate} /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><AdminDashboard onNavigate={handleNavigate} /></ProtectedRoute>} />
      <Route path="/admin/billing" element={<ProtectedRoute><AdminDashboard onNavigate={handleNavigate} /></ProtectedRoute>} />
      
      {/* Certification Routes */}
      <Route path="/cert/cloud-practitioner" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="cloud-practitioner" /></ProtectedRoute>} />
      <Route path="/cert/ai-practitioner" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="ai-practitioner" /></ProtectedRoute>} />
      <Route path="/cert/solutions-architect-associate" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="solutions-architect-associate" /></ProtectedRoute>} />
      <Route path="/cert/developer-associate" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="developer-associate" /></ProtectedRoute>} />
      <Route path="/cert/sysops-administrator-associate" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="sysops-administrator-associate" /></ProtectedRoute>} />
      <Route path="/cert/data-engineer-associate" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="data-engineer-associate" /></ProtectedRoute>} />
      <Route path="/cert/machine-learning-engineer-associate" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="machine-learning-engineer-associate" /></ProtectedRoute>} />
      <Route path="/cert/solutions-architect-professional" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="solutions-architect-professional" /></ProtectedRoute>} />
      <Route path="/cert/devops-engineer-professional" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="devops-engineer-professional" /></ProtectedRoute>} />
      <Route path="/cert/advanced-networking-professional" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="advanced-networking-professional" /></ProtectedRoute>} />
      <Route path="/cert/security-specialty" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="security-specialty" /></ProtectedRoute>} />
      <Route path="/cert/machine-learning-specialty" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="machine-learning-specialty" /></ProtectedRoute>} />
      <Route path="/cert/database-specialty" element={<ProtectedRoute><CertificationDetailPage onNavigate={handleNavigate} certId="database-specialty" /></ProtectedRoute>} />
      
      <Route path="/exam" element={<ProtectedRoute><ExamPage onNavigate={handleNavigate} /></ProtectedRoute>} />
      <Route path="*" element={<NotFoundPage onNavigate={handleNavigate} />} />
    </Routes>
  )
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <QuizProvider>
            <div className="min-h-screen bg-background">
              <AppContent />
            </div>
          </QuizProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
