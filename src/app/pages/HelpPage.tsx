import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  ArrowLeft, 
  Search,
  BookOpen,
  MessageCircle,
  HelpCircle,
  FileText,
  CreditCard,
  Settings,
  Trophy,
  ChevronRight,
  Mail,
  Phone
} from 'lucide-react'

const HelpPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: BookOpen,
      description: 'Learn the basics of using PrepWisely',
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

  const popularArticles = [
    {
      title: 'How does the 30-day learning path work?',
      category: 'Getting Started',
      views: '2.1k views'
    },
    {
      title: 'What is the upgrade pricing system?',
      category: 'Billing',
      views: '1.8k views'
    },
    {
      title: 'How to interpret my exam results?',
      category: 'Practice Exams',
      views: '1.5k views'
    },
    {
      title: 'Can I cancel my subscription anytime?',
      category: 'Billing',
      views: '1.2k views'
    },
    {
      title: 'How often are questions updated?',
      category: 'Practice Exams',
      views: '980 views'
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
      action: () => onNavigate('status'),
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
    },
    {
      title: 'Feature Requests',
      description: 'Suggest new features or improvements',
      icon: HelpCircle,
      action: () => onNavigate('contact-support'),
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('landing')}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PrepWisely
                </span>
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => onNavigate('certifications')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Certifications
              </button>
              <button 
                onClick={() => onNavigate('pricing')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Pricing
              </button>
              <span className="text-blue-600 font-medium">Help</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('login')}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button onClick={() => onNavigate('register')}>
                Start Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Help Center
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
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
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card 
                  key={index} 
                  className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={action.action}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Popular Articles */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Popular Articles
            </h2>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <Badge variant="outline">{article.category}</Badge>
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </CardHeader>
                </Card>
              ))}
            </div>
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
                  <Card key={category.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.articles.map((article, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                            <ChevronRight className="w-4 h-4" />
                            {article}
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
      <section className="py-16 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Still need help?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>
                  Get detailed help via email<br />
                  Response within 24 hours
                </CardDescription>
                <Button onClick={() => onNavigate('contact-support')} className="mt-4">
                  Contact Support
                </Button>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>
                  Chat with our team in real-time<br />
                  Available 9 AM - 5 PM EST
                </CardDescription>
                <Button variant="outline" className="mt-4" disabled>
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
