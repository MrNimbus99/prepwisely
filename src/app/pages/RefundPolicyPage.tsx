import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Header } from '../components/layout/Header'
import { Card } from '../components/ui/card'
import { DollarSign, CheckCircle, Mail, AlertCircle } from 'lucide-react'

const RefundPolicyPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: '7-Day Money-Back Guarantee - Refund Policy | NestedCerts',
    description: 'NestedCerts offers a 7-day money-back guarantee if you\'ve accessed less than 20% of content. Fair refund policy with usage limits.',
    keywords: 'refund policy, money-back guarantee, 7 day refund, refund request',
    canonical: 'https://nestedcerts.com/refund-policy'
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Header onNavigate={onNavigate} />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Refund Policy
          </h1>
          <p className="text-xl text-emerald-100">
            7-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 7-Day Refund Policy */}
          <Card className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 border-0 p-8 md:p-12 shadow-2xl mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                7-Day Money-Back Guarantee
              </h2>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Get a full refund within 7 days if you've accessed less than 20% of the content. We're confident you'll love our platform!
              </p>
            </div>
          </Card>

          <Card className="bg-white dark:bg-slate-900 p-6 md:p-10 shadow-xl border-2 border-slate-200 dark:border-slate-700">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  Refund Eligibility
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  You're eligible for a full refund within 7 days if:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>You've accessed less than 20% of the content (fewer than 3 quizzes completed)</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>You haven't completed the final exam</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Technical issues we cannot resolve</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Accidental duplicate purchase</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                  We also offer a free Cloud Practitioner certification so you can try our platform risk-free before purchasing.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-xl border-2 border-red-200 dark:border-red-800">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  No Refunds If
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Completed final exam</strong> - You've finished the certification</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Accessed 20%+ content</strong> - Completed 3 or more quizzes</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>After 7 days</strong> - Refund window has closed</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Subscriptions after first month</strong> - Only first payment eligible</span>
                  </li>
                </ul>
                <p className="text-slate-700 dark:text-slate-300 mt-4 leading-relaxed">
                  This policy protects against abuse while ensuring fairness for genuine cases.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  Subscription Cancellation
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  While we don't offer refunds, you can cancel your subscription at any time:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Cancel anytime from account settings - stops future billing</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Access continues until end of current billing period</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>No refunds for partial months/years - cancellation only stops renewal</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>No future charges after cancellation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-6 rounded-xl border-0 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-white" />
                  Questions?
                </h2>
                <p className="text-white/90 leading-relaxed">
                  If you have any questions about our refund policy, please{' '}
                  <button onClick={() => onNavigate('contact-support')} className="text-white hover:underline font-semibold">
                    contact us
                  </button>
                  {' '}via our contact form.
                  {' '}or visit our{' '}
                  <button onClick={() => onNavigate('help')} className="text-white hover:underline font-semibold">
                    Help Center
                  </button>
                </p>
              </div>
            </div>
          </Card>
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
            <p>&copy; 2026 NestedCerts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RefundPolicyPage
