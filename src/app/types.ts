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
  | 'cert-cloudops-engineer-associate'
  | 'cert-data-engineer-associate'
  | 'cert-machine-learning-engineer-associate'
  | 'cert-solutions-architect-professional'
  | 'cert-devops-engineer-professional'
  | 'cert-generative-ai-developer-professional'
  | 'cert-advanced-networking-specialty'
  | 'cert-security-specialty'
  | 'cert-machine-learning-specialty'
  | 'cert-database-specialty'
  | 'aws-certified-ai-practitioner-aif-c01'
  | 'aws-certified-cloud-practitioner-clf-c02'
  | 'aws-certified-solutions-architect-associate-saa-c03'
  | 'aws-certified-developer-associate-dva-c02'
  | 'aws-certified-cloudops-engineer-associate-soa-c03'
  | 'aws-certified-data-engineer-associate-dea-c01'
  | 'aws-certified-machine-learning-engineer-associate-mla-c01'
  | 'aws-certified-solutions-architect-professional-sap-c02'
  | 'aws-certified-devops-engineer-professional-dop-c02'
  | 'aws-certified-generative-ai-developer-professional-aip-c01'
  | 'aws-certified-security-specialty-scs-c03'
  | 'aws-certified-machine-learning-specialty-mls-c01'
  | 'aws-certified-advanced-networking-specialty-ans-c01'
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
