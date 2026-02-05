export type PageName = 
  | 'landing'
  | 'certifications' 
  | 'pricing'
  | 'help'
  | 'terms'
  | 'privacy'
  | 'faq'
  | 'login'
  | 'register'
  | 'email-verification'
  | 'forgot-password'
  | 'dashboard'
  | 'cert-cloud-practitioner'
  | 'cert-ai-practitioner'
  | 'cert-solutions-architect-associate'
  | 'cert-developer-associate'
  | 'cert-sysops-administrator-associate'
  | 'cert-data-engineer-associate'
  | 'cert-machine-learning-engineer-associate'
  | 'cert-solutions-architect-professional'
  | 'cert-devops-engineer-professional'
  | 'cert-advanced-networking-professional'
  | 'cert-security-specialty'
  | 'cert-machine-learning-specialty'
  | 'cert-database-specialty'
  | 'exam'
  | 'exam-path'
  | 'checkout'
  | 'contact-support'
  | 'refund-policy'
  | 'cancellation-policy'
  | 'admin'
  | 'admin-questions'
  | 'admin-view-questions'
  | 'admin-users'
  | 'admin-billing'
  | 'account'
  | 'accessibility'

export interface NavigationProps {
  onNavigate: (page: PageName) => void
}

export interface User {
  id: string
  email: string
  name: string
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  domain: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  certification: string
}

export interface Certification {
  id: string
  name: string
  code: string
  level: 'Foundational' | 'Associate' | 'Professional' | 'Specialty'
  price: number
  isFree: boolean
  description: string
  domains: string[]
  examDetails: {
    duration: number
    questions: number
    passingScore: number
  }
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  originalPrice?: number
  type: 'free' | 'individual' | 'bundle' | 'subscription' | 'lifetime'
  badge?: string
  features: string[]
  certifications: string[]
  popular?: boolean
}

export interface ExamResult {
  id: string
  userId: string
  certification: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  examDate: string
  answers: number[]
  questions: Question[]
}

export interface UserProgress {
  userId: string
  certification: string
  currentDay: number
  totalDays: number
  completedExams: number
  averageScore: number
  streak: number
  lastExamDate: string
}
