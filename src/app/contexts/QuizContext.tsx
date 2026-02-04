import React, { createContext, useContext, useState, ReactNode } from 'react'

interface QuizCompletion {
  [certId: string]: {
    [quizId: number]: {
      completed: boolean
      score: number
    }
  }
}

interface QuizContextType {
  completions: QuizCompletion
  completeQuiz: (certId: string, quizId: number, score: number) => void
  getProgress: (certId: string, totalQuizzes: number) => { completed: number; percentage: number }
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completions, setCompletions] = useState<QuizCompletion>({})

  const completeQuiz = (certId: string, quizId: number, score: number) => {
    setCompletions(prev => ({
      ...prev,
      [certId]: {
        ...prev[certId],
        [quizId]: { completed: true, score }
      }
    }))
  }

  const getProgress = (certId: string, totalQuizzes: number) => {
    const certCompletions = completions[certId] || {}
    const completed = Object.values(certCompletions).filter(c => c.completed).length
    const percentage = Math.round((completed / totalQuizzes) * 100)
    return { completed, percentage }
  }

  return (
    <QuizContext.Provider value={{ completions, completeQuiz, getProgress }}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) throw new Error('useQuiz must be used within QuizProvider')
  return context
}
