import React from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { AccountLayout } from '../components/AccountLayout'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Gift, Copy, Users, Sparkles } from 'lucide-react'

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
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black">Refer & Earn</h1>
                <p className="text-purple-100 text-lg font-medium">Share the knowledge, get rewarded</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Offer Card */}
        <Card className="p-8 bg-white dark:bg-slate-800 border-2 border-indigo-300 dark:border-indigo-700 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold text-2xl mb-4 shadow-lg">
              <Sparkles className="w-6 h-6" />
              20% OFF
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Give 20%, Get 20%
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto">
              When your friend signs up and makes their first purchase, you both receive 20% off your next order
            </p>
          </div>

          {/* Referral Link Box */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 border-2 border-indigo-300 dark:border-indigo-700 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Your Unique Link</label>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Users className="w-4 h-4" />
                <span className="text-xs font-semibold">Share with friends</span>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button 
                onClick={copyToClipboard} 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-6">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-5xl font-black mb-3 opacity-90">1</div>
                  <h4 className="font-bold text-lg mb-2">Share Your Link</h4>
                  <p className="text-blue-100 text-sm">Send your unique referral link to friends via email, social media, or messaging</p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-5xl font-black mb-3 opacity-90">2</div>
                  <h4 className="font-bold text-lg mb-2">Friend Signs Up</h4>
                  <p className="text-purple-100 text-sm">They create an account and make their first purchase using your link</p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-5xl font-black mb-3 opacity-90">3</div>
                  <h4 className="font-bold text-lg mb-2">Both Get Rewards</h4>
                  <p className="text-orange-100 text-sm">You both receive 20% off your next certification purchase</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-800/50 dark:to-orange-800/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm font-bold text-yellow-900 dark:text-yellow-200 uppercase tracking-wide">
                Coming Soon
              </p>
              <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-sm text-yellow-900 dark:text-yellow-100 font-semibold">
              Automatic referral tracking and rewards will be activated shortly. Your referral code is ready to share now!
            </p>
          </div>
        </Card>
      </div>
    </AccountLayout>
  )
}

export default ReferFriendPage
