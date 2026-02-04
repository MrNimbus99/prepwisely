import React, { useState, useEffect } from 'react'
import { NavigationProps } from '../types'
import { useQuiz } from '../contexts/QuizContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const ExamPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { completeQuiz } = useQuiz()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft] = useState(120) // 2 minutes
  const [quizId, setQuizId] = useState(1)
  const [certId, setCertId] = useState('cloud-practitioner')

  useEffect(() => {
    const storedQuizId = sessionStorage.getItem('currentQuizId')
    const storedCertId = sessionStorage.getItem('currentCertId')
    if (storedQuizId) setQuizId(parseInt(storedQuizId))
    if (storedCertId) setCertId(storedCertId)
  }, [])

  // Sample question for Cloud Practitioner
  const question: Question = {
    id: 1,
    question: 'What is the AWS service that provides scalable compute capacity in the cloud?',
    options: [
      'Amazon S3',
      'Amazon EC2',
      'Amazon RDS',
      'Amazon VPC'
    ],
    correctAnswer: 1,
    explanation: 'Amazon EC2 (Elastic Compute Cloud) provides scalable compute capacity in the cloud. It allows you to launch virtual servers and scale capacity up or down based on your needs.'
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  const handleComplete = () => {
    // Save completion if passed
    if (passed) {
      completeQuiz(certId, quizId, score)
    }
    // Navigate back to certification detail
    onNavigate('certification-detail')
  }

  const isCorrect = selectedAnswer === question.correctAnswer
  const score = isCorrect ? 100 : 0
  const passed = score >= 82

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => onNavigate('certification-detail')}
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
              <Button variant="outline" onClick={() => onNavigate('certification-detail')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showResult ? (
          /* Question View */
          <div className="space-y-8">
            {/* Question Header */}
            <Card className="bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Question 1 of 1
                </h2>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Quiz {quizId} - Cloud Practitioner
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 w-full" />
              </div>
            </Card>

            {/* Question */}
            <Card className="bg-white dark:bg-slate-900 p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
                {question.question}
              </h3>

              {/* Options */}
              <div className="space-y-4">
                {question.options.map((option, index) => (
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
            <Card className={`relative overflow-hidden p-12 text-center ${
              passed
                ? 'bg-white dark:bg-slate-900 border-2 border-green-500'
                : 'bg-white dark:bg-slate-900 border-2 border-red-500'
            }`}>
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                passed ? 'from-green-500 to-emerald-600' : 'from-red-500 to-orange-600'
              } opacity-5`} />
              
              <div className="relative">
                <div className={`w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center ${
                  passed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-orange-600'
                } shadow-2xl animate-pulse`}>
                  {passed ? (
                    <CheckCircle className="w-16 h-16 text-white" />
                  ) : (
                    <XCircle className="w-16 h-16 text-white" />
                  )}
                </div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  {passed ? 'Congratulations!' : 'Keep Practicing!'}
                </h2>
                <div className="mb-6">
                  <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">
                    {score}%
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    Your Score
                  </p>
                </div>
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

            {/* Answer Review */}
            <Card className="bg-white dark:bg-slate-900 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Answer Review
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
                    {question.question}
                  </p>
                </div>

                {/* Your Answer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                      Your Answer
                    </h4>
                  </div>
                  <div className={`p-5 rounded-xl border-2 ml-10 ${
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-500'
                      : 'bg-red-50 dark:bg-red-950/20 border-red-500'
                  }`}>
                    <p className="font-semibold text-lg text-slate-900 dark:text-white">
                      {selectedAnswer !== null ? question.options[selectedAnswer] : 'No answer selected'}
                    </p>
                  </div>
                </div>

                {/* Correct Answer (if wrong) */}
                {!isCorrect && (
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
                      <p className="font-semibold text-lg text-slate-900 dark:text-white">
                        {question.options[question.correctAnswer]}
                      </p>
                    </div>
                  </div>
                )}

                {/* Explanation */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-white">i</span>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                      Explanation
                    </h4>
                  </div>
                  <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-l-4 border-blue-500 ml-10">
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleComplete}
                className="flex-1 py-6 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {passed ? '✓ Complete & Continue' : '↻ Try Again'}
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('certification-detail')}
                className="px-12 py-6 text-xl font-semibold border-2 hover:scale-105 transition-all duration-300"
              >
                Back to Quizzes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamPage
