import React, { useState, useEffect } from 'react'
import { NavigationProps, PageName } from '../types'
import { useQuiz } from '../contexts/QuizContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Question {
  questionId: string
  questionText: string
  options: string[]
  correctAnswer: number
  explanation: string
  domain: string
}

const ExamPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { completeQuiz } = useQuiz()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const [quizId, setQuizId] = useState('quiz-1')
  const [certId, setCertId] = useState('cloud-practitioner')
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [timeTaken, setTimeTaken] = useState(0)
  const [overtime, setOvertime] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedQuizId = sessionStorage.getItem('currentQuizId')
    const storedCertId = sessionStorage.getItem('currentCertId')
    if (storedQuizId) setQuizId(storedQuizId)
    if (storedCertId) setCertId(storedCertId)
    setStartTime(Date.now())
  }, [])

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${certId}/${quizId}`)
        const data = await response.json()
        setQuestions(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to fetch questions:', error)
        setQuestions([])
      }
      setLoading(false)
    }
    if (certId && quizId) {
      fetchQuestions()
    }
  }, [certId, quizId])

  // Timer countdown
  useEffect(() => {
    if (!showResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showResult, timeLeft])

  const question = questions[currentQuestionIndex]

  const handleSubmit = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    setTimeTaken(elapsed)
    if (elapsed > 120) {
      setOvertime(elapsed - 120)
    }
    setShowResult(true)
  }

  const handleRetry = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(120)
    setStartTime(Date.now())
    setTimeTaken(0)
    setOvertime(0)
  }

  const handleComplete = () => {
    // Save completion if passed
    if (passed) {
      const quizNumber = quizId.startsWith('quiz-') 
        ? parseInt(quizId.replace('quiz-', ''))
        : parseInt(quizId.replace('exam-', '')) + 30
      completeQuiz(certId, quizNumber, score)
    }
    // Navigate back to certification detail
    const pageMap: { [key: string]: PageName } = {
      'cloud-practitioner': 'cert-cloud-practitioner',
      'ai-practitioner': 'cert-ai-practitioner',
      'solutions-architect-associate': 'cert-solutions-architect-associate',
      'developer-associate': 'cert-developer-associate',
      'sysops-administrator-associate': 'cert-sysops-administrator-associate',
      'data-engineer-associate': 'cert-data-engineer-associate',
      'machine-learning-engineer-associate': 'cert-machine-learning-engineer-associate',
      'solutions-architect-professional': 'cert-solutions-architect-professional',
      'devops-engineer-professional': 'cert-devops-engineer-professional',
      'advanced-networking-professional': 'cert-advanced-networking-professional',
      'security-specialty': 'cert-security-specialty',
      'machine-learning-specialty': 'cert-machine-learning-specialty',
      'database-specialty': 'cert-database-specialty'
    }
    onNavigate(pageMap[certId] || 'dashboard')
  }

  const handleBackToCert = () => {
    const pageMap: { [key: string]: PageName } = {
      'cloud-practitioner': 'cert-cloud-practitioner',
      'ai-practitioner': 'cert-ai-practitioner',
      'solutions-architect-associate': 'cert-solutions-architect-associate',
      'developer-associate': 'cert-developer-associate',
      'sysops-administrator-associate': 'cert-sysops-administrator-associate',
      'data-engineer-associate': 'cert-data-engineer-associate',
      'machine-learning-engineer-associate': 'cert-machine-learning-engineer-associate',
      'solutions-architect-professional': 'cert-solutions-architect-professional',
      'devops-engineer-professional': 'cert-devops-engineer-professional',
      'advanced-networking-professional': 'cert-advanced-networking-professional',
      'security-specialty': 'cert-security-specialty',
      'machine-learning-specialty': 'cert-machine-learning-specialty',
      'database-specialty': 'cert-database-specialty'
    }
    onNavigate(pageMap[certId] || 'dashboard')
  }

  const isCorrect = selectedAnswer === question.correctAnswer
  const score = isCorrect ? 100 : 0
  const passed = score >= 82

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={handleBackToCert}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              PrepWisely
            </button>
            <div className="flex items-center gap-4">
              {!showResult && (
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              <Button variant="outline" onClick={handleBackToCert}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <Card className="bg-white dark:bg-slate-900 p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">Loading questions...</p>
          </Card>
        ) : questions.length === 0 ? (
          <Card className="bg-white dark:bg-slate-900 p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">No questions available for this quiz.</p>
            <Button onClick={handleBackToCert} className="mt-4">Back to Certification</Button>
          </Card>
        ) : !showResult ? (
          /* Question View */
          <div className="space-y-8">
            {/* Question Header */}
            <Card className="bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {quizId.replace('-', ' ').toUpperCase()} - {certId}
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all" 
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </Card>

            {/* Question */}
            <Card className="bg-white dark:bg-slate-900 p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
                {question?.questionText}
              </h3>

              {/* Options */}
              <div className="space-y-4">
                {question?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg scale-105'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-lg text-slate-900 dark:text-white font-medium">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl transition-all duration-300"
                >
                  Submit Answer
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Result View */
          <div className="space-y-8">
            {/* Score Card */}
            <Card className={`relative overflow-hidden p-8 text-center ${
              passed
                ? 'bg-white dark:bg-slate-900 border-2 border-green-500'
                : 'bg-white dark:bg-slate-900 border-2 border-red-500'
            }`}>
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                passed ? 'from-green-500 to-emerald-600' : 'from-red-500 to-orange-600'
              } opacity-5`} />
              
              <div className="relative">
                <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  passed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-orange-600'
                } shadow-2xl animate-pulse`}>
                  {passed ? (
                    <CheckCircle className="w-12 h-12 text-white" />
                  ) : (
                    <XCircle className="w-12 h-12 text-white" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {passed ? 'Congratulations!' : 'Keep Practicing!'}
                </h2>
                <div className="mb-6">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">
                    {score}%
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Your Score
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {formatDuration(timeTaken)}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Time Taken</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {isCorrect ? '1/1' : '0/1'}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Correct</div>
                  </div>
                </div>

                {overtime > 0 && (
                  <div className="mb-4 px-4 py-2 bg-orange-100 dark:bg-orange-950/30 rounded-lg inline-block">
                    <p className="text-sm text-orange-700 dark:text-orange-400">
                      ⏱️ Went {formatDuration(overtime)} over time
                    </p>
                  </div>
                )}

                <div className={`inline-block px-6 py-3 rounded-full ${
                  passed ? 'bg-green-100 dark:bg-green-950/30' : 'bg-red-100 dark:bg-red-950/30'
                }`}>
                  <p className={`font-semibold ${
                    passed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                  }`}>
                    {passed ? '✓ Passed - You need 82% or higher' : '✗ Failed - You need 82% or higher to pass'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Answer Review - Only show if wrong */}
            {!isCorrect && (
              <Card className="bg-white dark:bg-slate-900 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Review Incorrect Answer
                  </h3>
                </div>

                <div className="space-y-8">
                  {/* Question */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Q</span>
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                        Question
                      </h4>
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed pl-10">
                      {question?.questionText}
                    </p>
                  </div>

                  {/* Your Answer */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                        Your Answer
                      </h4>
                    </div>
                    <div className="p-5 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-950/20 ml-10">
                      <p className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
                        {selectedAnswer !== null ? question?.options[selectedAnswer] : 'No answer selected'}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        This answer is incorrect.
                      </p>
                    </div>
                  </div>

                  {/* Correct Answer */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                        Correct Answer
                      </h4>
                    </div>
                    <div className="p-5 rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-950/20 ml-10">
                      <p className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
                        {question?.options[question.correctAnswer]}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {question?.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {passed ? (
                <>
                  <Button
                    onClick={handleComplete}
                    className="flex-1 py-6 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    ✓ Complete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRetry}
                    className="px-12 py-6 text-xl font-semibold border-2 hover:scale-105 transition-all duration-300"
                  >
                    Retry
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleRetry}
                    className="flex-1 py-6 text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    ↻ Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBackToCert}
                    className="px-12 py-6 text-xl font-semibold border-2 hover:scale-105 transition-all duration-300"
                  >
                    Back to Quizzes
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamPage
