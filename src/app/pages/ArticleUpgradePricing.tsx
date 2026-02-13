import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { NestedCertsLogo } from '../components/NestedCertsLogo'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, DollarSign, TrendingUp, Mail } from 'lucide-react'

const ArticleUpgradePricing: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: 'How to Upgrade Your Plan - Pricing & Subscription Guide | NestedCerts',
    description: 'Learn how to upgrade your NestedCerts subscription plan. Compare features, pricing tiers, and get step-by-step instructions for upgrading your AWS exam prep account.',
    keywords: 'upgrade plan, pricing tiers, subscription upgrade, account upgrade, premium features',
    canonical: 'https://nestedcerts.com/article-upgrade'
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button onClick={() => onNavigate('landing')} className="flex items-center space-x-2">
              <NestedCertsLogo className="w-10 h-10 sm:w-12 sm:h-12" />
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NestedCerts
              </span>
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => onNavigate('certifications')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Certifications
              </button>
              <button onClick={() => onNavigate('pricing')} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Pricing
              </button>
              <button onClick={() => onNavigate('help')} className="text-blue-600 font-medium">
                Help
              </button>
            </div>

            <Button variant="outline" onClick={() => onNavigate('help')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mb-4">Billing</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          What is the upgrade pricing system?
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-8">
          <span>1.8k views</span>
          <span>•</span>
          <span>4 min read</span>
        </div>

        <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Pay Only for What You Need</h2>
            <p className="text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
              Our upgrade pricing system is designed to be fair and flexible. You only pay the difference when upgrading to a higher tier—never pay twice for the same content!
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">How It Works</h2>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">The Simple Formula</h3>
              <div className="text-center py-4">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Upgrade Cost = New Tier Price - Amount Already Paid
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Real Examples</h2>

            <div className="space-y-6 mb-8">
              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Example 1: Single Cert → Associate Bundle</h3>
                    <div className="space-y-2 text-slate-800 dark:text-slate-100">
                      <p>• You paid: <strong>$10</strong> for Cloud Practitioner</p>
                      <p>• Associate Bundle costs: <strong>$45</strong></p>
                      <p>• You pay to upgrade: <strong>$35</strong> (not $45!)</p>
                      <p className="text-green-600 dark:text-green-400 font-bold mt-3">✓ You save $10 by upgrading!</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Example 2: Associate Bundle → All Access</h3>
                    <div className="space-y-2 text-slate-800 dark:text-slate-100">
                      <p>• You paid: <strong>$45</strong> for Associate Bundle (3 certs)</p>
                      <p>• All Access costs: <strong>$100</strong> (all 12 certs)</p>
                      <p>• You pay to upgrade: <strong>$55</strong></p>
                      <p className="text-green-600 dark:text-green-400 font-bold mt-3">✓ Get 9 more certifications for just $55!</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Example 3: Two Individual Certs → All Access</h3>
                    <div className="space-y-2 text-slate-800 dark:text-slate-100">
                      <p>• You paid: <strong>$20</strong> for 2 individual certs ($10 each)</p>
                      <p>• All Access costs: <strong>$100</strong></p>
                      <p>• Contact our team to upgrade for: <strong>$80</strong></p>
                      <p className="text-blue-600 dark:text-blue-400 font-bold mt-3">💡 Contact support for custom upgrade pricing!</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Pricing Tiers</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-900 dark:text-white font-bold">Tier</th>
                    <th className="text-left py-3 px-4 text-slate-900 dark:text-white font-bold">Certifications</th>
                    <th className="text-right py-3 px-4 text-slate-900 dark:text-white font-bold">Price</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800 dark:text-slate-100">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-3 px-4 font-medium">Single Cert</td>
                    <td className="py-3 px-4">Any 1 certification</td>
                    <td className="py-3 px-4 text-right font-bold">$10</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-3 px-4 font-medium">Associate Bundle</td>
                    <td className="py-3 px-4">3 Associate certs</td>
                    <td className="py-3 px-4 text-right font-bold">$45</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-3 px-4 font-medium">Professional Bundle</td>
                    <td className="py-3 px-4">2 Professional certs</td>
                    <td className="py-3 px-4 text-right font-bold">$70</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-3 px-4 font-medium">Specialty Bundle</td>
                    <td className="py-3 px-4">6 Specialty certs</td>
                    <td className="py-3 px-4 text-right font-bold">$85</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">All Access</td>
                    <td className="py-3 px-4">All 12 certifications</td>
                    <td className="py-3 px-4 text-right font-bold text-blue-600 dark:text-blue-400">$100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">How to Upgrade</h2>
            <ol className="space-y-4 mb-8 list-decimal list-inside text-slate-800 dark:text-slate-100">
              <li className="leading-relaxed"><strong>Go to your Dashboard</strong> and click "Upgrade Plan"</li>
              <li className="leading-relaxed"><strong>Select your new tier</strong> - you'll see the upgrade price automatically calculated</li>
              <li className="leading-relaxed"><strong>Complete payment</strong> - only pay the difference</li>
              <li className="leading-relaxed"><strong>Instant access</strong> - new certifications unlock immediately</li>
            </ol>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 border-purple-200 dark:border-purple-700 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Need Custom Pricing?</h3>
              <p className="text-slate-800 dark:text-slate-100 mb-4">
                If you've purchased multiple individual certifications or have a unique situation, contact our support team for personalized upgrade pricing.
              </p>
              <Button onClick={() => onNavigate('contact-support')} className="bg-gradient-to-r from-purple-500 to-pink-600">
                Contact Support Team
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => onNavigate('pricing')} className="flex-1">
            View All Pricing
          </Button>
          <Button variant="outline" onClick={() => onNavigate('help')} className="flex-1">
            Back to Help Center
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ArticleUpgradePricing
