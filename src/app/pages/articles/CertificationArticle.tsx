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
  domainTasks?: { domain: string; tasks: string[] }[]
}

const CertificationArticle: React.FC<CertificationArticleProps> = ({
  onNavigate,
  certId,
  certName,
  certCode,
  level,
  quizCount,
  questionsPerQuiz,
  domains,
  domainTasks
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

          <div className="space-y-8">
            {/* What You'll Get */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What You'll Get</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">600 Practice Questions</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">15 single-answer + 5 multiple-choice per quiz</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Detailed Explanations</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Learn why each answer is right or wrong</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Real Exam Scenarios</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Questions mirror actual AWS exam style</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Progress Tracking</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Monitor your improvement over time</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Exam Domains */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Exam Domains Covered</h2>
              <div className="grid gap-3">
                {domains.map((domain, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-900 dark:text-white font-medium">{domain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Tasks */}
            {domainTasks && domainTasks.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What You'll Learn by Domain</h2>
                <div className="space-y-4">
                  {domainTasks.map((dt, idx) => (
                    <Card key={idx} className="p-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{dt.domain}</h3>
                      <ul className="space-y-2">
                        {dt.tasks.map((task, taskIdx) => (
                          <li key={taskIdx} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* How It Works */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How the 30-Day Path Works</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Phase 1</div>
                  <div className="font-semibold text-slate-900 dark:text-white mb-2">Domain Mastery</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Quizzes 1-19 focus on specific exam domains and tasks</div>
                </Card>
                <Card className="p-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                  <div className="text-3xl font-bold text-green-600 mb-2">Phase 2</div>
                  <div className="font-semibold text-slate-900 dark:text-white mb-2">Service Deep-Dive</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Quizzes 20-28 group by AWS service categories</div>
                </Card>
                <Card className="p-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Phase 3</div>
                  <div className="font-semibold text-slate-900 dark:text-white mb-2">Final Review</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Quizzes 29-30 mix all domains for exam simulation</div>
                </Card>
              </div>
            </div>

            {/* Study Tips */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Study Tips for Success</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Take one quiz daily</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Consistent practice builds retention</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Read all explanations</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Even for questions you got right</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Review weak areas</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Retake quizzes where you scored below 75%</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Practice Exams */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Full-Length Practice Exams</h2>
              <p className="text-slate-700 dark:text-slate-200 mb-4">
                After completing all 30 quizzes, test your readiness with our 2 full-length practice exams. These exams are designed to closely mirror the actual {certCode} exam experience.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-2">Practice Exam 1</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Realistic exam simulation with the same number of questions, time limit, and difficulty as the real exam</div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-2">Practice Exam 2</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Additional full-length exam to validate your preparation and identify any remaining gaps</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-lg border border-green-200 dark:border-green-800">
                <div className="font-semibold text-slate-900 dark:text-white mb-2">Exam-Like Experience</div>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Same question format and difficulty as the real exam</li>
                  <li>• Timed environment to practice time management</li>
                  <li>• Detailed explanations for every question</li>
                  <li>• Score breakdown by domain to identify weak areas</li>
                </ul>
              </div>
            </Card>
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
