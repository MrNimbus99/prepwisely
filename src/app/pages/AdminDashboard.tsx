import React, { useState, useEffect } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { FileEdit, Users, CreditCard, LogOut, Eye, List } from 'lucide-react'
import { CERTIFICATIONS, QUIZ_TYPES } from '../data/certifications'

const AdminDashboard: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<'questions' | 'users' | 'billing' | 'view-questions'>('questions')

  const handleSignOut = async () => {
    await signOut()
    onNavigate('landing')
  }

  if (user?.email !== 'admin@prepwisely.com') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You don't have permission to access the admin portal.</p>
          <Button onClick={() => onNavigate('dashboard')} className="mt-4">Go to Dashboard</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PrepWisely Admin
              </h1>
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Admin</Badge>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                <Eye className="w-4 h-4 mr-2" />
                Student View
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'questions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <FileEdit className="w-5 h-5 inline mr-2" />
              Question Editor
            </button>
            <button
              onClick={() => setActiveTab('view-questions')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'view-questions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-5 h-5 inline mr-2" />
              View Questions
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              User Management
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'billing'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <CreditCard className="w-5 h-5 inline mr-2" />
              Billing & Invoices
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'questions' && <QuestionEditor />}
        {activeTab === 'view-questions' && <ViewQuestions />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'billing' && <BillingManagement />}
      </main>
    </div>
  )
}

const QuestionEditor: React.FC = () => {
  const [certId, setCertId] = useState('solutions-architect-associate')
  const [domain, setDomain] = useState('')
  const [quizId, setQuizId] = useState('quiz-1')
  const [status, setStatus] = useState('draft')
  const [questionText, setQuestionText] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [explanation, setExplanation] = useState('')
  const [questionCount, setQuestionCount] = useState(0)

  const selectedCert = CERTIFICATIONS[certId as keyof typeof CERTIFICATIONS]
  const domains = selectedCert?.domains || []

  useEffect(() => {
    if (domains.length > 0 && !domain) {
      setDomain(domains[0])
    }
  }, [certId, domains, domain])

  useEffect(() => {
    // Fetch question count for selected quiz
    fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${certId}/${quizId}/count`)
      .then(res => res.json())
      .then(data => setQuestionCount(data.count || 0))
      .catch(() => setQuestionCount(0))
  }, [certId, quizId])

  const handleSave = async () => {
    const question = {
      certId,
      quizId,
      domain,
      status,
      questionText,
      options,
      correctAnswer,
      explanation,
      createdAt: new Date().toISOString()
    }

    try {
      const response = await fetch('https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
      })
      
      if (response.ok) {
        alert('Question saved successfully!')
        // Reset form
        setQuestionText('')
        setOptions(['', '', '', ''])
        setCorrectAnswer(0)
        setExplanation('')
        setQuestionCount(prev => prev + 1)
      }
    } catch (error) {
      alert('Failed to save question')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Question Editor</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {questionCount} questions in {selectedCert?.name} - {quizId.replace('-', ' ').toUpperCase()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="lg" onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Save Question
          </Button>
        </div>
      </div>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Basic Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Certification</label>
            <select
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {Object.entries(CERTIFICATIONS).map(([key, cert]) => (
                <option key={key} value={key}>{cert.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Domain</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {domains.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Quiz</label>
            <select
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {QUIZ_TYPES.map((quiz) => (
                <option key={quiz.value} value={quiz.value}>{quiz.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Question Text</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="Enter question text..."
          />
        </div>

        <div className="mt-8 space-y-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Answer Options</label>
          {['A', 'B', 'C', 'D'].map((option, idx) => (
            <div key={option} className="flex gap-3 items-center">
              <input
                type="radio"
                name="correct"
                checked={correctAnswer === idx}
                onChange={() => setCorrectAnswer(idx)}
                className="w-5 h-5 text-blue-600"
              />
              <input
                type="text"
                value={options[idx]}
                onChange={(e) => {
                  const newOptions = [...options]
                  newOptions[idx] = e.target.value
                  setOptions(newOptions)
                }}
                placeholder={`Option ${option}`}
                className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Explanation</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-24 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="Explain the correct answer..."
          />
        </div>
      </Card>
    </div>
  )
}

const ViewQuestions: React.FC = () => {
  const [certId, setCertId] = useState('solutions-architect-associate')
  const [quizId, setQuizId] = useState('quiz-1')
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const selectedCert = CERTIFICATIONS[certId as keyof typeof CERTIFICATIONS]

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

  useEffect(() => {
    fetchQuestions()
  }, [certId, quizId])

  const handleDelete = async (questionId: string) => {
    if (questions.length <= 1) {
      alert('Cannot delete the last question. Each quiz must have at least 1 question.')
      return
    }

    if (!confirm('Are you sure you want to delete this question?')) {
      return
    }

    try {
      const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${questionId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        alert('Question deleted successfully!')
        fetchQuestions()
      } else {
        alert('Failed to delete question')
      }
    } catch (error) {
      alert('Error deleting question')
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return
    
    const newQuestions = [...questions]
    const temp = newQuestions[index]
    newQuestions[index] = newQuestions[index - 1]
    newQuestions[index - 1] = temp
    
    setQuestions(newQuestions)
    await updateQuestionOrder(newQuestions)
  }

  const handleMoveDown = async (index: number) => {
    if (index === questions.length - 1) return
    
    const newQuestions = [...questions]
    const temp = newQuestions[index]
    newQuestions[index] = newQuestions[index + 1]
    newQuestions[index + 1] = temp
    
    setQuestions(newQuestions)
    await updateQuestionOrder(newQuestions)
  }

  const updateQuestionOrder = async (orderedQuestions: any[]) => {
    try {
      await Promise.all(orderedQuestions.map((q, idx) => 
        fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${q.questionId}/order`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: idx })
        })
      ))
    } catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">View Questions for Quiz</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">Browse and manage all questions for a specific quiz</p>
      </div>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Certification</label>
            <select
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {Object.entries(CERTIFICATIONS).map(([key, cert]) => (
                <option key={key} value={key}>{cert.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Quiz</label>
            <select
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              {QUIZ_TYPES.map((quiz) => (
                <option key={quiz.value} value={quiz.value}>{quiz.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            {questions.length} Questions in {selectedCert?.name} - {quizId.replace('-', ' ').toUpperCase()}
          </h3>

          {loading ? (
            <p className="text-slate-600 dark:text-slate-400">Loading questions...</p>
          ) : questions.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">No questions found for this quiz.</p>
          ) : (
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <Card key={q.questionId} className="p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">#{idx + 1}</span>
                      <Badge className={q.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}>
                        {q.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="disabled:opacity-30"
                      >
                        ↑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === questions.length - 1}
                        className="disabled:opacity-30"
                      >
                        ↓
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(q.questionId)}
                        disabled={questions.length <= 1}
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 disabled:opacity-30"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-slate-900 dark:text-white font-medium mb-3">{q.questionText}</p>
                  <div className="space-y-2 mb-3">
                    {q.options?.map((opt: string, i: number) => (
                      <div key={i} className={`px-3 py-2 rounded ${i === q.correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        <span className="font-semibold">{String.fromCharCode(65 + i)}.</span> {opt}
                        {i === q.correctAnswer && <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">✓ Correct</span>}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                    <span className="font-medium">Domain:</span> {q.domain}
                  </div>
                  {q.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-semibold text-blue-900 dark:text-blue-300">Explanation:</span>
                      <p className="text-slate-700 dark:text-slate-300 mt-1">{q.explanation}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">User Management</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">View and manage all platform users</p>
      </div>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <div className="mb-6">
          <input
            type="search"
            placeholder="Search users by email..."
            className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Subscription</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Joined</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">user@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Monthly</Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                </td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-02-01</td>
                <td className="py-4 px-6">
                  <Button size="sm" variant="outline">Manage</Button>
                </td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">another@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Annual</Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                </td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-01-28</td>
                <td className="py-4 px-6">
                  <Button size="sm" variant="outline">Manage</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Entitlements & Subscriptions</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Manage user subscriptions and access rights</p>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">247</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Subscriptions</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">89</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Lifetime Access</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">12</div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Trial Users</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const BillingManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Invoices & Billing History</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">Track revenue and manage billing</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Total Revenue</div>
          <div className="text-4xl font-bold mb-2">$24,580</div>
          <div className="text-sm font-medium opacity-90">+12% this month</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Monthly Recurring</div>
          <div className="text-4xl font-bold mb-2">$4,940</div>
          <div className="text-sm font-medium opacity-90">247 subscribers</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Annual Revenue</div>
          <div className="text-4xl font-bold mb-2">$8,010</div>
          <div className="text-sm font-medium opacity-90">89 subscribers</div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-2">Lifetime Sales</div>
          <div className="text-4xl font-bold mb-2">$10,680</div>
          <div className="text-sm font-medium opacity-90">89 purchases</div>
        </Card>
      </div>

      <Card className="p-8 bg-white dark:bg-slate-800 shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Recent Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Invoice #</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Plan</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">#INV-2026-001</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">user@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Monthly</Badge>
                </td>
                <td className="py-4 px-6 text-slate-900 dark:text-white font-semibold">$20.00</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-02-05</td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
                </td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">#INV-2026-002</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">another@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Annual</Badge>
                </td>
                <td className="py-4 px-6 text-slate-900 dark:text-white font-semibold">$90.00</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-02-04</td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
                </td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">#INV-2026-003</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">lifetime@example.com</td>
                <td className="py-4 px-6">
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Lifetime</Badge>
                </td>
                <td className="py-4 px-6 text-slate-900 dark:text-white font-semibold">$120.00</td>
                <td className="py-4 px-6 text-slate-700 dark:text-slate-300">2026-02-03</td>
                <td className="py-4 px-6">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default AdminDashboard
