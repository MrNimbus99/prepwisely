import React, { useState, useEffect } from 'react'
import { PageName } from '../types'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  Clock,
  CheckCircle,
  XCircle,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Flag,
  Bookmark,
  RotateCcw
} from 'lucide-react'

interface ExamPageProps {
  onNavigate: (page: PageName) => void
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  domain: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const ExamPage: React.FC<ExamPageProps> = ({ onNavigate }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes
  const [examStarted, setExamStarted] = useState(false)
  const [examCompleted, setExamCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set())

  // Mock questions for now
  useEffect(() => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        question: 'Which AWS service provides a managed NoSQL database?',
        options: ['Amazon RDS', 'Amazon DynamoDB', 'Amazon Redshift', 'Amazon Aurora'],
        correctAnswer: 1,
        explanation: 'Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance.',
        domain: 'Database',
        difficulty: 'Easy'
      },
      {
        id: '2', 
        question: 'What is the maximum size of an S3 object?',
        options: ['5 GB', '5 TB', '100 GB', '1 TB'],
        correctAnswer: 1,
        explanation: 'The maximum size of an S3 object is 5 TB.',
        domain: 'Storage',
        difficulty: 'Medium'
      }
    ]
    setQuestions(mockQuestions)
    setSelectedAnswers(new Array(mockQuestions.length).fill(-1))
    setLoading(false)
  }, [])

  // Timer
  useEffect(() => {
    if (examStarted && !examCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [examStarted, examCompleted, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleFlag = () => {
    const newFlagged = new Set(flaggedQuestions)
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion)
    } else {
      newFlagged.add(currentQuestion)
    }
    setFlaggedQuestions(newFlagged)
  }

  const handleBookmark = () => {
    const newBookmarked = new Set(bookmarkedQuestions)
    if (newBookmarked.has(currentQuestion)) {
      newBookmarked.delete(currentQuestion)
    } else {
      newBookmarked.add(currentQuestion)
    }
    setBookmarkedQuestions(newBookmarked)
  }

  const handleSubmitExam = () => {
    setExamCompleted(true)
    // Calculate score and save results
  }

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading exam...</p>
        </div>
      </div>
    )
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Daily Practice Exam</CardTitle>
              <CardDescription>AWS Solutions Architect Associate (SAA-C03)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold">20 Questions</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Mixed difficulty</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">30 Minutes</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Timed exam</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold">Passing: 70%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">14+ correct</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Button
                  onClick={() => setExamStarted(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg"
                >
                  Start Exam
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('dashboard')}
                  className="ml-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (examCompleted) {
    const score = calculateScore()
    const passed = score >= 70

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <CardHeader className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                passed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
              }`}>
                {passed ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <CardTitle className="text-3xl font-bold">
                {passed ? 'Congratulations!' : 'Keep Practicing!'}
              </CardTitle>
              <CardDescription>
                You scored {score}% ({selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length}/{questions.length} correct)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <Badge variant={passed ? 'default' : 'destructive'} className="text-lg px-4 py-2">
                  {passed ? 'PASSED' : 'FAILED'}
                </Badge>
                
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => onNavigate('dashboard')}>
                    Back to Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setExamStarted(false)
                    setExamCompleted(false)
                    setCurrentQuestion(0)
                    setSelectedAnswers(new Array(questions.length).fill(-1))
                    setTimeLeft(30 * 60)
                    setFlaggedQuestions(new Set())
                  }}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Exam
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Question {currentQuestion + 1} of {questions.length}</Badge>
              <Badge variant="secondary">{question.domain}</Badge>
              <Badge variant={question.difficulty === 'Easy' ? 'default' : question.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                {question.difficulty}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleFlag}>
                <Flag className={`h-4 w-4 ${flaggedQuestions.has(currentQuestion) ? 'text-red-600' : ''}`} />
              </Button>
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className={`h-4 w-4 ${bookmarkedQuestions.has(currentQuestion) ? 'text-blue-600' : ''}`} />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-slate-900 dark:text-white">{option}</span>
                </div>
              </button>
            ))}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmitExam}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Submit Exam
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === -1}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ExamPage
