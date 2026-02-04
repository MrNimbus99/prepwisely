import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { FileText, Scale } from 'lucide-react'

const TermsPage: React.FC<NavigationProps> = ({ onNavigate }) => {
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100">
            Last updated: February 4, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white dark:bg-slate-900 p-8 md:p-12 shadow-xl">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">1</div>
                    Acceptance of Terms
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    By accessing and using PrepWisely ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our Service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">2</div>
                    Description of Service
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    PrepWisely provides AWS certification exam preparation services including practice exams, study materials, analytics, and structured learning paths. We offer both free and paid tiers of service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">3</div>
                    User Accounts
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. Notify us immediately of any unauthorized use.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">4</div>
                    Payment Terms
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    Payment for services is due at the time of purchase. Subscription services are billed in advance on a monthly or annual basis.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>All prices are in USD</li>
                    <li>Subscriptions auto-renew unless cancelled</li>
                    <li>You can cancel anytime from your account settings</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">5</div>
                    Refund Policy
                  </h2>
                  <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-green-700 dark:text-green-400">30-Day Money-Back Guarantee:</strong> We offer a full refund on all purchases within 30 days. Contact our support team to request a refund.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">6</div>
                    Intellectual Property
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    The Service and its original content, features, and functionality are owned by PrepWisely and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">7</div>
                    Prohibited Uses
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    You may not use our Service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>For any unlawful purpose</li>
                    <li>To violate any regulations, rules, or laws</li>
                    <li>To infringe upon intellectual property rights</li>
                    <li>To harass, abuse, or harm others</li>
                    <li>To submit false or misleading information</li>
                    <li>To share account credentials</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">8</div>
                    Termination
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">9</div>
                    Limitation of Liability
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    In no event shall PrepWisely, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">10</div>
                    Changes to Terms
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We reserve the right to modify these Terms at any time. If a revision is material, we will provide at least 30 days notice. Your continued use of the Service after changes constitutes acceptance of the new Terms.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at{' '}
                    <a href="mailto:legal@prepwisely.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      legal@prepwisely.com
                    </a>
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

export default TermsPage
