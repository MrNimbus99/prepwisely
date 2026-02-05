import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, Mail, MessageCircle, CheckCircle } from 'lucide-react'

const ContactSupportPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitted(true)
        setTimeout(() => {
          onNavigate('help')
        }, 3000)
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white dark:bg-slate-900 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Message Sent!
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <Button onClick={() => onNavigate('help')} className="w-full">
            Back to Help Center
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <button
              onClick={() => onNavigate('landing')}
              className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              NestedCerts
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

            <Button variant="outline" onClick={() => onNavigate('help')} className="text-sm sm:text-base px-3 sm:px-4">
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Back to Help</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
            Contact Support
          </h1>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200">
            We're here to help! Send us a message and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-slate-900 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General Question</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="account">Account Management</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg text-base sm:text-lg py-5 sm:py-6">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Email Support
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">
                Get detailed help via email
              </p>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Response within 24 hours
              </Badge>
            </Card>

            <Card className="bg-white dark:bg-slate-900 p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Live Chat
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">
                Chat with our team in real-time
              </p>
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                Coming Soon
              </Badge>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-700 p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Before you contact us
              </h3>
              <p className="text-sm text-slate-800 dark:text-slate-100 mb-3">
                Check our FAQ page for quick answers to common questions.
              </p>
              <Button variant="outline" onClick={() => onNavigate('faq')} className="w-full text-sm border-2 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                View FAQ
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('certifications')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Certifications</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('help')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Help Center</button></li>
                <li><button onClick={() => onNavigate('faq')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">FAQ</button></li>
                <li><button onClick={() => onNavigate('contact-support')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('terms')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Terms</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('landing')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">About</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-600 dark:text-slate-400">
            <p>&copy; 2026 NestedCerts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ContactSupportPage
