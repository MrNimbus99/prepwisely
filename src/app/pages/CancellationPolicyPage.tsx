import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, Calendar, CreditCard, Infinity, Mail, CheckCircle, AlertCircle } from 'lucide-react'

const CancellationPolicyPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: 'Cancellation Policy - Subscription Terms | NestedCerts',
    description: 'Review our cancellation policy for NestedCerts subscriptions. Learn about cancellation procedures, notice periods, billing cycles, and what happens to your data after cancellation.',
    keywords: 'cancellation policy, subscription cancellation, cancel membership, billing terms, account termination',
    canonical: 'https://nestedcerts.com/cancellation-policy'
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => onNavigate('landing')} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NestedCerts
            </button>
            <Button variant="outline" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Cancellation Policy</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Simple, flexible cancellation for all subscription types</p>
        </div>

        <Card className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 border-0 p-8 md:p-10 shadow-2xl mb-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cancel Anytime
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              No commitments, no hassle. Cancel your subscription whenever you want with just a few clicks.
            </p>
          </div>
        </Card>

        <div className="space-y-8">
          <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xl border-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              Monthly Subscriptions
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              You can cancel your monthly subscription at any time. Upon cancellation:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>You will retain access until the end of your current billing period</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>No further charges will be made</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>You can reactivate your subscription at any time</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xl border-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              Annual Subscriptions
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Annual subscriptions can be cancelled at any time:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Access continues until the end of the annual period</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>No refunds for partial periods</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Subscription will not auto-renew after cancellation</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xl border-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Infinity className="w-7 h-7 text-white" />
              </div>
              Lifetime Access
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Lifetime access purchases are non-refundable and cannot be cancelled as they provide permanent access to all content.
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-950/30 p-6 md:p-8 border-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              How to Cancel
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div className="text-slate-700 dark:text-slate-300">Log in to your account</div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div className="text-slate-700 dark:text-slate-300">Go to Membership & Subscriptions</div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div className="text-slate-700 dark:text-slate-300">Click "Manage Subscription" button</div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div className="text-slate-700 dark:text-slate-300">In Stripe portal, select "Cancel Subscription"</div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-6 md:p-8 border-0 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Mail className="w-6 h-6 text-white" />
              Need Help?
            </h2>
            <p className="text-white/90 leading-relaxed">
              If you need assistance with cancellation, please{' '}
              <button onClick={() => onNavigate('contact-support')} className="text-white hover:underline font-semibold">
                contact us
              </button>
              {' '}via our contact form.
            </p>
          </Card>
        </div>
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; 2026 NestedCerts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default CancellationPolicyPage
