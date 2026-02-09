import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { DollarSign, CheckCircle, Clock, Mail, AlertCircle } from 'lucide-react'

const RefundPolicyPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: 'Refund Policy - Money-Back Guarantee Terms | NestedCerts',
    description: 'Understand our refund policy for NestedCerts subscriptions. Learn about eligibility, refund timelines, money-back guarantee, and how to request a refund for your purchase.',
    keywords: 'refund policy, money-back guarantee, refund request, payment refund, subscription refund',
    canonical: 'https://nestedcerts.com/refund-policy'
  })
  
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
              NestedCerts
            </button>
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
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Refund Policy
          </h1>
          <p className="text-xl text-emerald-100">
            Your satisfaction is our priority
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
                7-Day Refund Policy
              </h2>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Refunds are available within 7 days of purchase, subject to eligibility criteria and usage limits outlined below.
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
                  Refunds may be requested within 7 days of purchase for:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Individual certification purchases ($49 each) - first purchase only</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Monthly subscriptions - first payment only, within 7 days</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Annual subscriptions - within 7 days, if less than 10% of content accessed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-xl border-2 border-red-200 dark:border-red-800">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  Non-Refundable Items
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Everything Pass ($299)</strong> - All sales final, no refunds</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Certification bundles</strong> - All sales final, no refunds</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Repeat purchases</strong> - Only first purchase eligible for refund</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>After 7 days</strong> - All sales final after 7-day window</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Excessive usage</strong> - Refund denied if more than 20% of questions attempted or 10 practice exams taken</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  Refund Timeline
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Request Period</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      You have <strong className="text-blue-600 dark:text-blue-400">7 days from the date of purchase</strong> to request a refund. After 7 days, all sales are final and no refunds will be issued.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Processing Time</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Refund requests are reviewed within <strong className="text-purple-600 dark:text-purple-400">3-5 business days</strong>. Approved refunds are processed within 7-10 business days to original payment method.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  How to Request a Refund
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    To request a refund, follow these simple steps:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Contact Support:</strong>
                        <span className="text-slate-700 dark:text-slate-300"> Email us at </span>
                        <a href="mailto:refunds@prepwisely.com" className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">
                          refunds@prepwisely.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Include Details:</strong>
                        <span className="text-slate-700 dark:text-slate-300"> Provide account email, order number, and reason for refund request</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Review:</strong>
                        <span className="text-slate-700 dark:text-slate-300"> We'll review your request and usage data within 3-5 business days</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Decision:</strong>
                        <span className="text-slate-700 dark:text-slate-300"> You'll receive approval or denial notification via email</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                      <div>
                        <strong className="text-slate-900 dark:text-white">Processing:</strong>
                        <span className="text-slate-700 dark:text-slate-300"> Approved refunds processed within 7-10 business days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  Important Terms
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Refunds issued to original payment method only - no cash alternatives</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>All refund decisions are final and at our sole discretion</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Abuse of refund policy may result in account termination</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Upon refund approval, all paid content access is immediately revoked</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Free Cloud Practitioner content remains accessible after refund</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Refunds processed in USD regardless of original currency</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Payment processor fees are non-refundable</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-950/30 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Subscription Cancellations vs Refunds
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Cancellation is different from a refund:
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
                  If you have any questions about our refund policy, please contact our support team at{' '}
                  <a href="mailto:support@prepwisely.com" className="text-white hover:underline font-semibold">
                    support@prepwisely.com
                  </a>
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
