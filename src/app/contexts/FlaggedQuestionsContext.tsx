import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface FlaggedQuestion {
  questionId: string
  certId: string
  quizId: string
  questionText: string
  flaggedAt: number
}

interface FlaggedQuestionsContextType {
  flaggedQuestions: FlaggedQuestion[]
  toggleFlag: (certId: string, quizId: string, questionId: string, questionText: string) => void
  isFlagged: (questionId: string) => boolean
  getFlaggedByCert: (certId: string) => FlaggedQuestion[]
  removeFlagged: (questionId: string) => void
}

const FlaggedQuestionsContext = createContext<FlaggedQuestionsContextType | undefined>(undefined)

export const FlaggedQuestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const loadFlagged = async () => {
      if (!user?.email) return
      try {
        const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/flagged/${user.email}`)
        if (response.ok) {
          const data = await response.json()
          setFlaggedQuestions(data.flagged || [])
        }
      } catch (error) {
        console.error('Failed to load flagged questions:', error)
      }
    }
    loadFlagged()
  }, [user?.email])

  const saveFlagged = async (newFlagged: FlaggedQuestion[]) => {
    if (!user?.email) return
    try {
      await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/flagged/${user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flagged: newFlagged })
      })
    } catch (error) {
      console.error('Failed to save flagged questions:', error)
    }
  }

  const toggleFlag = (certId: string, quizId: string, questionId: string, questionText: string) => {
    const existing = flaggedQuestions.find(q => q.questionId === questionId)
    let newFlagged: FlaggedQuestion[]
    
    if (existing) {
      newFlagged = flaggedQuestions.filter(q => q.questionId !== questionId)
    } else {
      newFlagged = [...flaggedQuestions, { questionId, certId, quizId, questionText, flaggedAt: Date.now() }]
    }
    
    setFlaggedQuestions(newFlagged)
    saveFlagged(newFlagged)
  }

  const isFlagged = (questionId: string) => {
    return flaggedQuestions.some(q => q.questionId === questionId)
  }

  const getFlaggedByCert = (certId: string) => {
    return flaggedQuestions.filter(q => q.certId === certId)
  }

  const removeFlagged = (questionId: string) => {
    const newFlagged = flaggedQuestions.filter(q => q.questionId !== questionId)
    setFlaggedQuestions(newFlagged)
    saveFlagged(newFlagged)
  }

  return (
    <FlaggedQuestionsContext.Provider value={{ flaggedQuestions, toggleFlag, isFlagged, getFlaggedByCert, removeFlagged }}>
      {children}
    </FlaggedQuestionsContext.Provider>
  )
}

export const useFlaggedQuestions = () => {
  const context = useContext(FlaggedQuestionsContext)
  if (!context) throw new Error('useFlaggedQuestions must be used within FlaggedQuestionsProvider')
  return context
}
