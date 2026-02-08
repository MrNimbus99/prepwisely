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
  Mail
} from 'lucide-react'

const HelpPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')

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
      title: 'System Status',
      description: 'Check if all systems are operational',
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

          {/* Categories */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Card key={category.id} className="group bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{category.name}</CardTitle>
                          <CardDescription className="text-slate-700 dark:text-slate-100">{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.articles.map((article, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors group/item">
                            <ChevronRight className="w-4 h-4 group-hover/item:translate-x-1 transition-transform" />
                            <span className="font-medium">{article}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
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
    </div>
  )
}

export default HelpPage
