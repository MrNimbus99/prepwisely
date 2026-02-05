import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, RefreshCw, CheckCircle, Calendar, Bell } from 'lucide-react'

const ArticleQuestionUpdates: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: 'Question Updates & Content Refresh Schedule | NestedCerts',
    description: 'Learn how often we update AWS certification practice questions. Discover our content refresh schedule, quality assurance process, and how we keep questions aligned with current exams.',
    keywords: 'question updates, content refresh, practice test updates, exam alignment, quality assurance',
    canonical: 'https://nestedcerts.com/article-updates'
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button onClick={() => onNavigate('landing')} className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">NestedCerts</button>
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
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">How often are questions updated?</h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-8">
          <span>980 views</span><span>•</span><span>3 min read</span>
        </div>

        <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <RefreshCw className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Continuous Updates</h2>
                  <p className="text-slate-800 dark:text-slate-100 text-lg">
                    Our question bank is continuously updated to reflect the latest AWS exam blueprints, new services, and best practices.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Update Schedule</h2>
            
            <div className="space-y-4 mb-8">
              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Monthly Reviews</h3>
                    <p className="text-slate-800 dark:text-slate-100">Every month, our content team reviews all questions for accuracy and relevance. Outdated questions are updated or replaced.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <Bell className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AWS Announcement Updates</h3>
                    <p className="text-slate-800 dark:text-slate-100">When AWS announces major service updates or exam blueprint changes, we update relevant questions within 2-4 weeks.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">User Feedback Integration</h3>
                    <p className="text-slate-800 dark:text-slate-100">We review user-reported issues weekly and make corrections immediately when errors are found.</p>
                  </div>
                </div>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">What Gets Updated?</h2>
            <ul className="space-y-3 mb-8 text-slate-800 dark:text-slate-100">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Service Updates:</strong> Questions about AWS services are updated when features change or new services launch</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Exam Blueprint Changes:</strong> When AWS updates exam objectives, we align our questions accordingly</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Best Practices:</strong> Questions reflect current AWS Well-Architected Framework recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Pricing Changes:</strong> Cost-related questions are updated when AWS pricing models change</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Deprecated Services:</strong> Questions about retired services are removed or updated</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">How You'll Know</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-4 leading-relaxed">
              When significant updates are made to a certification's question bank, we'll notify you via:
            </p>
            <ul className="space-y-2 mb-8 text-slate-800 dark:text-slate-100 list-disc list-inside">
              <li>Email notification (if you have notifications enabled)</li>
              <li>Dashboard announcement banner</li>
              <li>Update log in the Help Center</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Quality Assurance</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
              Every question goes through a rigorous review process:
            </p>
            <ol className="space-y-2 mb-8 text-slate-800 dark:text-slate-100 list-decimal list-inside">
              <li>Written by AWS-certified professionals</li>
              <li>Reviewed by subject matter experts</li>
              <li>Tested for clarity and accuracy</li>
              <li>Validated against official AWS documentation</li>
              <li>Continuously monitored for user feedback</li>
            </ol>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Found an Issue?</h3>
              <p className="text-slate-800 dark:text-slate-100 mb-4">
                If you spot an error or outdated information in any question, please report it! Use the "Report Question" button during your exam, or contact our support team.
              </p>
              <Button onClick={() => onNavigate('contact-support')} className="bg-gradient-to-r from-green-500 to-emerald-600">
                Report an Issue
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => onNavigate('certifications')} className="flex-1">Browse Certifications</Button>
          <Button variant="outline" onClick={() => onNavigate('help')} className="flex-1">Back to Help Center</Button>
        </div>
      </div>
    </div>
  )
}

export default ArticleQuestionUpdates
