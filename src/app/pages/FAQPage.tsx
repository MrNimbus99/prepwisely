import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'

const FAQPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  useSEO({
    title: 'Frequently Asked Questions (FAQ) - NestedCerts',
    description: 'Find answers to common questions about NestedCerts AWS certification exam prep platform, pricing, features, and study materials.',
    keywords: 'AWS certification FAQ, exam prep questions, NestedCerts help, AWS study guide FAQ',
    canonical: 'https://nestedcerts.com/faq'
  })

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is NestedCerts?',
          a: 'NestedCerts is a comprehensive AWS certification preparation platform offering daily practice exams, 30-day structured learning paths, and detailed analytics to help you pass your AWS certification exams.'
        },
        {
          q: 'How does the 30-day learning path work?',
          a: 'Each certification has a structured 30-day learning path with daily 20-question practice exams. Complete one exam per day to systematically cover all exam domains and build your knowledge progressively.'
        },
        {
          q: 'Are the practice questions similar to real AWS exams?',
          a: 'Yes! Our questions are carefully crafted to match the format, difficulty, and content of actual AWS certification exams. We regularly update our question bank based on the latest AWS exam blueprints.'
        }
      ]
    },
    {
      category: 'Pricing & Billing',
      questions: [
        {
          q: 'What is the upgrade pricing system?',
          a: 'Start with any certification for $10. When you upgrade to unlock more certifications, you only pay the difference. For example, if you upgrade from a single cert ($10) to the Associate bundle ($40), you only pay $30.'
        },
        {
          q: 'Can I cancel my subscription anytime?',
          a: 'Yes! You can cancel your subscription at any time from your account settings. You\'ll retain access until the end of your current billing period.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'Yes! We offer a 7-day money-back guarantee if you\'ve accessed less than 20% of the content. We\'re confident you\'ll love our platform, but if it\'s not right for you, we\'ll refund you - no questions asked. Try our free Cloud Practitioner certification first!'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through our secure payment processor Stripe.'
        }
      ]
    },
    {
      category: 'Practice Exams',
      questions: [
        {
          q: 'How many questions are in each practice exam?',
          a: 'Daily practice exams contain 20 questions. Full practice exams match the actual AWS exam format: 65 questions for Associate, Foundational, and Specialty exams, 75 questions for Professional exams.'
        },
        {
          q: 'Can I retake practice exams?',
          a: 'Yes! You can retake any practice exam as many times as you want. Each attempt helps reinforce your knowledge and track your progress.'
        },
        {
          q: 'How is my score calculated?',
          a: 'Your score is calculated as a percentage of correct answers. AWS exams typically require 70-75% to pass, and we recommend aiming for 75%+ on our practice exams to ensure you\'re well-prepared.'
        },
        {
          q: 'Do you provide explanations for answers?',
          a: 'Yes! Every question includes a detailed explanation of the correct answer, helping you understand the concepts and learn from your mistakes.'
        }
      ]
    },
    {
      category: 'Account & Technical',
      questions: [
        {
          q: 'How do I reset my password?',
          a: 'Click "Forgot Password" on the login page, enter your email, and you\'ll receive a password reset link. Follow the link to create a new password.'
        },
        {
          q: 'Can I use NestedCerts on mobile devices?',
          a: 'Yes! NestedCerts is fully responsive and works on all devices - desktop, tablet, and mobile phones. Study anywhere, anytime.'
        },
        {
          q: 'How do I track my progress?',
          a: 'Your dashboard shows your progress for each certification, including completed quizzes, scores, and overall completion percentage. You can also view detailed analytics for each exam attempt.'
        },
        {
          q: 'What if I encounter a technical issue?',
          a: 'Contact our support team through the Help Center. We typically respond within 24 hours and will work to resolve any issues quickly.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button
              onClick={() => onNavigate('landing')}
              className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              NestedCerts
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
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

            <Button variant="outline" onClick={() => onNavigate('help')} className="text-sm sm:text-base px-3 sm:px-4">
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Back to Help</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200">
            Find answers to common questions about NestedCerts
          </p>
        </div>

        {faqs.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {section.category}
              </Badge>
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {section.questions.map((faq, index) => {
                const globalIndex = sectionIndex * 100 + index
                const isOpen = openIndex === globalIndex
                return (
                  <Card
                    key={index}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-4"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex-1">
                        {faq.q}
                      </h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <Card className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 border-0 p-8 sm:p-12 text-center mt-8 sm:mt-12 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-base sm:text-lg text-blue-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Button onClick={() => onNavigate('contact-support')} className="bg-white text-blue-600 hover:bg-blue-50 hover:shadow-xl text-base font-bold px-10 py-6 transform hover:scale-105 transition-all">
            Contact Support
          </Button>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('certifications')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Certifications</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('help')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Help Center</button></li>
                <li><button onClick={() => onNavigate('faq')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">FAQ</button></li>
                <li><button onClick={() => onNavigate('contact-support')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('terms')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Terms</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('landing')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">About</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-600 dark:text-slate-400">
            <p>&copy; 2026 NestedCerts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FAQPage
