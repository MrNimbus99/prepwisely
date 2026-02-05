import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { ArrowLeft } from 'lucide-react'

const CancellationPolicyPage: React.FC<NavigationProps> = ({ onNavigate }) => {
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
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Cancellation Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Monthly Subscriptions</h2>
            <p>You can cancel your monthly subscription at any time. Upon cancellation:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You will retain access until the end of your current billing period</li>
              <li>No further charges will be made</li>
              <li>You can reactivate your subscription at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Annual Subscriptions</h2>
            <p>Annual subscriptions can be cancelled at any time:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access continues until the end of the annual period</li>
              <li>No refunds for partial periods</li>
              <li>Subscription will not auto-renew after cancellation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Lifetime Access</h2>
            <p>Lifetime access purchases are non-refundable and cannot be cancelled as they provide permanent access to all content.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Cancel</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log in to your account</li>
              <li>Go to Account Settings</li>
              <li>Click "Manage Subscription"</li>
              <li>Select "Cancel Subscription"</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p>If you need assistance with cancellation, please contact our support team at <a href="mailto:support@prepwisely.com" className="text-blue-600 hover:underline">support@prepwisely.com</a></p>
          </section>
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
