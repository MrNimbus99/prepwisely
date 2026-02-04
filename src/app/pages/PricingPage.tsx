import React from 'react'
import { NavigationProps } from '../types'
import { pricingPlans } from '../data/certifications'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Check, Star, Zap, Crown, Infinity } from 'lucide-react'

const PricingPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const getIcon = (planType: string) => {
    switch (planType) {
      case 'free': return <Zap className="w-6 h-6 text-green-500" />
      case 'individual': return <Star className="w-6 h-6 text-blue-500" />
      case 'bundle': return <Crown className="w-6 h-6 text-purple-500" />
      case 'lifetime': return <Infinity className="w-6 h-6 text-indigo-500" />
      case 'subscription': return <Zap className="w-6 h-6 text-orange-500" />
      default: return <Star className="w-6 h-6 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('landing')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                PrepWisely
              </button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => onNavigate('certifications')}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                Certifications
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Pricing
              </button>
              <button
                onClick={() => onNavigate('help')}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                Help
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
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
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Start with Cloud Practitioner for free. Pay only for what you need, when you need it.
          </p>
          <div className="flex items-center justify-center space-x-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full inline-flex">
            <Check className="w-5 h-5" />
            <span className="font-medium">Cloud Practitioner Always Free</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative p-6 ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    {plan.badge}
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {getIcon(plan.type)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    {plan.originalPrice && (
                      <div className="text-sm text-slate-500 dark:text-slate-400 line-through">
                        ${plan.originalPrice}{plan.type === 'subscription' ? '/mo' : ''}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      {plan.price === 0 ? 'FREE' : `$${plan.price}`}
                      {plan.type === 'subscription' && <span className="text-lg">/mo</span>}
                    </div>
                    {plan.type === 'subscription' && (
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        or $149/year (save $91)
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => onNavigate('register')}
                >
                  {plan.price === 0 ? 'Start Free' : 'Get Started'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Is Cloud Practitioner really free?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Yes! Cloud Practitioner is completely free with full access to the 30-day exam path, daily practice exams, and all study tools. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                What's the difference between individual and subscription?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Individual purchases ($49) give you lifetime access to one specific certification. Subscription ($20/month) gives you access to all certifications as long as you're subscribed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Can I upgrade later?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Absolutely! You can upgrade from individual to bundles or Everything Pass anytime. You'll only pay the difference.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                What's included in the Everything Pass?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Everything Pass ($299) includes all current and future AWS certifications with lifetime access. It's the best value for serious AWS professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('certifications')} className="hover:text-white">Certifications</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('help')} className="hover:text-white">Help Center</button></li>
                <li><button onClick={() => onNavigate('status')} className="hover:text-white">Status</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('terms')} className="hover:text-white">Terms</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-white">Privacy</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('accessibility')} className="hover:text-white">Accessibility</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 PrepWisely. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PricingPage
