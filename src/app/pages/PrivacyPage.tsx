import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { ArrowLeft, Trophy } from 'lucide-react'

const PrivacyPage: React.FC<NavigationProps> = ({ onNavigate }) => {
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
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Last updated: February 4, 2026
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
            </p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name and email address</li>
              <li>Payment information (processed securely by Stripe)</li>
              <li>Profile information and preferences</li>
              <li>Communication history with our support team</li>
            </ul>

            <h3>Usage Information</h3>
            <ul>
              <li>Exam results and performance data</li>
              <li>Study progress and analytics</li>
              <li>Feature usage and interaction data</li>
              <li>Device and browser information</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Analyze usage patterns to improve our platform</li>
              <li>Personalize your learning experience</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
            </p>
            
            <h3>Service Providers</h3>
            <p>
              We may share your information with third-party service providers who perform services on our behalf, such as:
            </p>
            <ul>
              <li>Payment processing (Stripe)</li>
              <li>Email delivery services</li>
              <li>Analytics providers</li>
              <li>Customer support tools</li>
            </ul>

            <h3>Legal Requirements</h3>
            <p>
              We may disclose your information if required to do so by law or in response to valid requests by public authorities.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <ul>
              <li>All data is encrypted in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information</li>
              <li>Secure payment processing via Stripe</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul>
              <li>Access: Request a copy of your personal information</li>
              <li>Correction: Request correction of inaccurate information</li>
              <li>Deletion: Request deletion of your personal information</li>
              <li>Portability: Request transfer of your information</li>
              <li>Objection: Object to processing of your information</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to collect and use personal information about you. For more information about our use of cookies, please see our Cookie Policy.
            </p>

            <h2>8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@prepwisely.com</li>
              <li>Address: PrepWisely, Inc., 123 Main Street, San Francisco, CA 94105</li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('pricing')}>
                Back to Pricing
              </Button>
              <Button variant="outline" onClick={() => onNavigate('terms')}>
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
