import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Eye, Keyboard, Volume2, Smartphone, Monitor, Heart } from 'lucide-react'

const AccessibilityPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: 'Accessibility Statement - Inclusive Design Commitment | NestedCerts',
    description: 'Our commitment to accessibility for all users. Learn about NestedCerts accessibility features, WCAG compliance, assistive technology support, and how to request accommodations.',
    keywords: 'accessibility statement, WCAG compliance, assistive technology, inclusive design, accessibility features',
    canonical: 'https://nestedcerts.com/accessibility'
  })
  
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
              NestedCerts
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Accessibility Statement
          </h1>
          <p className="text-xl text-purple-100">
            NestedCerts is committed to ensuring digital accessibility for everyone
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white dark:bg-slate-900 p-8 md:p-12 shadow-xl mb-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="space-y-8">
                <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 p-6 rounded">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-purple-700 dark:text-purple-400">Our Commitment:</strong> We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    Visual Accessibility
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>High contrast color schemes for better readability</li>
                    <li>Dark mode support for reduced eye strain</li>
                    <li>Scalable text that works with browser zoom</li>
                    <li>Clear visual hierarchy and spacing</li>
                    <li>WCAG 2.1 AA compliant color contrast ratios</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Keyboard className="w-6 h-6 text-white" />
                    </div>
                    Keyboard Navigation
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Full keyboard navigation support</li>
                    <li>Visible focus indicators on all interactive elements</li>
                    <li>Logical tab order throughout the application</li>
                    <li>Keyboard shortcuts for common actions</li>
                    <li>Skip navigation links for screen readers</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Volume2 className="w-6 h-6 text-white" />
                    </div>
                    Screen Reader Support
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Semantic HTML for proper structure</li>
                    <li>ARIA labels and descriptions where needed</li>
                    <li>Alternative text for all images and icons</li>
                    <li>Descriptive link text and button labels</li>
                    <li>Tested with NVDA, JAWS, and VoiceOver</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    Mobile Accessibility
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Responsive design that works on all devices</li>
                    <li>Touch-friendly interface with adequate target sizes</li>
                    <li>Support for mobile screen readers</li>
                    <li>Optimized for one-handed use</li>
                    <li>Works with mobile accessibility features</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Monitor className="w-6 h-6 text-white" />
                    </div>
                    Browser Compatibility
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    NestedCerts is designed to work with the following browsers and assistive technologies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                    <li>Chrome, Firefox, Safari, Edge (latest versions)</li>
                    <li>Screen readers: NVDA, JAWS, VoiceOver</li>
                    <li>Browser zoom up to 200%</li>
                    <li>Operating system accessibility features</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-800 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    Feedback & Assistance
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    We welcome your feedback on the accessibility of NestedCerts. If you encounter any accessibility barriers, please let us know:
                  </p>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    <li><strong>Email:</strong> <a href="mailto:accessibility@prepwisely.com" className="text-purple-600 dark:text-purple-400 hover:underline">accessibility@prepwisely.com</a></li>
                    <li><strong>Response Time:</strong> We aim to respond within 2 business days</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Ongoing Improvements
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We are continuously working to improve the accessibility of NestedCerts. Our development team regularly audits the platform and implements improvements based on user feedback and the latest accessibility guidelines.
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
            <p>&copy; 2026 NestedCerts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AccessibilityPage
