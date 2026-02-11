import React, { useState } from 'react'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Upload, Download, FileJson, AlertCircle, CheckCircle } from 'lucide-react'

const API_BASE = 'https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod'

const BulkImportPage: React.FC = () => {
  const [certId, setCertId] = useState('')
  const [quizId, setQuizId] = useState('')
  const [importing, setImporting] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleExport = async () => {
    if (!certId || !quizId) {
      setMessage({ type: 'error', text: 'Please enter both Cert ID and Quiz ID' })
      return
    }

    setExporting(true)
    setMessage(null)

    try {
      const response = await fetch(`${API_BASE}/questions/${certId}/${quizId}`)
      const questions = await response.json()

      const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${certId}-${quizId}-questions.json`
      a.click()
      URL.revokeObjectURL(url)

      setMessage({ type: 'success', text: `Exported ${questions.length} questions` })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export questions' })
    } finally {
      setExporting(false)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!certId || !quizId) {
      setMessage({ type: 'error', text: 'Please select both Certification and Quiz first' })
      return
    }

    // Confirm replacement
    const confirmed = window.confirm(
      `⚠️ WARNING: This will DELETE all existing questions in ${certId} - Quiz ${quizId} and replace them with the imported questions.\n\nAre you sure you want to continue?`
    )
    
    if (!confirmed) {
      event.target.value = '' // Reset file input
      return
    }

    setImporting(true)
    setMessage(null)

    try {
      const text = await file.text()
      const questions = JSON.parse(text)

      if (!Array.isArray(questions)) {
        throw new Error('Invalid format: must be an array of questions')
      }

      // Step 1: Delete all existing questions
      setMessage({ type: 'success', text: 'Deleting existing questions...' })
      try {
        const existingResponse = await fetch(`${API_BASE}/questions/${certId}/${quizId}`)
        const existingQuestions = await existingResponse.json()
        
        for (const q of existingQuestions) {
          await fetch(`${API_BASE}/questions/${certId}/${quizId}/${q.id}`, {
            method: 'DELETE'
          })
        }
      } catch (err) {
        console.log('No existing questions to delete or delete failed')
      }

      // Step 2: Import new questions
      setMessage({ type: 'success', text: 'Importing new questions...' })
      let successCount = 0
      for (const question of questions) {
        try {
          const response = await fetch(`${API_BASE}/questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              certId,
              quizId,
              ...question
            })
          })
          if (response.ok) successCount++
        } catch (err) {
          console.error('Failed to import question:', err)
        }
      }

      setMessage({ type: 'success', text: `✅ Successfully replaced all questions! Imported ${successCount}/${questions.length} questions` })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to import questions. Check JSON format.' })
    } finally {
      setImporting(false)
      event.target.value = '' // Reset file input
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bulk Import/Export</h2>
        <p className="text-lg text-slate-700 dark:text-slate-300">Import or export questions in JSON format</p>
      </div>

      {message && (
        <Card className={`p-4 ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
          <div className="flex items-center gap-3">
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <p className={message.type === 'success' ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}>
              {message.text}
            </p>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-white dark:bg-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quiz Selection</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Certification
            </label>
            <select
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="">Select certification...</option>
              <option value="CLF-C02">Cloud Practitioner (CLF-C02)</option>
              <option value="AIF-C01">AI Practitioner (AIF-C01)</option>
              <option value="SAA-C03">Solutions Architect Associate (SAA-C03)</option>
              <option value="DVA-C02">Developer Associate (DVA-C02)</option>
              <option value="SOA-C03">CloudOps Engineer Associate (SOA-C03)</option>
              <option value="DEA-C01">Data Engineer Associate (DEA-C01)</option>
              <option value="MLA-C01">ML Engineer Associate (MLA-C01)</option>
              <option value="SAP-C02">Solutions Architect Professional (SAP-C02)</option>
              <option value="DOP-C02">DevOps Engineer Professional (DOP-C02)</option>
              <option value="AIP-C01">GenAI Developer Professional (AIP-C01)</option>
              <option value="ANS-C01">Advanced Networking Specialty (ANS-C01)</option>
              <option value="SCS-C03">Security Specialty (SCS-C03)</option>
              <option value="MLS-C01">ML Specialty (MLS-C01)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Quiz
            </label>
            <select
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="">Select quiz...</option>
              <optgroup label="Practice Quizzes">
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Quiz {i + 1}</option>
                ))}
              </optgroup>
              <optgroup label="Final Exams">
                <option value="exam-1">Final Exam 1</option>
                <option value="exam-2">Final Exam 2</option>
              </optgroup>
            </select>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-blue-300 dark:border-blue-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Export Questions</h3>
              <p className="text-sm text-slate-900 dark:text-slate-100">Download as JSON file</p>
            </div>
          </div>
          <Button
            onClick={handleExport}
            disabled={exporting || !certId || !quizId}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {exporting ? 'Exporting...' : 'Export to JSON'}
          </Button>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-green-300 dark:border-green-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Import Questions</h3>
              <p className="text-sm text-slate-900 dark:text-slate-100">Upload JSON file</p>
            </div>
          </div>
          <label className="block">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={importing || !certId || !quizId}
              className="hidden"
              id="file-upload"
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={importing || !certId || !quizId}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {importing ? 'Importing...' : 'Import from JSON'}
            </Button>
          </label>
        </Card>
      </div>

      <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-3 mb-4">
          <FileJson className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">JSON Format</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
              Questions should be an array of objects with this structure:
            </p>
          </div>
        </div>
        <pre className="bg-slate-900 dark:bg-slate-950 text-green-400 p-4 rounded-lg overflow-x-auto text-xs">
{`[
  {
    "id": "unique-id",
    "question": "Question text here?",
    "options": [
      { "id": "A", "text": "Option A" },
      { "id": "B", "text": "Option B" },
      { "id": "C", "text": "Option C" },
      { "id": "D", "text": "Option D" }
    ],
    "correctAnswers": ["A"],
    "explanation": "Explanation here",
    "domain": "Domain name",
    "difficulty": "medium"
  }
]`}
        </pre>
      </Card>
    </div>
  )
}

export default BulkImportPage
