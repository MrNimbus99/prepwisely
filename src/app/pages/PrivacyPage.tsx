import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Shield, Lock, Eye, Database } from 'lucide-react'

const PrivacyPage: React.FC<NavigationProps> = ({ onNavigate }) => {
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-green-100">
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
                <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-6 rounded">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-green-700 dark:text-green-400">Your privacy is important to us.</strong> This Privacy Policy explains how PrepWisely collects, uses, and protects your personal information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    Information We Collect
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                        <li>Name and email address</li>
                        <li>Account credentials</li>
                        <li>Payment information (processed securely by Stripe)</li>
                        <li>Profile information you choose to provide</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Usage Information</h3>
                      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                        <li>Exam scores and progress data</li>
                        <li>Study patterns and analytics</li>
                        <li>Device and browser information</li>
                        <li>IP address and location data</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    How We Use Your Information
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>To provide and improve our services</li>
                    <li>To personalize your learning experience</li>
                    <li>To process payments and manage subscriptions</li>
                    <li>To send important updates and notifications</li>
                    <li>To analyze usage patterns and improve our platform</li>
                    <li>To prevent fraud and ensure security</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    Data Security
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Encryption in transit and at rest</li>
                    <li>Secure authentication via AWS Cognito</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and monitoring</li>
                    <li>PCI-compliant payment processing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">3</div>
                    Information Sharing
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    We do not sell your personal information. We may share data with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li><strong>Service Providers:</strong> AWS, Stripe for payment processing</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
                    <li><strong>Business Transfers:</strong> In case of merger or acquisition</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">4</div>
                    Your Rights
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your data</li>
                    <li>Export your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">5</div>
                    Cookies and Tracking
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We use cookies and similar technologies to improve your experience, analyze usage, and remember your preferences. You can control cookies through your browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">6</div>
                    Data Retention
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We retain your data for as long as your account is active or as needed to provide services. You can request deletion at any time, and we will remove your data within 30 days, except where required by law.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">7</div>
                    Children's Privacy
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Our Service is not intended for children under 13. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">8</div>
                    Changes to Privacy Policy
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service. Your continued use after changes constitutes acceptance.
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Contact Us
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    If you have questions about this Privacy Policy or want to exercise your rights, contact us at{' '}
                    <a href="mailto:privacy@prepwisely.com" className="text-green-600 dark:text-green-400 hover:underline font-medium">
                      privacy@prepwisely.com
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

export default PrivacyPage
