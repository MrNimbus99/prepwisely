import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { NestedCertsLogo } from '../components/NestedCertsLogo'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, Flag, CheckCircle, Trash2 } from 'lucide-react'

const ArticleFlaggedQuestions: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: 'How to Use Flagged Questions - Study Smarter | NestedCerts',
    description: 'Learn how to use the flagged questions feature to mark challenging questions for review and improve your AWS certification exam preparation.',
    keywords: 'flagged questions, study tips, review questions, exam preparation, AWS certification',
    canonical: 'https://nestedcerts.com/article-flagged'
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button onClick={() => onNavigate('landing')} className="flex items-center space-x-2">
              <NestedCertsLogo className="w-10 h-10 sm:w-12 sm:h-12" />
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NestedCerts
              </span>
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => onNavigate('certifications')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Certifications
              </button>
              <button onClick={() => onNavigate('pricing')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Pricing
              </button>
              <button onClick={() => onNavigate('help')} className="text-blue-600 font-medium">
                Help
              </button>
            </div>

            <Button variant="outline" onClick={() => onNavigate('help')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 mb-4">Study Features</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          How to Use Flagged Questions
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-8">
          <span>New Feature</span>
          <span>•</span>
          <span>3 min read</span>
        </div>

        <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What are Flagged Questions?</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
              Flagged Questions is a powerful study tool that lets you mark questions you find challenging or want to review later. Instead of trying to remember which questions gave you trouble, you can flag them with a single click and access them all in one place.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">How to Flag a Question</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Flag className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">During a Quiz</h3>
                  <p className="text-slate-800 dark:text-slate-100">While taking any practice quiz, you'll see a flag icon next to each question. Click it to mark the question for later review. The flag will turn yellow when active.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Automatic Saving</h3>
                  <p className="text-slate-800 dark:text-slate-100">Your flagged questions are automatically saved to your account. You can access them anytime, even after closing the quiz.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Accessing Your Flagged Questions</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-4 leading-relaxed">
              To view all your flagged questions for a certification:
            </p>
            <ol className="space-y-3 mb-8 list-decimal list-inside">
              <li className="text-slate-800 dark:text-slate-100">Go to your certification page from the dashboard</li>
              <li className="text-slate-800 dark:text-slate-100">Click on the "Flagged Questions" tab (next to "Practice Quizzes")</li>
              <li className="text-slate-800 dark:text-slate-100">See all your flagged questions organized by quiz and date</li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Managing Flagged Questions</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-800 dark:text-slate-100"><strong>Remove a flag:</strong> Click the X button next to any flagged question to remove it from your list.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Flag className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-800 dark:text-slate-100"><strong>Toggle flags:</strong> Click the flag icon again during a quiz to unflag a question.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Best Practices</h2>
            <div className="grid gap-4 mb-8">
              <Card className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4">
                <p className="text-slate-800 dark:text-slate-100">
                  <strong>Flag questions you get wrong</strong> - Even if you understand the explanation, flag it to review later and ensure you remember it.
                </p>
              </Card>
              <Card className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-4">
                <p className="text-slate-800 dark:text-slate-100">
                  <strong>Flag confusing questions</strong> - If a question's wording is tricky or the concept is unclear, flag it for deeper study.
                </p>
              </Card>
              <Card className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-4">
                <p className="text-slate-800 dark:text-slate-100">
                  <strong>Review before exams</strong> - Go through all your flagged questions before taking the final practice exams to reinforce weak areas.
                </p>
              </Card>
              <Card className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4">
                <p className="text-slate-800 dark:text-slate-100">
                  <strong>Clean up regularly</strong> - Remove flags once you've mastered a topic to keep your list focused on current challenges.
                </p>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg mt-8">
              <div className="flex items-start gap-3">
                <Flag className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" fill="currentColor" />
                <div>
                  <p className="text-slate-900 dark:text-white font-bold mb-2">Pro Study Strategy</p>
                  <p className="text-slate-800 dark:text-slate-100">
                    Flag 5-10 questions per quiz session. At the end of each week, dedicate 30 minutes to reviewing all your flagged questions. This spaced repetition technique significantly improves retention and exam performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => onNavigate('certifications')} className="flex-1">
            Start Practicing
          </Button>
          <Button variant="outline" onClick={() => onNavigate('help')} className="flex-1">
            Back to Help Center
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ArticleFlaggedQuestions
