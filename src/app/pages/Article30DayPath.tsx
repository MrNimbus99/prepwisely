import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { NestedCertsLogo } from '../components/NestedCertsLogo'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, Calendar, CheckCircle, Trophy } from 'lucide-react'

const Article30DayPath: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: '30-Day AWS Certification Study Path - Structured Learning Plan | NestedCerts',
    description: 'Follow our proven 30-day study path to pass your AWS certification exam. Get a structured daily schedule with practice tests, study materials, and progress tracking.',
    keywords: '30-day study plan, AWS certification path, structured learning, daily schedule, exam preparation',
    canonical: 'https://nestedcerts.com/article-30day'
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
              <button onClick={() => onNavigate('landing')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Home
              </button>
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
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">Getting Started</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          How does the 30-day learning path work?
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-8">
          <span>2.1k views</span>
          <span>•</span>
          <span>5 min read</span>
        </div>

        <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is the 30-Day Learning Path?</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
              The 30-Day Learning Path is a structured study program designed to help you systematically prepare for your AWS certification exam. Each day, you'll complete a focused 20-question practice quiz that covers specific domains and topics from the exam blueprint.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">How It Works</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Choose Your Certification</h3>
                  <p className="text-slate-800 dark:text-slate-100">Select the AWS certification you want to prepare for. Each certification has its own customized 30-day path.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Daily Practice Quizzes</h3>
                  <p className="text-slate-800 dark:text-slate-100">Complete one 20-question quiz each day. Each quiz focuses on specific exam domains to ensure comprehensive coverage.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Review & Learn</h3>
                  <p className="text-slate-800 dark:text-slate-100">After each quiz, review detailed explanations for every question. Learn from your mistakes and reinforce correct answers.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Track Progress</h3>
                  <p className="text-slate-800 dark:text-slate-100">Monitor your daily completion, scores, and overall progress. See which domains you've mastered and which need more focus.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Flag Questions for Review</h3>
                  <p className="text-slate-800 dark:text-slate-100">Mark challenging questions with the flag button to review later. Access all your flagged questions in the "Flagged Questions" tab.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">6</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Take Full Practice Exams</h3>
                  <p className="text-slate-800 dark:text-slate-100">After completing the 30-day path, take full-length 65-question practice exams to simulate the real exam experience.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Flagged Questions Feature</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-4 leading-relaxed">
              While studying, you can flag any question that you find challenging or want to review later. Simply click the flag icon next to the question text. All your flagged questions are saved and can be accessed from the "Flagged Questions" tab on your certification page.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-8">
              <p className="text-slate-800 dark:text-slate-100">
                <strong>💡 Study Tip:</strong> Flag questions you get wrong or find confusing. Review your flagged questions before taking the final practice exams to reinforce weak areas.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Key Benefits</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100">Structured daily learning routine</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100">Complete exam domain coverage</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100">Manageable daily time commitment</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100">Progressive difficulty increase</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100">Detailed performance analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100">Build study momentum & habits</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Tips for Success</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100"><strong>Stay consistent:</strong> Complete your daily quiz at the same time each day to build a habit.</span>
              </li>
              <li className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100"><strong>Don't skip days:</strong> Consistency is key to retention and building momentum.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-100"><strong>Review explanations:</strong> Always read the explanations, even for questions you got right.</span>
              </li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 rounded-r-lg mt-8">
              <p className="text-slate-800 dark:text-slate-100 font-medium">
                💡 <strong>Pro Tip:</strong> Most students who complete the full 30-day path score 85%+ on their actual AWS certification exam!
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => onNavigate('certifications')} className="flex-1">
            Start Your 30-Day Path
          </Button>
          <Button variant="outline" onClick={() => onNavigate('help')} className="flex-1">
            Back to Help Center
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Article30DayPath
