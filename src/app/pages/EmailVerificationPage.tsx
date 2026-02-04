import React, { useState } from 'react'
import { PageName } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowLeft, AlertCircle, Mail, RefreshCw, Smartphone, Shield } from 'lucide-react'

interface EmailVerificationPageProps {
  onNavigate: (page: PageName) => void
}

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({ onNavigate }) => {
  const { confirmSignUp, pendingEmail } = useAuth()
  const [email, setEmail] = useState(pendingEmail || '')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { success, error: authError } = await confirmSignUp(email, code)
    
    if (success) {
      onNavigate('login')
    } else {
      setError(authError || 'Verification failed')
    }
    
    setLoading(false)
  }

  const handleResend = async () => {
    setResending(true)
    // In a real app, you'd call resendConfirmationCode
    setTimeout(() => {
      setResending(false)
    }, 2000)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate('register')}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Registration</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/20 dark:border-slate-800/50 shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
              We've sent a 6-digit verification code to<br />
              <span className="font-semibold text-slate-900 dark:text-white">{email}</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center space-x-3 p-4 bg-red-50/80 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/50 rounded-xl backdrop-blur-sm">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="code" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Verification Code</span>
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={handleCodeChange}
                  className="w-full px-4 py-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-center text-2xl font-mono tracking-[0.5em] transition-all duration-200 backdrop-blur-sm"
                  placeholder="000000"
                  maxLength={6}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Enter the 6-digit code from your email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 hover:scale-[1.02]"
                disabled={loading || code.length !== 6}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Email'
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="flex items-center space-x-2 justify-center text-sm text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4" />
                <span>Didn't receive the code?</span>
              </div>
              
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto transition-all duration-200 hover:scale-105"
              >
                {resending && <RefreshCw className="h-4 w-4 animate-spin" />}
                <span>{resending ? 'Sending new code...' : 'Send new code'}</span>
              </button>

              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Check your spam folder if you don't see the email.<br />
                  The code expires in 10 minutes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EmailVerificationPage
