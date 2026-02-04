import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ChevronDown, ChevronUp, MessageCircle, BookOpen, CreditCard, Shield } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
  category: string
}

const FAQPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQ[] = [
    {
      category: 'Getting Started',
      question: 'Is Cloud Practitioner really free?',
      answer: 'Yes! AWS Certified Cloud Practitioner is completely free with full access to the 30-day exam path, daily practice exams, and all study tools. No credit card required to get started.'
    },
    {
      category: 'Getting Started',
      question: 'How does the 30-day exam path work?',
      answer: 'Each certification has a structured 30-day learning path with daily practice exams. You\'ll get 20 questions per day covering all exam domains, with detailed explanations and progress tracking.'
    },
    {
      category: 'Pricing',
      question: 'What\'s the difference between individual and subscription?',
      answer: 'Individual purchases ($49) give you lifetime access to one specific certification. Subscription ($20/month) gives you access to all certifications as long as you\'re subscribed. Choose based on your learning goals.'
    },
    {
      category: 'Pricing',
      question: 'Can I upgrade my plan later?',
      answer: 'Absolutely! You can upgrade from individual certifications to bundles or the Everything Pass anytime. You\'ll only pay the difference between what you\'ve paid and the new plan price.'
    },
    {
      category: 'Pricing',
      question: 'Do you offer refunds?',
      answer: 'Yes! We offer a 30-day money-back guarantee on all purchases. If you\'re not satisfied with PrepWisely, contact support for a full refund within 30 days of purchase.'
    },
    {
      category: 'Study Features',
      question: 'Can I bookmark questions for later review?',
      answer: 'Yes! You can bookmark any question during practice exams. All bookmarked questions are saved in your review queue for easy access and focused study sessions.'
    },
    {
      category: 'Study Features',
      question: 'How are questions organized?',
      answer: 'Questions are organized by exam domains and difficulty levels. You\'ll see a mix of easy, medium, and hard questions that mirror the actual AWS certification exams.'
    },
    {
      category: 'Study Features',
      question: 'Do you provide explanations for answers?',
      answer: 'Yes! Every question includes detailed explanations for both correct and incorrect answers, helping you understand the concepts and learn from mistakes.'
    },
    {
      category: 'Account',
      question: 'Can I use PrepWisely on multiple devices?',
      answer: 'Yes! Your account works on all devices - desktop, tablet, and mobile. Your progress syncs automatically across all devices.'
    },
    {
      category: 'Account',
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime from your account settings. You\'ll keep access until the end of your current billing period, and you won\'t be charged again.'
    },
    {
      category: 'Exams',
      question: 'Are these real AWS exam questions?',
      answer: 'Our questions are carefully crafted to match the style, difficulty, and topics of actual AWS certification exams. They\'re based on official AWS exam guides and best practices.'
    },
    {
      category: 'Exams',
      question: 'How many questions are in each practice exam?',
      answer: 'Daily practice exams contain 20 questions. You can also take full-length practice exams that match the actual exam format (65-75 questions depending on the certification).'
    }
  ]

  const categories = ['Getting Started', 'Pricing', 'Study Features', 'Account', 'Exams']

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started': return <BookOpen className="w-5 h-5" />
      case 'Pricing': return <CreditCard className="w-5 h-5" />
      case 'Study Features': return <MessageCircle className="w-5 h-5" />
      case 'Account': return <Shield className="w-5 h-5" />
      default: return <BookOpen className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => onNavigate('landing')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              PrepWisely
            </button>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => onNavigate('certifications')} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                Certifications
              </button>
              <button onClick={() => onNavigate('pricing')} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                Pricing
              </button>
              <button onClick={() => onNavigate('help')} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                Help
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => onNavigate('login')} className="hidden sm:inline-flex">
                Sign In
              </Button>
              <Button onClick={() => onNavigate('register')}>Start Free</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Find answers to common questions about PrepWisely
          </p>
        </div>
      </section>

      {/* FAQs by Category */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryFaqs = faqs.filter(faq => faq.category === category)
            if (categoryFaqs.length === 0) return null

            return (
              <div key={category} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                    {getCategoryIcon(category)}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{category}</h2>
                </div>

                <div className="space-y-4">
                  {categoryFaqs.map((faq) => {
                    const globalIndex = faqs.indexOf(faq)
                    const isOpen = openIndex === globalIndex

                    return (
                      <Card
                        key={globalIndex}
                        className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full p-6 text-left flex items-center justify-between"
                        >
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our support team is here to help you succeed
          </p>
          <Button size="lg" variant="secondary" onClick={() => onNavigate('help')}>
            Contact Support
          </Button>
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
                <li><button onClick={() => onNavigate('faq')} className="hover:text-white">FAQ</button></li>
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

export default FAQPage
