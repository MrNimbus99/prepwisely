import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/auth'

interface User {
  userId: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  pendingEmail: string | null
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  confirmSignUp: (email: string, code: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  confirmResetPassword: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [pendingEmail, setPendingEmail] = useState<string | null>(null)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const { user: currentUser } = await authService.getCurrentUser()
      if (currentUser) {
        setUser({
          userId: currentUser.userId,
          email: currentUser.signInDetails?.loginId || '',
          name: currentUser.signInDetails?.loginId || ''
        })
      }
    } catch (error) {
      console.log('No authenticated user')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await authService.signIn({ email, password })
      if (error) {
        if (error.name === 'UserNotConfirmedException') {
          return { success: false, error: 'Account not verified. Please register again to complete verification.' }
        }
        return { success: false, error: error.message }
      }
      await checkAuthState()
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Sign in failed' }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await authService.signUp({ email, password, name })
      if (error) {
        return { success: false, error: error.message }
      }
      setPendingEmail(email)
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Sign up failed' }
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
      setUser(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const confirmSignUp = async (email: string, code: string) => {
    try {
      const { error } = await authService.confirmSignUp({ email, confirmationCode: code })
      if (error) {
        return { success: false, error: error.message }
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Confirmation failed' }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await authService.resetPassword({ email })
      if (error) {
        return { success: false, error: error.message }
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Password reset failed' }
    }
  }

  const confirmResetPassword = async (email: string, code: string, newPassword: string) => {
    try {
      const { error } = await authService.confirmResetPassword({ email, confirmationCode: code, newPassword })
      if (error) {
        return { success: false, error: error.message }
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Password reset confirmation failed' }
    }
  }

  const value = {
    user,
    loading,
    pendingEmail,
    signIn,
    signUp,
    signOut,
    confirmSignUp,
    resetPassword,
    confirmResetPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
