import React from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  CheckCircle, 
  Star, 
  Users, 
  Trophy, 
  ArrowRight, 
  Play,
  BarChart3,
  BookOpen,
  Clock,
  Target
} from 'lucide-react'

const LandingPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NestedCerts
              </span>
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
              <button 
                onClick={() => onNavigate('help')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Help
              </button>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <Button onClick={() => onNavigate('dashboard')} className="text-sm sm:text-base px-3 sm:px-4">
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('login')}
                    className="text-sm sm:text-base px-3 sm:px-4"
                  >
                    Sign In
                  </Button>
                  <Button onClick={() => onNavigate('register')} className="text-sm sm:text-base px-3 sm:px-4">
                    <span className="hidden sm:inline">Start Free</span>
                    <span className="sm:hidden">Start</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 sm:mb-6 text-xs sm:text-sm">
              🚀 Launch Deal - 50% OFF Everything
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 px-2">
              Master AWS Certifications with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Daily Practice
              </span>
            </h1>
            
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Join thousands of professionals who've passed their AWS exams with our 30-day structured learning paths, 
              daily 20-question practice tests, and comprehensive analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
              <Button size="lg" onClick={() => onNavigate('register')} className="text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('certifications')} className="text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3">
                View Certifications
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-green-500" />
                <span>95% pass rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 px-2">
              Everything you need to pass AWS exams
            </h2>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
              Our comprehensive platform provides structured learning paths, practice exams, and detailed analytics 
              to ensure your success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>30-Day Learning Paths</CardTitle>
                <CardDescription>
                  Structured daily practice with 20 questions per day, designed to build knowledge progressively.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Track your progress with detailed domain breakdowns, weak area identification, and performance trends.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Study Tools</CardTitle>
                <CardDescription>
                  Bookmarks, review queue, flagged questions, and spaced repetition to maximize retention.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Exam-Like Experience</CardTitle>
                <CardDescription>
                  Practice with real AWS exam format, timing, and difficulty to build confidence.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Detailed Explanations</CardTitle>
                <CardDescription>
                  Every question includes comprehensive explanations and links to official AWS documentation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>All Certifications</CardTitle>
                <CardDescription>
                  From Cloud Practitioner to Professional level - all AWS certifications in one platform.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Choose the plan that fits your certification journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Single Cert */}
            <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
              <CardHeader>
                <CardTitle>Single Certification</CardTitle>
                <CardDescription>Perfect for focused preparation</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$10</span>
                  <span className="text-slate-500 line-through ml-2">$20</span>
                  <Badge variant="success" className="ml-2">50% OFF</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    30 practice quizzes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    2 final exams
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Analytics & tracking
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => onNavigate('pricing')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Monthly - Popular */}
            <Card className="border-2 border-blue-500 relative hover:border-blue-600 transition-colors">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle>Monthly Subscription</CardTitle>
                <CardDescription>All 13 certifications</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$20</span>
                  <span className="text-slate-500">/month</span>
                  <Badge variant="success" className="ml-2">50% OFF</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    All 13 certifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cancel anytime
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    All study tools
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => onNavigate('pricing')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Lifetime */}
            <Card className="border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
              <CardHeader>
                <CardTitle>Lifetime Access</CardTitle>
                <CardDescription>One-time payment</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$100</span>
                  <span className="text-slate-500 line-through ml-2">$200</span>
                  <Badge variant="warning" className="ml-2">50% OFF</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    All 13 certifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Lifetime access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Future updates
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => onNavigate('pricing')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => onNavigate('pricing')}>
              View All Pricing Options
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to ace your AWS certification?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful candidates who've used NestedCerts to pass their exams.
          </p>
          <Button size="lg" variant="secondary" onClick={() => onNavigate('register')} className="text-lg px-8 py-3">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">NestedCerts</span>
              </div>
              <p className="text-sm">
                The most effective way to prepare for AWS certifications with daily practice and comprehensive analytics.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('certifications')} className="hover:text-white transition-colors">Certifications</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><span className="cursor-not-allowed opacity-50">Features</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('help')} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => onNavigate('contact-support')} className="hover:text-white transition-colors">Contact</button></li>
                <li><button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">FAQ</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button></li>
                <li><button onClick={() => onNavigate('refund-policy')} className="hover:text-white transition-colors">Refund Policy</button></li>
                <li><button onClick={() => onNavigate('cancellation-policy')} className="hover:text-white transition-colors">Cancellation Policy</button></li>
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

export default LandingPage
