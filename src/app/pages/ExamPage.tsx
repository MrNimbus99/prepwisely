import React, { useState } from 'react'
import { NavigationProps } from '../types'
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft] = useState(120) // 2 minutes

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
                  Cloud Practitioner Quiz
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
            <Card className={`p-8 text-center ${
              passed
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-500'
                : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-500'
            }`}>
              <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                passed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-orange-600'
              } shadow-xl`}>
                {passed ? (
                  <CheckCircle className="w-12 h-12 text-white" />
                ) : (
                  <XCircle className="w-12 h-12 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {passed ? 'Congratulations!' : 'Keep Practicing!'}
              </h2>
              <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
                Your Score: <span className="font-bold text-3xl">{score}%</span>
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {passed ? 'You passed! You need 82% or higher to complete this quiz.' : 'You need 82% or higher to pass. Try again!'}
              </p>
            </Card>

            {/* Answer Review */}
            <Card className="bg-white dark:bg-slate-900 p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Answer Review
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Question:
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {question.question}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Your Answer:
                  </h4>
                  <div className={`p-4 rounded-lg ${
                    isCorrect
                      ? 'bg-green-50 dark:bg-green-950/20 border-2 border-green-500'
                      : 'bg-red-50 dark:bg-red-950/20 border-2 border-red-500'
                  }`}>
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-medium text-slate-900 dark:text-white">
                        {selectedAnswer !== null ? question.options[selectedAnswer] : 'No answer selected'}
                      </span>
                    </div>
                  </div>
                </div>

                {!isCorrect && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                      Correct Answer:
                    </h4>
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border-2 border-green-500">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-slate-900 dark:text-white">
                          {question.options[question.correctAnswer]}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    Explanation:
                  </h4>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
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
                className="flex-1 py-4 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl transition-all duration-300"
              >
                {passed ? 'Complete & Continue' : 'Try Again'}
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('certification-detail')}
                className="px-8 py-4 text-lg font-semibold"
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
