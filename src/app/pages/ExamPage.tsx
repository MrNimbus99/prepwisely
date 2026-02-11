import React, { useState, useEffect } from 'react'
import { NavigationProps, PageName } from '../types'
import { useQuiz } from '../contexts/QuizContext'
import { useFlaggedQuestions } from '../contexts/FlaggedQuestionsContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, CheckCircle, XCircle, Clock, Flag } from 'lucide-react'
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
  const { toggleFlag, isFlagged } = useFlaggedQuestions()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | number[] | null)[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0) // Will be set based on question count
  const [quizId, setQuizId] = useState('quiz-1')
  const [certId, setCertId] = useState('cloud-practitioner')
  const [quizDuration, setQuizDuration] = useState(30) // Duration in minutes
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [timeTaken, setTimeTaken] = useState(0)
  const [overtime, setOvertime] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showExitModal, setShowExitModal] = useState(false)

  useEffect(() => {
    const storedQuizId = sessionStorage.getItem('currentQuizId')
    const storedCertId = sessionStorage.getItem('currentCertId')
    const storedDuration = sessionStorage.getItem('quizDuration')
    
    if (storedQuizId) {
      // Use the quiz number directly (1-32)
      setQuizId(storedQuizId)
    }
    if (storedCertId) setCertId(storedCertId)
    if (storedDuration) setQuizDuration(parseInt(storedDuration))
    setStartTime(Date.now())
  }, [])

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${certId}/${quizId}`)
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }
        
        const data = await response.json()
        
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data)
        } else {
          console.error('No questions returned from API for', certId, quizId)
          setQuestions([])
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error)
        setQuestions([])
      } finally {
        setLoading(false)
      }
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
      // Set timer: duration in minutes * 60 seconds
      setTimeLeft(quizDuration * 60)
    }
  }, [questions, quizDuration])

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
    const allowedTime = quizDuration * 60 // Convert minutes to seconds
    setTimeTaken(elapsed)
    if (elapsed > allowedTime) {
      setOvertime(elapsed - allowedTime)
    }
    setShowResult(true)
  }

  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(null))
    setSelectedAnswer(null)
    setCurrentQuestionIndex(0)
    setShowResult(false)
    setTimeLeft(quizDuration * 60)
    setStartTime(Date.now())
    setTimeTaken(0)
    setOvertime(0)
  }

  const handleComplete = () => {
    // Save completion if passed
    if (passed) {
      const quizNumber = parseInt(quizId)
      completeQuiz(certId, quizNumber, score)
    }
    // Navigate back to certification detail
    const codeToPageMap: { [key: string]: PageName } = {
      'CLF-C02': 'cert-cloud-practitioner',
      'AIF-C01': 'cert-ai-practitioner',
      'SAA-C03': 'cert-solutions-architect-associate',
      'DVA-C02': 'cert-developer-associate',
      'SOA-C03': 'cert-cloudops-engineer-associate',
      'DEA-C01': 'cert-data-engineer-associate',
      'MLA-C01': 'cert-machine-learning-engineer-associate',
      'SAP-C02': 'cert-solutions-architect-professional',
      'DOP-C02': 'cert-devops-engineer-professional',
      'AIP-C01': 'cert-generative-ai-developer-professional',
      'ANS-C01': 'cert-advanced-networking-specialty',
      'SCS-C03': 'cert-security-specialty',
      'MLS-C01': 'cert-machine-learning-specialty'
    }
    onNavigate(codeToPageMap[certId] || 'dashboard')
  }

  const handleBackToCert = () => {
    if (!showResult) {
      setShowExitModal(true)
      return
    }
    // Map exam codes to page names
    const codeToPageMap: { [key: string]: PageName } = {
      'CLF-C02': 'cert-cloud-practitioner',
      'AIF-C01': 'cert-ai-practitioner',
      'SAA-C03': 'cert-solutions-architect-associate',
      'DVA-C02': 'cert-developer-associate',
      'SOA-C03': 'cert-cloudops-engineer-associate',
      'DEA-C01': 'cert-data-engineer-associate',
      'MLA-C01': 'cert-machine-learning-engineer-associate',
      'SAP-C02': 'cert-solutions-architect-professional',
      'DOP-C02': 'cert-devops-engineer-professional',
      'AIP-C01': 'cert-generative-ai-developer-professional',
      'ANS-C01': 'cert-advanced-networking-specialty',
      'SCS-C03': 'cert-security-specialty',
      'MLS-C01': 'cert-machine-learning-specialty'
    }
    onNavigate(codeToPageMap[certId] || 'dashboard')
  }

  const confirmExit = () => {
    setShowExitModal(false)
    const codeToPageMap: { [key: string]: PageName } = {
      'CLF-C02': 'cert-cloud-practitioner',
      'AIF-C01': 'cert-ai-practitioner',
      'SAA-C03': 'cert-solutions-architect-associate',
      'DVA-C02': 'cert-developer-associate',
      'SOA-C03': 'cert-cloudops-engineer-associate',
      'DEA-C01': 'cert-data-engineer-associate',
      'MLA-C01': 'cert-machine-learning-engineer-associate',
      'SAP-C02': 'cert-solutions-architect-professional',
      'DOP-C02': 'cert-devops-engineer-professional',
      'AIP-C01': 'cert-generative-ai-developer-professional',
      'ANS-C01': 'cert-advanced-networking-specialty',
      'SCS-C03': 'cert-security-specialty',
      'MLS-C01': 'cert-machine-learning-specialty'
    }
    onNavigate(codeToPageMap[certId] || 'dashboard')
  }
  
  // Calculate score based on all answers
  const correctCount = answers.filter((answer, idx) => 
    answer !== null && questions[idx] && checkAnswer(answer, questions[idx].correctAnswer)
  ).length
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0
  const passed = score >= 75

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex-shrink-0">
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
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 h-full">
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
          <div className="h-full flex flex-col gap-3 sm:gap-4">
            {/* Question Header */}
            <Card className="bg-white dark:bg-slate-900 p-3 sm:p-4 flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
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
            <Card className="bg-white dark:bg-slate-900 p-3 sm:p-5 flex-1 flex flex-col min-h-0">
              <div className="mb-3 flex-shrink-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug flex-1">
                    {question?.questionText}
                  </h3>
                  <button
                    onClick={() => {
                      const correctAnswerText = Array.isArray(question?.correctAnswer) 
                        ? question?.options[question.correctAnswer[0]] || ''
                        : question?.options[question?.correctAnswer as number] || ''
                      toggleFlag(certId, quizId, question?.questionId || '', question?.questionText || '', question?.options || [], correctAnswerText)
                    }}
                    className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                      isFlagged(question?.questionId || '')
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400'
                    }`}
                    title={isFlagged(question?.questionId || '') ? 'Unflag question' : 'Flag question for review'}
                  >
                    <Flag className="w-5 h-5" fill={isFlagged(question?.questionId || '') ? 'currentColor' : 'none'} />
                  </button>
                </div>
                {isMultiSelect && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      Select all that apply
                    </p>
                  </div>
                )}
              </div>

              {/* Options - Compact Grid Layout */}
              <div className="grid grid-cols-1 gap-2 flex-1 mb-3">
                {question?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all transform hover:scale-[1.01] ${
                      isOptionSelected(index)
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-md'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isMultiSelect ? (
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isOptionSelected(index)
                            ? 'border-blue-500 bg-blue-500 shadow-sm'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {isOptionSelected(index) && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                      ) : (
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isOptionSelected(index)
                            ? 'border-blue-500 bg-blue-500 shadow-sm'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {isOptionSelected(index) && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                      )}
                      <span className="text-sm sm:text-base text-slate-900 dark:text-white font-medium leading-snug flex-1">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 flex-shrink-0">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="flex-1 py-3 text-base font-bold disabled:opacity-30 border-2"
                >
                  ← Previous
                </Button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1 py-3 text-base font-bold bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl"
                  >
                    Next →
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 py-2 sm:py-3 text-sm sm:text-base font-bold bg-gradient-to-r from-green-500 to-emerald-600"
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
                    {passed ? '✓ Passed - You need 75% or higher' : '✗ Failed - You need 75% or higher to pass'}
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
