import React, { useState, useEffect } from 'react'
import { NavigationProps, PageName } from '../types'
import { useQuiz } from '../contexts/QuizContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'
import { isMultipleCorrect, checkAnswer, formatCorrectAnswer } from '../utils/questionHelpers'

interface Question {
  questionId: string
  questionText: string
  options: string[]
  correctAnswer: number | number[]
  explanation: string
  domain: string
  multipleCorrect?: boolean
}

const ExamPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { completeQuiz } = useQuiz()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | number[] | null)[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0) // Will be set based on question count
  const [quizId, setQuizId] = useState('quiz-1')
  const [certId, setCertId] = useState('cloud-practitioner')
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [timeTaken, setTimeTaken] = useState(0)
  const [overtime, setOvertime] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showExitModal, setShowExitModal] = useState(false)

  useEffect(() => {
    const storedQuizId = sessionStorage.getItem('currentQuizId')
    const storedCertId = sessionStorage.getItem('currentCertId')
    
    if (storedQuizId) {
      const quizNumber = parseInt(storedQuizId)
      // Convert number to API format: 1-30 = quiz-1 to quiz-30, 31-32 = exam-1 to exam-2
      const apiQuizId = quizNumber <= 30 
        ? `quiz-${quizNumber}` 
        : `exam-${quizNumber - 30}`
      setQuizId(apiQuizId)
    }
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

  // Initialize answers array when questions load
  useEffect(() => {
    if (questions.length > 0) {
      setAnswers(new Array(questions.length).fill(null))
      setSelectedAnswer(null)
      // Set timer: 1 minute per question (60 seconds * question count)
      setTimeLeft(questions.length * 60)
    }
  }, [questions])

  // Load saved answer when changing questions
  useEffect(() => {
    setSelectedAnswer(answers[currentQuestionIndex] || null)
  }, [currentQuestionIndex])

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
  const isMultiSelect = question && isMultipleCorrect(question.correctAnswer)

  const handleAnswerSelect = (answerIndex: number) => {
    if (isMultiSelect) {
      // Multiple selection mode
      const currentSelected = Array.isArray(selectedAnswer) ? selectedAnswer : []
      const newSelected = currentSelected.includes(answerIndex)
        ? currentSelected.filter(idx => idx !== answerIndex)
        : [...currentSelected, answerIndex]
      
      setSelectedAnswer(newSelected.length > 0 ? newSelected : null)
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = newSelected.length > 0 ? newSelected : null
      setAnswers(newAnswers)
    } else {
      // Single selection mode
      setSelectedAnswer(answerIndex)
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = answerIndex
      setAnswers(newAnswers)
    }
  }

  const isOptionSelected = (index: number): boolean => {
    if (Array.isArray(selectedAnswer)) {
      return selectedAnswer.includes(index)
    }
    return selectedAnswer === index
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    setTimeTaken(elapsed)
    if (elapsed > 120) {
      setOvertime(elapsed - 120)
    }
    setShowResult(true)
  }

  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(null))
    setSelectedAnswer(null)
    setCurrentQuestionIndex(0)
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
    if (!showResult) {
      setShowExitModal(true)
      return
    }
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

  const confirmExit = () => {
    setShowExitModal(false)
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
  
  // Calculate score based on all answers
  const correctCount = answers.filter((answer, idx) => 
    answer !== null && questions[idx] && checkAnswer(answer, questions[idx].correctAnswer)
  ).length
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button
              onClick={handleBackToCert}
              className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              NestedCerts
            </button>
            <div className="flex items-center gap-2 sm:gap-4">
              {!showResult && (
                <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 dark:bg-slate-800 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-400" />
                  <span className="font-mono text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              <Button variant="outline" onClick={handleBackToCert} className="text-sm sm:text-base px-2 sm:px-4">
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Exit</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {loading ? (
          <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">Loading questions...</p>
          </Card>
        ) : questions.length === 0 ? (
          <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">No questions available for this quiz.</p>
            <Button onClick={handleBackToCert} className="mt-4">Back to Certification</Button>
          </Card>
        ) : !showResult ? (
          /* Question View */
          <div className="space-y-4 sm:space-y-8">
            {/* Question Header */}
            <Card className="bg-white dark:bg-slate-900 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {quizId.replace('-', ' ').toUpperCase()}
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
            <Card className="bg-white dark:bg-slate-900 p-4 sm:p-8">
              <div className="mb-4">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-relaxed">
                  {question?.questionText}
                </h3>
                {isMultiSelect && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Select all that apply
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 sm:space-y-4">
                {question?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                      isOptionSelected(index)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg scale-[1.02] sm:scale-105'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      {isMultiSelect ? (
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                          isOptionSelected(index)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {isOptionSelected(index) && (
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          )}
                        </div>
                      ) : (
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                          isOptionSelected(index)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {isOptionSelected(index) && (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
                          )}
                        </div>
                      )}
                      <span className="text-base sm:text-lg text-slate-900 dark:text-white font-medium break-words">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-6 sm:mt-8 flex gap-3 sm:gap-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="flex-1 py-3 sm:py-4 text-base sm:text-lg font-semibold disabled:opacity-30"
                >
                  ← Previous
                </Button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1 py-3 sm:py-4 text-base sm:text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl transition-all duration-300"
                  >
                    Next →
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 py-3 sm:py-4 text-base sm:text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl transition-all duration-300"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ) : (
          /* Result View */
          <div className="space-y-4 sm:space-y-8">
            {/* Score Card */}
            <Card className={`relative overflow-hidden p-6 sm:p-8 text-center ${
              passed
                ? 'bg-white dark:bg-slate-900 border-2 border-green-500'
                : 'bg-white dark:bg-slate-900 border-2 border-red-500'
            }`}>
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                passed ? 'from-green-500 to-emerald-600' : 'from-red-500 to-orange-600'
              } opacity-5`} />
              
              <div className="relative">
                <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center ${
                  passed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-orange-600'
                } shadow-2xl animate-pulse`}>
                  {passed ? (
                    <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  ) : (
                    <XCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                  {passed ? 'Congratulations!' : 'Keep Practicing!'}
                </h2>
                <div className="mb-4 sm:mb-6">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">
                    {score}%
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
                    Your Score
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto mb-4 sm:mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {formatDuration(timeTaken)}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Time Taken</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {correctCount}/{questions.length}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Correct</div>
                  </div>
                </div>

                {overtime > 0 && (
                  <div className="mb-4 px-3 sm:px-4 py-2 bg-orange-100 dark:bg-orange-950/30 rounded-lg inline-block">
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-400">
                      ⏱️ Went {formatDuration(overtime)} over time
                    </p>
                  </div>
                )}

                <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full ${
                  passed ? 'bg-green-100 dark:bg-green-950/30' : 'bg-red-100 dark:bg-red-950/30'
                }`}>
                  <p className={`text-xs sm:text-base font-semibold ${
                    passed ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                  }`}>
                    {passed ? '✓ Passed - You need 82% or higher' : '✗ Failed - You need 82% or higher to pass'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Answer Review */}
            <Card className="bg-white dark:bg-slate-900 p-4 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Review Your Answers
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {questions.map((q, idx) => {
                  const userAnswer = answers[idx]
                  const isCorrect = checkAnswer(userAnswer, q.correctAnswer)
                  const isMulti = isMultipleCorrect(q.correctAnswer)
                  
                  const formatUserAnswer = () => {
                    if (userAnswer === null) return 'Not answered'
                    if (Array.isArray(userAnswer)) {
                      return userAnswer.map(i => q.options[i]).join(', ')
                    }
                    return q.options[userAnswer as number]
                  }
                  
                  return (
                    <div key={q.questionId} className={`p-4 sm:p-6 rounded-xl border-2 ${
                      isCorrect 
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                        : 'border-red-500 bg-red-50 dark:bg-red-950/20'
                    }`}>
                      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          ) : (
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 break-words">
                            Question {idx + 1}: {q.questionText}
                            {isMulti && <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(Multiple answers)</span>}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2 break-words">
                            Your answer: <span className="font-semibold">{formatUserAnswer()}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-xs sm:text-sm text-green-700 dark:text-green-400 break-words">
                              Correct answer: <span className="font-semibold">{formatCorrectAnswer(q.correctAnswer, q.options)}</span>
                            </p>
                          )}
                          {q.explanation && (
                            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 italic break-words whitespace-pre-line">
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4">
              {passed ? (
                <>
                  <Button
                    onClick={handleComplete}
                    className="flex-1 py-4 sm:py-6 text-base sm:text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    ✓ Complete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRetry}
                    className="px-6 sm:px-12 py-4 sm:py-6 text-base sm:text-xl font-semibold border-2 hover:scale-105 transition-all duration-300"
                  >
                    Retry
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleRetry}
                    className="flex-1 py-4 sm:py-6 text-base sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    ↻ Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBackToCert}
                    className="px-6 sm:px-12 py-4 sm:py-6 text-base sm:text-xl font-semibold border-2 hover:scale-105 transition-all duration-300"
                  >
                    Back
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform animate-in">
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Exit Quiz?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Are you sure you want to exit? Your progress will be lost and you'll need to start over.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-2.5 sm:py-3 text-sm sm:text-base font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmExit}
                className="flex-1 py-2.5 sm:py-3 text-sm sm:text-base font-semibold bg-red-600 hover:bg-red-700 text-white"
              >
                Exit Quiz
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExamPage
