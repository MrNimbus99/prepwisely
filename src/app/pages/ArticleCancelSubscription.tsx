import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, CheckCircle, Calendar, DollarSign } from 'lucide-react'

const ArticleCancelSubscription: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button onClick={() => onNavigate('landing')} className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">NestedCerts</button>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => onNavigate('certifications')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Certifications</button>
              <button onClick={() => onNavigate('pricing')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Pricing</button>
              <button onClick={() => onNavigate('help')} className="text-blue-600 font-medium">Help</button>
            </div>
            <Button variant="outline" onClick={() => onNavigate('help')}><ArrowLeft className="w-4 h-4 mr-2" />Back to Help</Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mb-4">Billing</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Can I cancel my subscription anytime?</h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-8">
          <span>1.2k views</span><span>•</span><span>3 min read</span>
        </div>

        <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-700 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Yes, absolutely!</h2>
                  <p className="text-slate-800 dark:text-slate-100 text-lg">
                    You can cancel your NestedCerts subscription at any time with no penalties or cancellation fees. We believe in flexible, hassle-free subscriptions.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Cancel</h2>
            <ol className="space-y-4 mb-8">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Go to Your Dashboard</h3>
                  <p className="text-slate-800 dark:text-slate-100">Log in and navigate to your account dashboard.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">2</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Click "Manage Subscription"</h3>
                  <p className="text-slate-800 dark:text-slate-100">Find the subscription management section in your account settings.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">3</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Select "Cancel Subscription"</h3>
                  <p className="text-slate-800 dark:text-slate-100">Click the cancel button and confirm your decision.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">4</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Receive Confirmation</h3>
                  <p className="text-slate-800 dark:text-slate-100">You'll get an email confirming your cancellation immediately.</p>
                </div>
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">What Happens After Cancellation?</h2>
            
            <div className="space-y-4 mb-8">
              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Access Until Period Ends</h3>
                    <p className="text-slate-800 dark:text-slate-100">You'll retain full access to all features until the end of your current billing period. No immediate loss of access!</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Future Charges</h3>
                    <p className="text-slate-800 dark:text-slate-100">Your card won't be charged again. The subscription simply won't renew at the end of the period.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Progress Saved</h3>
                    <p className="text-slate-800 dark:text-slate-100">All your progress, scores, and history are saved. If you resubscribe later, everything will be there!</p>
                  </div>
                </div>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Refund Policy</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-4 leading-relaxed">
              We offer a <strong>7-day money-back guarantee</strong>. If you cancel within 7 days of your initial purchase, you can request a full refund by contacting our support team.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Reactivating Your Subscription</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
              Changed your mind? You can reactivate your subscription anytime from your dashboard. Your previous progress and data will be restored immediately.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-slate-800 dark:text-slate-100 font-medium">
                💡 <strong>Need Help?</strong> If you're considering canceling due to an issue, please contact our support team first. We're here to help and may be able to resolve your concerns!
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => onNavigate('contact-support')} variant="outline" className="flex-1">Contact Support</Button>
          <Button onClick={() => onNavigate('help')} className="flex-1">Back to Help Center</Button>
        </div>
      </div>
    </div>
  )
}

export default ArticleCancelSubscription
