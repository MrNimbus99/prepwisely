import React from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ArrowLeft, Gift, Copy } from 'lucide-react'

const ReferFriendPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user } = useAuth()
  const referralCode = user?.userId?.slice(0, 8).toUpperCase()
  const referralLink = `https://nestedcerts.com/register?ref=${referralCode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    alert('Referral link copied!')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="outline" onClick={() => onNavigate('dashboard')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Refer a Friend</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Share NestedCerts and earn rewards</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Get 20% Off!</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              Refer friends and you both get 20% discount on your next purchase
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border-2 border-blue-300 dark:border-blue-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Referral Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm"
              />
              <Button onClick={copyToClipboard} className="bg-blue-600 hover:bg-blue-700">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1</div>
              <p className="text-sm text-slate-700 dark:text-slate-300">Share your link</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2</div>
              <p className="text-sm text-slate-700 dark:text-slate-300">Friend signs up</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
              <p className="text-sm text-slate-700 dark:text-slate-300">Both get 20% off</p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Coming Soon:</strong> Referral tracking and rewards will be activated shortly. Your referral code is ready to share!
            </p>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default ReferFriendPage
