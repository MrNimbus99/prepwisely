import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, CheckCircle, XCircle, TrendingUp, Target } from 'lucide-react'

const ArticleExamResults: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button onClick={() => onNavigate('landing')} className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NestedCerts
            </button>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => onNavigate('certifications')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Certifications</button>
              <button onClick={() => onNavigate('pricing')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Pricing</button>
              <button onClick={() => onNavigate('help')} className="text-blue-600 font-medium">Help</button>
            </div>
            <Button variant="outline" onClick={() => onNavigate('help')}><ArrowLeft className="w-4 h-4 mr-2" />Back to Help</Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-4">Practice Exams</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">How to interpret my exam results?</h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-8">
          <span>1.5k views</span><span>•</span><span>4 min read</span>
        </div>

        <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Understanding Your Score</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
              After completing a practice exam, you'll see your results page with detailed performance metrics. Here's how to interpret each section.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <Card className="bg-green-50 dark:bg-green-950/30 p-6 border-2 border-green-200 dark:border-green-700">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pass (82%+)</h3>
                </div>
                <p className="text-slate-800 dark:text-slate-100">Excellent! You're ready for the real exam. Scoring 82%+ on our practice exams indicates strong preparation.</p>
              </Card>

              <Card className="bg-yellow-50 dark:bg-yellow-950/30 p-6 border-2 border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Close (70-81%)</h3>
                </div>
                <p className="text-slate-800 dark:text-slate-100">Almost there! Review flagged questions and weak domains. You're close to being exam-ready.</p>
              </Card>

              <Card className="bg-orange-50 dark:bg-orange-950/30 p-6 border-2 border-orange-200 dark:border-orange-700">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Needs Work (50-69%)</h3>
                </div>
                <p className="text-slate-800 dark:text-slate-100">Keep studying! Focus on your weak areas and retake practice exams to improve your score.</p>
              </Card>

              <Card className="bg-red-50 dark:bg-red-950/30 p-6 border-2 border-red-200 dark:border-red-700">
                <div className="flex items-center gap-3 mb-3">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Not Ready (&lt;50%)</h3>
                </div>
                <p className="text-slate-800 dark:text-slate-100">More preparation needed. Review all exam domains thoroughly before attempting the real exam.</p>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Key Metrics Explained</h2>
            
            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Overall Score</h3>
                <p className="text-slate-800 dark:text-slate-100">Percentage of questions answered correctly. AWS exams typically require 70-75% to pass, but we recommend 82%+ on practice exams.</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Domain Breakdown</h3>
                <p className="text-slate-800 dark:text-slate-100">Shows your performance in each exam domain (e.g., Security, Networking, Compute). Identify weak areas to focus your study.</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Time Taken</h3>
                <p className="text-slate-800 dark:text-slate-100">How long you took to complete the exam. Practice managing your time to finish within the actual exam duration.</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Flagged Questions</h3>
                <p className="text-slate-800 dark:text-slate-100">Questions you marked for review. Always review these to understand why you were uncertain.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">What to Do Next</h2>
            <ol className="space-y-3 list-decimal list-inside text-slate-800 dark:text-slate-100 mb-8">
              <li className="leading-relaxed"><strong>Review all explanations</strong> - Read explanations for both correct and incorrect answers</li>
              <li className="leading-relaxed"><strong>Focus on weak domains</strong> - Spend extra time studying areas where you scored below 70%</li>
              <li className="leading-relaxed"><strong>Retake the exam</strong> - Practice makes perfect. Retake exams to reinforce learning</li>
              <li className="leading-relaxed"><strong>Track your progress</strong> - Monitor score improvements over time on your dashboard</li>
            </ol>

            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-slate-800 dark:text-slate-100 font-medium">
                💡 <strong>Pro Tip:</strong> Don't just memorize answers. Understand the "why" behind each correct answer to truly master the concepts.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => onNavigate('dashboard')} className="flex-1">View My Results</Button>
          <Button variant="outline" onClick={() => onNavigate('help')} className="flex-1">Back to Help Center</Button>
        </div>
      </div>
    </div>
  )
}

export default ArticleExamResults
