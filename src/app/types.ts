export type PageName = 
  | 'landing'
  | 'certifications' 
  | 'pricing'
  | 'help'
  | 'terms'
  | 'privacy'
  | 'status'
  | 'login'
  | 'register'
  | 'email-verification'
  | 'forgot-password'
  | 'dashboard'
  | 'exam'
  | 'exam-path'
  | 'checkout'
  | 'contact-support'
  | 'refund-policy'
  | 'account'

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
