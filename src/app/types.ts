export type PageName = 
  | 'landing'
  | 'certifications' 
  | 'pricing'
  | 'help'
  | 'articles'
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
  | 'cert-generative-ai-developer-professional'
  | 'cert-advanced-networking-specialty'
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
  correctAnswer: number | number[]
  explanation: string
  domain: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  certification: string
  multipleCorrect?: boolean
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
  answers: (number | number[])[]
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
