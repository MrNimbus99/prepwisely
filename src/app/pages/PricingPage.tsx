import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  ArrowLeft, 
  CheckCircle, 
  Star,
  Trophy,
  Users,
  ArrowRight,
  Zap,
  Crown,
  Gift
} from 'lucide-react'

const PricingPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual')

  const plans = [
    {
      id: 'single',
      name: 'Single Certification',
      description: 'Perfect for focused preparation',
      price: 49,
      originalPrice: 89,
      discount: '45% OFF',
      badge: 'Launch Deal',
      badgeVariant: 'success' as const,
      icon: Trophy,
      features: [
        'Full 30-day exam path for 1 certification',
        'Daily 20-question practice exams',
        'Results & review with explanations',
        'Domain/pillar analytics',
        'Bookmarks + review queue',
        'Mobile-friendly interface'
      ],
      popular: false,
      type: 'one-time'
    },
    {
      id: 'owner-upgrade',
      name: 'Additional Certification',
      description: 'Add another cert to your collection',
      price: 29,
      originalPrice: 89,
      discount: '67% OFF',
      badge: 'Owner Price',
      badgeVariant: 'secondary' as const,
      icon: Star,
      features: [
        'Add another certification to existing access',
        'Full 30-day exam path',
        'All study tools included',
        'Special price for existing owners',
        'Instant access'
      ],
      popular: false,
      type: 'one-time',
      note: 'Only available to existing customers'
    },
    {
      id: 'associates',
      name: 'All Associates Bundle',
      description: 'SAA, SOA, DVA certifications',
      price: 149,
      originalPrice: 299,
      discount: '50% OFF',
      badge: 'Best Value',
      badgeVariant: 'default' as const,
      icon: Users,
      features: [
        'Access to ALL Associate certifications',
        'All 30-day paths + cross-cert tracking',
        'Advanced analytics + weak-area drills',
        'Priority content updates',
        'Priority support',
        'Lifetime access'
      ],
      popular: true,
      type: 'one-time'
    },
    {
      id: 'everything',
      name: 'Everything Pass',
      description: 'All current & future certifications',
      price: 299,
      originalPrice: 599,
      discount: '50% OFF',
      badge: 'Founders Deal',
      badgeVariant: 'warning' as const,
      icon: Crown,
      features: [
        'Everything included (current + future certs)',
        'All Associate, Professional & Specialty certs',
        'All analytics & study tools',
        'Best long-term value',
        'Lifetime access to all content',
        'VIP support'
      ],
      popular: false,
      type: 'one-time'
    },
    {
      id: 'subscription',
      name: 'All-Access Subscription',
      description: 'Flexible monthly or annual billing',
      price: billingPeriod === 'monthly' ? 19 : 149,
      originalPrice: billingPeriod === 'monthly' ? 39 : 299,
      discount: billingPeriod === 'monthly' ? '51% OFF' : '50% OFF',
      badge: 'Flexible',
      badgeVariant: 'secondary' as const,
      icon: Zap,
      features: [
        'Access to all certifications',
        'Cancel anytime',
        'All study tools & analytics',
        'Priority support',
        billingPeriod === 'annual' ? 'Save 2 months (annual = 10 months price)' : 'Flexible monthly billing',
        'Perfect for trial period'
      ],
      popular: false,
      type: 'subscription'
    }
  ]

  const faqs = [
    {
      question: 'How does the upgrade pricing work?',
      answer: 'Our "pay only the difference" system means you get credit for what you\'ve already paid. For example, if you bought a Single Certification ($49) and want to upgrade to All Associates ($149), you only pay $100 more.'
    },
    {
      question: 'What happens if I cancel my subscription?',
      answer: 'You can cancel anytime and keep access until the end of your billing period. No refunds for partial months, but you won\'t be charged again.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes! We offer a 30-day money-back guarantee on all purchases. If you\'re not satisfied, contact support for a full refund.'
    },
    {
      question: 'How often are questions updated?',
      answer: 'We continuously update our question bank based on the latest AWS exam guides and user feedback. Premium plans get priority access to new content.'
    },
    {
      question: 'Can I switch between plans?',
      answer: 'Yes! You can upgrade anytime with credit for what you\'ve paid. Downgrades aren\'t available, but you keep access to what you\'ve purchased.'
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
              <span className="text-blue-600 font-medium">Pricing</span>
              <button 
                onClick={() => onNavigate('help')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Help
              </button>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Gift className="w-4 h-4 mr-2" />
              Launch Special - Up to 67% OFF
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Choose the plan that fits your certification journey. All plans include our 30-day money-back guarantee.
            </p>

            {/* Billing Toggle for Subscription */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingPeriod === 'annual' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${billingPeriod === 'annual' ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`}>
                Annual
              </span>
              {billingPeriod === 'annual' && (
                <Badge variant="success" className="ml-2">Save 2 months</Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <Card 
                  key={plan.id} 
                  className={`relative hover:shadow-xl transition-all duration-300 ${
                    plan.popular 
                      ? 'border-2 border-blue-500 shadow-lg scale-105' 
                      : 'border-0 shadow-md hover:scale-105'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        {plan.type === 'subscription' && billingPeriod === 'monthly' && (
                          <span className="text-slate-500">/month</span>
                        )}
                        {plan.type === 'subscription' && billingPeriod === 'annual' && (
                          <span className="text-slate-500">/year</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-slate-500 line-through text-sm">${plan.originalPrice}</span>
                        <Badge variant={plan.badgeVariant} className="text-xs">
                          {plan.badge}
                        </Badge>
                      </div>
                      
                      {plan.note && (
                        <p className="text-xs text-slate-500 mt-2">{plan.note}</p>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => onNavigate('checkout')}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upgrade Pricing Info */}
      <section className="py-16 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Upgrade Anytime - Pay Only the Difference
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Our unique upgrade system gives you credit for what you've already paid. 
            Start small and upgrade as your certification goals grow.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Single → Associates</CardTitle>
                <CardDescription>
                  Paid $49, upgrade to $149<br />
                  <span className="text-green-600 font-medium">Pay only $100 more</span>
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Associates → Everything</CardTitle>
                <CardDescription>
                  Paid $149, upgrade to $299<br />
                  <span className="text-green-600 font-medium">Pay only $150 more</span>
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Add Single Cert</CardTitle>
                <CardDescription>
                  Already own one certification?<br />
                  <span className="text-green-600 font-medium">Add another for just $29</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {faq.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your AWS certification journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've passed their AWS exams with PrepWisely.
          </p>
          <Button size="lg" variant="secondary" onClick={() => onNavigate('register')}>
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default PricingPage
