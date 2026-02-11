import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { 
  Search,
  BookOpen,
  MessageCircle,
  HelpCircle,
  FileText,
  CreditCard,
  Settings,
  Trophy,
  ChevronRight,
  ChevronDown,
  Mail
} from 'lucide-react'

const HelpPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const helpContent: Record<string, Record<string, string>> = {
    'getting-started': {
      'How to create your account': 'Visit nestedcerts.com and click "Sign Up". Enter your email, create a password, and verify your email. You\'ll get instant access to the free Cloud Practitioner certification to try our platform.',
      'Taking your first practice exam': 'Navigate to your certification page, select a quiz or exam, and click "Start". Answer questions at your own pace. You can flag questions for review and navigate between questions using the sidebar.',
      'Understanding your results': 'After completing an exam, you\'ll see your score, pass/fail status, and detailed breakdown by domain. Review explanations for each question to understand correct answers and learn from mistakes.',
      'Setting up your study schedule': 'Create a consistent study routine. We recommend 30-60 minutes daily. Use our 30-day learning paths for structured preparation. Track your progress in the dashboard to stay motivated.'
    },
    'exams': {
      'How daily exams work': 'Daily practice exams contain 20 questions covering all exam domains. They\'re perfect for consistent practice. Complete one daily to build knowledge gradually and track improvement over time.',
      'Question types and formats': 'Our exams include single-choice, multiple-choice, and scenario-based questions. All questions match AWS exam format with detailed explanations. Difficulty ranges from foundational to expert level.',
      'Reviewing your answers': 'After completing an exam, review each question with detailed explanations. See why answers are correct or incorrect. Use this to identify knowledge gaps and focus your study efforts.',
      'Flagging and bookmarking questions': 'Click the flag icon during exams to mark questions for later review. Access all flagged questions from your dashboard. Perfect for revisiting challenging topics before your real exam.'
    },
    'billing': {
      'Understanding our pricing plans': 'We offer individual certifications ($10 each), bundles ($25-$45), and subscriptions ($20/month, $70/year, $100 lifetime). Cloud Practitioner is always free. All prices in USD.',
      'How upgrade pricing works': 'Upgrade anytime from your Membership page. Pay only the difference between plans. Upgrades are instant. Downgrades take effect at the end of your billing period.',
      'Canceling your subscription': 'Go to Membership & Subscriptions, click "Manage Subscription", then cancel in the Stripe portal. Access continues until period ends. No refunds for partial periods.',
      'Requesting a refund': 'We offer 7-day refunds if you\'ve accessed less than 20% of content. Contact us via the contact form with your order details. Refunds processed within 7-10 business days.'
    },
    'account': {
      'Updating your profile': 'Go to Account Settings from the dashboard menu. Update your name, email, or other profile information. Changes save automatically. Email changes require verification.',
      'Changing your password': 'Visit Account Settings and click "Change Password". Enter your current password and new password. Use a strong password with at least 8 characters, including numbers and symbols.',
      'Email preferences': 'Manage email notifications in Account Settings. Choose which emails you receive: progress updates, new content alerts, or promotional offers. Unsubscribe anytime.',
      'Deleting your account': 'Contact us via the contact form to request account deletion. We\'ll permanently delete your data within 30 days. This action cannot be undone. Active subscriptions will be canceled.'
    }
  }

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: BookOpen,
      description: 'Learn the basics of using NestedCerts',
      articles: [
        'How to create your account',
        'Taking your first practice exam',
        'Understanding your results',
        'Setting up your study schedule'
      ]
    },
    {
      id: 'exams',
      name: 'Practice Exams',
      icon: FileText,
      description: 'Everything about our practice exam system',
      articles: [
        'How daily exams work',
        'Question types and formats',
        'Reviewing your answers',
        'Flagging and bookmarking questions'
      ]
    },
    {
      id: 'billing',
      name: 'Billing & Payments',
      icon: CreditCard,
      description: 'Subscription, payments, and refunds',
      articles: [
        'Understanding our pricing plans',
        'How upgrade pricing works',
        'Canceling your subscription',
        'Requesting a refund'
      ]
    },
    {
      id: 'account',
      name: 'Account Settings',
      icon: Settings,
      description: 'Managing your account and preferences',
      articles: [
        'Updating your profile',
        'Changing your password',
        'Email preferences',
        'Deleting your account'
      ]
    }
  ]

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: MessageCircle,
      action: () => onNavigate('contact-support'),
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
    },
    {
      title: 'FAQ',
      description: 'Find answers to frequently asked questions',
      icon: Trophy,
      action: () => onNavigate('faq'),
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
    },
    {
      title: 'Browse Articles',
      description: 'Read helpful guides and tips',
      icon: HelpCircle,
      action: () => onNavigate('articles'),
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    }
  ]

  useSEO({
    title: 'Help Center - AWS Certification Exam Prep Support | NestedCerts',
    description: 'Get help with NestedCerts AWS certification exam prep platform. Find answers to common questions, tutorials, guides, and contact our support team for assistance.',
    keywords: 'AWS certification help, exam prep support, AWS practice test help, study guide assistance, certification FAQ',
    canonical: 'https://nestedcerts.com/help'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Header onNavigate={onNavigate} />

      {/* Header */}
      <section className="py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Help Center
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 mb-8">
              Find answers to common questions and get the help you need
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-10 sm:mb-16">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={action.action}
                >
                  <CardHeader>
                    <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">{action.title}</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-200">{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Categories with Expandable Articles */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Browse by Category
            </h2>
            <div className="space-y-4">
              {categories.map((category) => {
                const Icon = category.icon
                const isExpanded = expandedCategory === category.id
                return (
                  <Card key={category.id} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
                    <CardHeader 
                      className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{category.name}</CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400">{category.description}</CardDescription>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent className="pt-0 pb-6">
                        <div className="space-y-3">
                          {category.articles.map((article, index) => {
                            const articleKey = `${category.id}-${article}`
                            const isArticleExpanded = expandedArticle === articleKey
                            return (
                              <div key={index} className="border-l-2 border-blue-500 pl-4">
                                <button
                                  onClick={() => setExpandedArticle(isArticleExpanded ? null : articleKey)}
                                  className="w-full text-left flex items-center justify-between gap-2 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                                >
                                  <span className="font-medium">{article}</span>
                                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isArticleExpanded ? 'rotate-90' : ''}`} />
                                </button>
                                {isArticleExpanded && (
                                  <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {helpContent[category.id][article]}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-br from-blue-500 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still need help?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group bg-white dark:bg-slate-800 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email Support</CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-300 text-base">
                  Get detailed help via email<br />
                  Response within 24 hours
                </CardDescription>
                <Button onClick={() => onNavigate('contact-support')} className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg text-base px-6 py-3">
                  Contact Support
                </Button>
              </CardHeader>
            </Card>
            
            <Card className="group bg-white dark:bg-slate-800 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">Live Chat</CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-300 text-base">
                  Chat with our team in real-time<br />
                  Available 9 AM - 5 PM EST
                </CardDescription>
                <Button variant="outline" className="mt-4 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300" disabled>
                  Coming Soon
                </Button>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">NestedCerts</h3>
              <p className="text-sm">Master AWS certifications with comprehensive practice exams and study materials.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('certifications')} className="hover:text-white">Certifications</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('help')} className="hover:text-white">Help Center</button></li>
                <li><button onClick={() => onNavigate('faq')} className="hover:text-white">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('terms')} className="hover:text-white">Terms</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-white">Privacy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 NestedCerts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HelpPage
