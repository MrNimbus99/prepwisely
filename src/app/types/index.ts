export type PageName = 
  // Marketing Pages
  | 'landing'
  | 'certifications'
  | 'exam-path'
  | 'pricing'
  | 'help'
  | 'terms'
  | 'privacy'
  | 'cookies'
  | 'refund-policy'
  | 'cancellation-policy'
  | 'status'
  | 'accessibility'
  | 'logout-confirmation'
  
  // Auth Pages
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'email-verification'
  | 'verify-email-success'
  | 'verify-email-error'
  | 'onboarding'
  | 'security-settings'
  | 'mfa-setup'
  | 'change-password'
  
  // Core App Pages
  | 'dashboard'
  | 'daily-exam'
  | 'results'
  | 'question-review'
  | 'exam-instructions'
  | 'submit-exam-confirmation'
  | 'exam-submitting'
  | 'account'
  
  // Study Utilities
  | 'bookmarks'
  | 'search'
  | 'practice-drill'
  | 'progress-analytics'
  | 'results-history'
  | 'review-queue'
  | 'flagged-questions'
  | 'report-question'
  
  // Billing & Payments
  | 'checkout'
  | 'checkout-success'
  | 'checkout-cancelled'
  | 'payment-failed'
  | 'manage-subscription'
  | 'upgrade-plan'
  | 'invoices'
  | 'invoice-detail'
  
  // Support
  | 'contact-support'
  
  // Admin Pages
  | 'admin-dashboard'
  | 'admin-questions'
  | 'admin-question-editor'
  | 'admin-users'
  | 'admin-entitlements'
  | 'admin-content-qa'
  
  // Error Pages
  | '404'
  | '500'
  | '401'
  | '403'
  | 'maintenance'
  | 'offline'
  | 'qa-checklist';

export interface NavigationProps {
  onNavigate: (page: PageName) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  subscription?: {
    plan: string;
    status: 'active' | 'cancelled' | 'expired';
    nextBilling?: string;
  };
}

export interface Certification {
  id: string;
  name: string;
  code: string;
  level: 'foundational' | 'associate' | 'professional' | 'specialty';
  description: string;
  examDuration: number;
  questionCount: number;
  passingScore: number;
}
