import React, { useEffect, useState } from 'react'
import { NavigationProps } from '../types'
import { useQuiz } from '../contexts/QuizContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, Trophy, CheckCircle, Lock, Play, Clock } from 'lucide-react'

interface Quiz {
  id: number
  title: string
  questions: number
  duration: number
  isCompleted: boolean
  score?: number
  isLocked: boolean
  isFinalExam?: boolean
}

const CertificationDetailPage: React.FC<NavigationProps & { certId: string }> = ({ onNavigate, certId }) => {
  const { completions } = useQuiz()
  const [quizCounts, setQuizCounts] = useState<{ [key: string]: number }>({})
  const [loading, setLoading] = useState(true)

  // Certification data
  const certifications: { [key: string]: { name: string; code: string; gradient: string } } = {
    // Foundational (2)
    'cloud-practitioner': {
      name: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      gradient: 'from-green-500 to-emerald-600'
    },
    'ai-practitioner': {
      name: 'AWS Certified AI Practitioner',
      code: 'AIF-C01',
      gradient: 'from-violet-500 to-purple-600'
    },
    // Associate (5)
    'solutions-architect-associate': {
      name: 'AWS Solutions Architect Associate',
      code: 'SAA-C03',
      gradient: 'from-blue-500 to-indigo-600'
    },
    'developer-associate': {
      name: 'AWS Developer Associate',
      code: 'DVA-C02',
      gradient: 'from-purple-500 to-pink-600'
    },
    'sysops-administrator-associate': {
      name: 'AWS SysOps Administrator Associate',
      code: 'SOA-C02',
      gradient: 'from-orange-500 to-amber-600'
    },
    'data-engineer-associate': {
      name: 'AWS Data Engineer Associate',
      code: 'DEA-C01',
      gradient: 'from-cyan-500 to-teal-600'
    },
    'machine-learning-engineer-associate': {
      name: 'AWS Machine Learning Engineer Associate',
      code: 'MLA-C01',
      gradient: 'from-fuchsia-500 to-pink-600'
    },
    // Professional (3)
    'solutions-architect-professional': {
      name: 'AWS Solutions Architect Professional',
      code: 'SAP-C02',
      gradient: 'from-rose-500 to-red-600'
    },
    'devops-engineer-professional': {
      name: 'AWS DevOps Engineer Professional',
      code: 'DOP-C02',
      gradient: 'from-slate-600 to-gray-700'
    },
    'advanced-networking-professional': {
      name: 'AWS Advanced Networking Professional',
      code: 'ANS-C01',
      gradient: 'from-sky-500 to-blue-600'
    },
    // Specialty (3)
    'security-specialty': {
      name: 'AWS Security Specialty',
      code: 'SCS-C02',
      gradient: 'from-emerald-500 to-green-600'
    },
    'machine-learning-specialty': {
      name: 'AWS Machine Learning Specialty',
      code: 'MLS-C01',
      gradient: 'from-lime-500 to-green-600'
    },
    'database-specialty': {
      name: 'AWS Database Specialty',
      code: 'DBS-C01',
      gradient: 'from-amber-500 to-yellow-600'
    }
  }

  const certification = {
    id: certId,
    ...certifications[certId]
  }

  if (!certification.name) {
    return <div>Certification not found</div>
  }

  const certCompletions = completions[certification.id] || {}

  // Fetch question counts for all quizzes
  useEffect(() => {
    const fetchQuestionCounts = async () => {
      setLoading(true)
      const counts: { [key: string]: number } = {}
      
      // Fetch counts for quizzes 1-30
      for (let i = 1; i <= 30; i++) {
        try {
          const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${certId}/quiz-${i}`)
          const data = await response.json()
          counts[`quiz-${i}`] = Array.isArray(data) ? data.length : 0
        } catch (error) {
          counts[`quiz-${i}`] = 0
        }
      }
      
      // Fetch counts for final exams 1-2
      for (let i = 1; i <= 2; i++) {
        try {
          const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${certId}/exam-${i}`)
          const data = await response.json()
          counts[`exam-${i}`] = Array.isArray(data) ? data.length : 0
        } catch (error) {
          counts[`exam-${i}`] = 0
        }
      }
      
      setQuizCounts(counts)
      setLoading(false)
    }
    
    fetchQuestionCounts()
  }, [certId])

  const quizzes: Quiz[] = [
    ...Array.from({ length: 30 }, (_, i) => {
      const quizId = i + 1
      const quizKey = `quiz-${quizId}`
      const questionCount = quizCounts[quizKey] || 0
      const completion = certCompletions[quizId]
      return {
        id: quizId,
        title: `Quiz ${quizId}`,
        questions: questionCount,
        duration: questionCount, // 1 minute per question
        isCompleted: completion?.completed || false,
        score: completion?.score,
        isLocked: false
      }
    }),
    // Final Exams
    ...Array.from({ length: 2 }, (_, i) => {
      const quizId = 31 + i
      const quizKey = `exam-${i + 1}`
      const questionCount = quizCounts[quizKey] || 0
      const completion = certCompletions[quizId]
      return {
        id: quizId,
        title: `Final Exam ${i + 1}`,
        questions: questionCount,
        duration: questionCount, // 1 minute per question
        isCompleted: completion?.completed || false,
        score: completion?.score,
        isLocked: false,
        isFinalExam: true
      }
    })
  ]

  const handleStartQuiz = (quizId: number) => {
    // Store quiz and cert ID in sessionStorage
    sessionStorage.setItem('currentQuizId', quizId.toString())
    sessionStorage.setItem('currentCertId', certId)
    onNavigate('exam')
  }

  const handleBackToDashboard = () => {
    onNavigate('dashboard')
  }

  const completedCount = quizzes.filter(q => q.isCompleted).length
  const progress = (completedCount / quizzes.length) * 100

  const getQuizGradient = (quiz: Quiz) => {
    if (quiz.isFinalExam) return 'from-red-500 to-rose-600'
    return certification.gradient
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={handleBackToDashboard}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              NestedCerts
            </button>
            <Button variant="outline" onClick={handleBackToDashboard}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-8 py-6 sm:py-12">
        {/* Certification Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${certification.gradient} flex items-center justify-center shadow-xl`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {certification.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-mono">
                {certification.code}
              </p>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Overall Progress
              </h2>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {completedCount}/{quizzes.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${certification.gradient} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-sm text-slate-500 dark:text-slate-400 mt-2">
              {progress.toFixed(0)}% Complete
            </div>
          </Card>
        </div>

        {/* Quizzes Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Practice Quizzes
          </h2>
          {loading ? (
            <div className="text-center py-6 sm:py-12 text-slate-600 dark:text-slate-400">
              Loading quizzes...
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className={`group relative overflow-hidden transition-all duration-300 ${
                  quiz.isLocked
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60'
                    : quiz.isCompleted
                    ? quiz.isFinalExam
                      ? 'bg-red-50 dark:bg-red-950/20 border-2 border-red-500 hover:shadow-lg'
                      : 'bg-green-50 dark:bg-green-950/20 border-2 border-green-500 hover:shadow-lg'
                    : quiz.isFinalExam
                    ? 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 hover:shadow-xl'
                    : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-xl'
                }`}
              >
                <div className="p-6">
                  {/* Status Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      quiz.isLocked
                        ? 'bg-slate-200 dark:bg-slate-700'
                        : `bg-gradient-to-br ${getQuizGradient(quiz)}`
                    } shadow-lg`}>
                      {quiz.isLocked ? (
                        <Lock className="w-6 h-6 text-slate-500" />
                      ) : quiz.isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </div>
                    {quiz.isCompleted && quiz.score && (
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                          {quiz.score}%
                        </div>
                        <div className="text-xs text-slate-500">Score</div>
                      </div>
                    )}
                  </div>

                  {/* Quiz Info */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {quiz.title}
                  </h3>

                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span>{quiz.questions} Question{quiz.questions > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.duration} min</span>
                    </div>
                  </div>

                  {/* Action */}
                  {!quiz.isLocked && (
                    <div className="mt-4">
                      {quiz.isCompleted ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-full ${
                            quiz.isFinalExam
                              ? 'border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
                              : 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20'
                          }`}
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Retake Quiz
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className={`w-full bg-gradient-to-r ${getQuizGradient(quiz)} text-white font-semibold`}
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Start Quiz
                        </Button>
                      )}
                    </div>
                  )}

                  {quiz.isLocked && (
                    <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                      Complete previous quiz to unlock
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CertificationDetailPage
