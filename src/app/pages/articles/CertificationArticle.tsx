import React from 'react'
import { NavigationProps } from '../../types'
import { useSEO } from '../../hooks/useSEO'
import { Header } from '../../components/layout/Header'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { BookOpen, Clock, Target, CheckCircle } from 'lucide-react'

interface CertificationArticleProps extends NavigationProps {
  certId: string
  certName: string
  certCode: string
  level: string
  quizCount: number
  questionsPerQuiz: number
  domains: string[]
}

const CertificationArticle: React.FC<CertificationArticleProps> = ({
  onNavigate,
  certId,
  certName,
  certCode,
  level,
  quizCount,
  questionsPerQuiz,
  domains
}) => {
  useSEO({
    title: `${certName} (${certCode}) - 30-Day Learning Path | NestedCerts`,
    description: `Complete guide to preparing for ${certName} with ${quizCount} quizzes and ${quizCount * questionsPerQuiz} practice questions.`,
    keywords: `${certCode}, ${certName}, AWS certification, exam prep, practice questions`,
    canonical: `https://nestedcerts.com/articles/${certId}`
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Header onNavigate={onNavigate} />

      <article className="py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="mb-4">{level}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {certName}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Complete 30-Day Learning Path for {certCode}
            </p>
          </div>

          <Card className="mb-8 p-6 bg-white dark:bg-slate-900">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{quizCount}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Quizzes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{quizCount * questionsPerQuiz}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Questions</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">30 Days</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Learning Path</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>How the 30-Day Learning Path Works</h2>
            <p>
              Our structured learning path for the {certName} is designed to help you master all exam domains through {quizCount} carefully crafted quizzes, each containing {questionsPerQuiz} questions.
            </p>

            <h3>Quiz Structure</h3>
            <ul>
              <li><strong>{questionsPerQuiz} questions per quiz</strong> - 15 single-answer + 5 multiple-response questions</li>
              <li><strong>Domain-focused approach</strong> - Quizzes 1-19 focus on specific exam domains and tasks</li>
              <li><strong>Service-category quizzes</strong> - Quizzes 20-28 group questions by AWS service categories</li>
              <li><strong>Mixed reviews</strong> - Quizzes 29-30 provide comprehensive final reviews</li>
            </ul>

            <h3>Exam Domains Covered</h3>
            <div className="not-prose grid gap-3 my-6">
              {domains.map((domain, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-900 dark:text-white font-medium">{domain}</span>
                </div>
              ))}
            </div>

            <h3>Question Quality Standards</h3>
            <ul>
              <li><strong>Original content</strong> - All questions are uniquely written, not copied from dumps or other sources</li>
              <li><strong>Scenario-based</strong> - Real-world situations that mirror actual exam questions</li>
              <li><strong>Detailed explanations</strong> - Every answer includes comprehensive explanations of why it's correct and why other options are wrong</li>
              <li><strong>No duplicates</strong> - Each question has a unique ID and concept, tracked in our global ledger</li>
            </ul>

            <h3>Learning Phases</h3>
            
            <h4>Phase A: Task-Focused Learning (Quizzes 1-19)</h4>
            <p>
              Work through each exam domain systematically, with dedicated quizzes for specific tasks followed by domain review quizzes.
            </p>

            <h4>Phase B: Service-Category Mastery (Quizzes 20-28)</h4>
            <p>
              Focus on AWS services grouped by category (Machine Learning, Security, Analytics, Database, etc.) to reinforce service-specific knowledge.
            </p>

            <h4>Phase C: Final Mixed Reviews (Quizzes 29-30)</h4>
            <p>
              Comprehensive review quizzes that mix questions across all domains to simulate the actual exam experience.
            </p>

            <h3>Study Recommendations</h3>
            <ul>
              <li><strong>One quiz per day</strong> - Complete one quiz daily to finish the path in 30 days</li>
              <li><strong>Review explanations</strong> - Read all explanations, even for questions you answered correctly</li>
              <li><strong>Track your progress</strong> - Monitor your scores to identify weak areas</li>
              <li><strong>Revisit difficult topics</strong> - Return to quizzes where you scored below 70%</li>
              <li><strong>Take practice exams</strong> - Complete full-length practice exams after finishing all 30 quizzes</li>
            </ul>

            <h3>Ready to Start?</h3>
            <p>
              Begin your {certName} preparation journey today with our comprehensive 30-day learning path.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => onNavigate('certifications')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Start Learning
            </button>
            <button
              onClick={() => onNavigate('articles')}
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg transition-colors"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default CertificationArticle
