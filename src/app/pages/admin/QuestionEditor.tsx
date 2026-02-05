import React, { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { CERTIFICATIONS, QUIZ_TYPES } from '../../data/certifications'

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
        <Button size="lg" onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600">
          Save Question
        </Button>
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
          {options.map((option, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <input
                type="radio"
                name="correct"
                checked={correctAnswer === idx}
                onChange={() => setCorrectAnswer(idx)}
                className="w-5 h-5 text-blue-600"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options]
                  newOptions[idx] = e.target.value
                  setOptions(newOptions)
                }}
                placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              {options.length > 2 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newOptions = options.filter((_, i) => i !== idx)
                    setOptions(newOptions)
                    if (correctAnswer === idx) {
                      setCorrectAnswer(0)
                    } else if (correctAnswer > idx) {
                      setCorrectAnswer(correctAnswer - 1)
                    }
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
            onClick={() => setOptions([...options, ''])}
            className="mt-2"
          >
            + Add Option
          </Button>
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

export default QuestionEditor
