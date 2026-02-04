import React from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { useQuiz } from '../contexts/QuizContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Trophy, LogOut, CheckCircle, Lock, Play } from 'lucide-react'

interface CertificationCard {
  id: string
  name: string
  code: string
  level: string
  progress: number
  totalQuizzes: number
  completedQuizzes: number
  isUnlocked: boolean
  gradient: string
}

const DashboardPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth()
  const { getProgress } = useQuiz()

  // For now, only Cloud Practitioner is unlocked (free)
  const certId = 'cloud-practitioner'
  const totalQuizzes = 30
  const { completed, percentage } = getProgress(certId, totalQuizzes)

  const certifications: CertificationCard[] = [
    {
      id: certId,
      name: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      level: 'Foundational',
      progress: percentage,
      totalQuizzes,
      completedQuizzes: completed,
      isUnlocked: true,
      gradient: 'from-green-500 to-emerald-600'
    }
  ]

  const handleSignOut = async () => {
    await signOut()
    onNavigate('landing')
  }

  const handleStartCertification = () => {
    onNavigate('certification-detail')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => onNavigate('landing')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              PrepWisely
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600 dark:text-slate-300 hidden sm:inline">
                {user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {user?.name?.split('@')[0] || 'Student'}!
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Continue your AWS certification journey
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Your Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card
                key={cert.id}
                className={`group relative overflow-hidden bg-white dark:bg-slate-900 border-2 transition-all duration-300 hover:shadow-2xl ${
                  cert.isUnlocked
                    ? 'border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 cursor-pointer hover:scale-105'
                    : 'border-slate-200 dark:border-slate-700 opacity-60'
                }`}
                onClick={() => cert.isUnlocked && handleStartCertification()}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Lock badge for locked certs */}
                {!cert.isUnlocked && (
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-slate-500" />
                    </div>
                  </div>
                )}

                <div className="relative p-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center mb-4 shadow-lg ${cert.isUnlocked ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                    <Trophy className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                        {cert.code}
                      </p>
                    </div>

                    {cert.isUnlocked && (
                      <>
                        {/* Progress */}
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600 dark:text-slate-400">Progress</span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {cert.completedQuizzes}/{cert.totalQuizzes} Quizzes
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${cert.gradient} transition-all duration-500`}
                              style={{ width: `${cert.progress}%` }}
                            />
                          </div>
                          <div className="text-right text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {cert.progress}% Complete
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button
                          className={`w-full bg-gradient-to-r ${cert.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {cert.completedQuizzes === 0 ? 'Start Learning' : 'Continue'}
                        </Button>
                      </>
                    )}

                    {!cert.isUnlocked && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          onNavigate('pricing')
                        }}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Unlock Now
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="group p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onNavigate('pricing')}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Unlock More</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">View pricing plans</p>
                </div>
              </div>
            </Card>

            <Card className="group p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onNavigate('certifications')}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Browse Certs</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Explore all certifications</p>
                </div>
              </div>
            </Card>

            <Card className="group p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onNavigate('help')}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Get Help</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Visit help center</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
