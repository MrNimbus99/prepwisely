import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

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
  const { user } = useAuth()

  // Load completions from backend on mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!user?.email) return
      try {
        const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/progress/${user.email}`)
        if (response.ok) {
          const data = await response.json()
          setCompletions(data.completions || {})
        }
      } catch (error) {
        console.error('Failed to load progress:', error)
      }
    }
    loadProgress()
  }, [user?.email])

  const completeQuiz = async (certId: string, quizId: number, score: number) => {
    const newCompletions = {
      ...completions,
      [certId]: {
        ...completions[certId],
        [quizId]: { completed: true, score }
      }
    }
    setCompletions(newCompletions)

    // Save to backend
    if (user?.email) {
      try {
        await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/progress/${user.email}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completions: newCompletions })
        })
      } catch (error) {
        console.error('Failed to save progress:', error)
      }
    }
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
