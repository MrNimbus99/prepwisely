import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { DollarSign, CheckCircle, Clock, Mail, AlertCircle } from 'lucide-react'

const RefundPolicyPage: React.FC<NavigationProps> = ({ onNavigate }) => {
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
          {/* 30-Day Guarantee */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-500 p-8 md:p-12 shadow-xl mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                30-Day Money-Back Guarantee
              </h2>
              <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                We stand behind the quality of PrepWisely. If you're not completely satisfied with your purchase, we'll refund your money—no questions asked.
              </p>
            </div>
          </Card>

          <Card className="bg-white dark:bg-slate-900 p-8 md:p-12 shadow-xl">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    Eligible Purchases
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    Our 30-day money-back guarantee applies to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Individual certification purchases ($49 each)</li>
                    <li>Certification bundles (Associates, Professional, Specialty)</li>
                    <li>Everything Pass ($299 lifetime access)</li>
                    <li>Monthly and annual subscriptions (first payment only)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    Refund Timeline
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Request Period</h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        You have <strong>30 days from the date of purchase</strong> to request a refund. After 30 days, all sales are final.
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Processing Time</h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        Refunds are processed within <strong>5-7 business days</strong> after approval. The funds will appear in your account within 7-10 business days depending on your bank.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    How to Request a Refund
                  </h2>
                  <div className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      To request a refund, follow these simple steps:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
                      <li className="pl-2">
                        <strong>Contact Support:</strong> Email us at{' '}
                        <a href="mailto:refunds@prepwisely.com" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                          refunds@prepwisely.com
                        </a>
                      </li>
                      <li className="pl-2">
                        <strong>Include Details:</strong> Provide your account email and order number
                      </li>
                      <li className="pl-2">
                        <strong>Confirmation:</strong> You'll receive a confirmation email within 24 hours
                      </li>
                      <li className="pl-2">
                        <strong>Processing:</strong> Your refund will be processed within 5-7 business days
                      </li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    Important Notes
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Refunds are issued to the original payment method</li>
                    <li>Subscription refunds only apply to the first payment</li>
                    <li>After a refund, access to paid content is immediately revoked</li>
                    <li>Free Cloud Practitioner access remains available</li>
                    <li>Refunds are processed in USD</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Subscription Cancellations
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    For active subscriptions:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>You can cancel anytime from your account settings</li>
                    <li>You'll keep access until the end of your billing period</li>
                    <li>No refunds for partial months/years</li>
                    <li>You won't be charged again after cancellation</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-800 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    Questions?
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    If you have any questions about our refund policy, please contact our support team at{' '}
                    <a href="mailto:support@prepwisely.com" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                      support@prepwisely.com
                    </a>
                    {' '}or visit our{' '}
                    <button onClick={() => onNavigate('help')} className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                      Help Center
                    </button>
                  </p>
                </div>
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
            <p>&copy; 2026 PrepWisely. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RefundPolicyPage
