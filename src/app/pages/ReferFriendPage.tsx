import React from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { AccountLayout } from '../components/AccountLayout'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Gift, Copy } from 'lucide-react'

const ReferFriendPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user } = useAuth()
  const referralCode = user?.userId?.slice(0, 8).toUpperCase()
  const referralLink = `https://nestedcerts.com/register?ref=${referralCode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    alert('Referral link copied!')
  }

  return (
    <AccountLayout onNavigate={onNavigate} activeTab="refer">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-6 border-2 border-purple-200 dark:border-purple-800">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Refer a Friend</h1>
          <p className="text-slate-700 dark:text-slate-300 mt-2">Share NestedCerts and earn rewards</p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-200 dark:border-blue-800">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Get 20% Off!</h2>
            <p className="text-lg text-slate-800 dark:text-slate-200 font-medium">
              Refer friends and you both get 20% discount on your next purchase
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border-2 border-blue-300 dark:border-blue-700 shadow-md">
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Your Referral Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm font-semibold"
              />
              <Button onClick={copyToClipboard} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg font-semibold">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1</div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Share your link</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2</div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Friend signs up</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Both get 20% off</p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
            <p className="text-sm text-yellow-900 dark:text-yellow-200 font-semibold">
              <strong>Coming Soon:</strong> Referral tracking and rewards will be activated shortly. Your referral code is ready to share!
            </p>
          </div>
        </Card>
      </div>
    </AccountLayout>
  )
}

export default ReferFriendPage
