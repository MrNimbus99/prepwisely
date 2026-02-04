import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { ArrowLeft, Trophy } from 'lucide-react'

const TermsPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('pricing')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pricing
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Last updated: February 4, 2026
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using PrepWisely ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              PrepWisely provides AWS certification exam preparation services including practice exams, study materials, analytics, and learning paths.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2>4. Payment Terms</h2>
            <p>
              Payment for services is due at the time of purchase. Subscription services are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as specifically stated in our refund policy.
            </p>

            <h2>5. Refund Policy</h2>
            <p>
              We offer a 30-day money-back guarantee on all purchases. To request a refund, contact our support team within 30 days of your purchase.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by PrepWisely and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h2>7. User Content</h2>
            <p>
              You retain rights to any content you submit, post, or display on or through the Service. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.
            </p>

            <h2>8. Prohibited Uses</h2>
            <p>
              You may not use our Service:
            </p>
            <ul>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>

            <h2>9. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
            </p>

            <h2>10. Disclaimer</h2>
            <p>
              The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions, and terms.
            </p>

            <h2>11. Limitation of Liability</h2>
            <p>
              In no event shall PrepWisely, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>

            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at legal@prepwisely.com.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('pricing')}>
                Back to Pricing
              </Button>
              <Button variant="outline" onClick={() => onNavigate('privacy')}>
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
