import React, { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { CERTIFICATIONS, QUIZ_TYPES } from '../../data/certifications'

const ViewQuestions: React.FC = () => {
  const [certId, setCertId] = useState('solutions-architect-associate')
  const [quizId, setQuizId] = useState('quiz-1')
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})

  const selectedCert = CERTIFICATIONS[certId as keyof typeof CERTIFICATIONS]

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${certId}/${quizId}/all`)
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

  const handleStatusChange = async (questionId: string, newStatus: string) => {
    try {
      const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/manage/${questionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        fetchQuestions()
      } else {
        alert('Failed to update status')
      }
    } catch (error) {
      alert('Error updating status')
    }
  }

  const handleEdit = (question: any) => {
    setEditingId(question.questionId)
    setEditForm({
      questionText: question.questionText,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      isMultipleCorrect: Array.isArray(question.correctAnswer),
      explanation: question.explanation,
      domain: question.domain
    })
  }

  const handleSaveEdit = async (questionId: string) => {
    try {
      const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/manage/${questionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      
      if (response.ok) {
        setEditingId(null)
        setEditForm({})
        fetchQuestions()
      } else {
        alert('Failed to update question')
      }
    } catch (error) {
      alert('Error updating question')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleDelete = async (questionId: string) => {
    if (questions.length <= 1) {
      alert('Cannot delete the last question. Each quiz must have at least 1 question.')
      return
    }

    if (!confirm('Are you sure you want to delete this question?')) {
      return
    }

    try {
      const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/manage/${questionId}`, {
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
        fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/manage/${q.questionId}/order`, {
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
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.questionId, e.target.value)}
                        className={`px-3 py-1 rounded-lg border-2 font-medium text-sm ${
                          q.status === 'active' 
                            ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700' 
                            : q.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700'
                            : 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      {editingId === q.questionId ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(q.questionId)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(q)}
                          >
                            Edit
                          </Button>
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
                        </>
                      )}
                    </div>
                  </div>
                  
                  {editingId === q.questionId ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Question Text</label>
                        <textarea
                          value={editForm.questionText}
                          onChange={(e) => setEditForm({...editForm, questionText: e.target.value})}
                          className="w-full px-4 py-2 border-2 rounded-lg"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Options 
                          <label className="ml-4 inline-flex items-center gap-2 text-sm font-normal">
                            <input
                              type="checkbox"
                              checked={editForm.isMultipleCorrect || false}
                              onChange={(e) => setEditForm({
                                ...editForm, 
                                isMultipleCorrect: e.target.checked,
                                correctAnswer: e.target.checked ? [] : 0
                              })}
                              className="w-4 h-4"
                            />
                            Multiple correct
                          </label>
                        </label>
                        {editForm.options?.map((opt: string, i: number) => (
                          <div key={i} className="flex gap-2 mb-2">
                            <input
                              type={editForm.isMultipleCorrect ? "checkbox" : "radio"}
                              name="correctAnswer"
                              checked={
                                Array.isArray(editForm.correctAnswer) 
                                  ? editForm.correctAnswer.includes(i)
                                  : editForm.correctAnswer === i
                              }
                              onChange={() => {
                                if (editForm.isMultipleCorrect) {
                                  const current = Array.isArray(editForm.correctAnswer) ? editForm.correctAnswer : []
                                  const newCorrect = current.includes(i)
                                    ? current.filter((idx: number) => idx !== i)
                                    : [...current, i].sort()
                                  setEditForm({...editForm, correctAnswer: newCorrect})
                                } else {
                                  setEditForm({...editForm, correctAnswer: i})
                                }
                              }}
                              className="mt-1"
                            />
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOptions = [...editForm.options]
                                newOptions[i] = e.target.value
                                setEditForm({...editForm, options: newOptions})
                              }}
                              className="flex-1 px-4 py-2 border-2 rounded-lg"
                            />
                            {editForm.options.length > 2 && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const newOptions = editForm.options.filter((_: any, idx: number) => idx !== i)
                                  let newCorrect
                                  if (Array.isArray(editForm.correctAnswer)) {
                                    newCorrect = editForm.correctAnswer.filter((idx: number) => idx !== i).map((idx: number) => idx > i ? idx - 1 : idx)
                                  } else {
                                    newCorrect = editForm.correctAnswer === i ? 0 : editForm.correctAnswer > i ? editForm.correctAnswer - 1 : editForm.correctAnswer
                                  }
                                  setEditForm({...editForm, options: newOptions, correctAnswer: newCorrect})
                                }}
                                className="text-red-600"
                              >
                                ✕
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditForm({...editForm, options: [...editForm.options, '']})
                          }}
                          className="mt-2"
                        >
                          + Add Option
                        </Button>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Domain</label>
                        <select
                          value={editForm.domain}
                          onChange={(e) => setEditForm({...editForm, domain: e.target.value})}
                          className="w-full px-4 py-2 border-2 rounded-lg"
                        >
                          {selectedCert?.domains.map((domain: string) => (
                            <option key={domain} value={domain}>{domain}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Explanation</label>
                        <textarea
                          value={editForm.explanation}
                          onChange={(e) => setEditForm({...editForm, explanation: e.target.value})}
                          className="w-full px-4 py-2 border-2 rounded-lg"
                          rows={3}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-slate-900 dark:text-white font-medium mb-3">
                        {q.questionText}
                        {Array.isArray(q.correctAnswer) && (
                          <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">(Multiple answers)</span>
                        )}
                      </p>
                      <div className="space-y-2 mb-3">
                        {q.options?.map((opt: string, i: number) => {
                          const isCorrect = Array.isArray(q.correctAnswer) 
                            ? q.correctAnswer.includes(i)
                            : i === q.correctAnswer
                          return (
                            <div key={i} className={`px-3 py-2 rounded ${isCorrect ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500' : 'bg-slate-100 dark:bg-slate-800'}`}>
                              <span className="font-semibold">{String.fromCharCode(65 + i)}.</span> {opt}
                              {isCorrect && <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">✓ Correct</span>}
                            </div>
                          )
                        })}
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
                    </>
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

export default ViewQuestions
