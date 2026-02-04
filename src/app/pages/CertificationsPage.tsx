import React from 'react'
import { NavigationProps } from '../types'
import { certifications } from '../data/certifications'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { CheckCircle, Star, Zap } from 'lucide-react'

const CertificationsPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const groupedCerts = {
    Foundational: certifications.filter(cert => cert.level === 'Foundational'),
    Associate: certifications.filter(cert => cert.level === 'Associate'),
    Professional: certifications.filter(cert => cert.level === 'Professional'),
    Specialty: certifications.filter(cert => cert.level === 'Specialty')
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Foundational': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Associate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Professional': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Specialty': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('landing')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                PrepWisely
              </button>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => onNavigate('certifications')}
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Certifications
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                Pricing
              </button>
              <button
                onClick={() => onNavigate('help')}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                Help
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
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
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            AWS Certification
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Exam Preparation
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Master all AWS certifications with our comprehensive 30-day exam paths. 
            Start with Cloud Practitioner for free, then advance to Associate, Professional, and Specialty levels.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Cloud Practitioner FREE</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">12 Certifications</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">30-Day Paths</span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedCerts).map(([level, certs]) => (
            <div key={level} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {level} Level
                </h2>
                <Badge className={getDifficultyColor(level)}>
                  {certs.length} Certification{certs.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certs.map((cert) => {
                  const getLevelColor = (level: string) => {
                    switch (level) {
                      case 'Foundational':
                        return {
                          gradient: 'from-green-500 to-emerald-600',
                          bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
                          border: 'border-green-200 dark:border-green-800',
                          badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                          icon: 'text-green-600 dark:text-green-400'
                        }
                      case 'Associate':
                        return {
                          gradient: 'from-blue-500 to-indigo-600',
                          bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
                          border: 'border-blue-200 dark:border-blue-800',
                          badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                          icon: 'text-blue-600 dark:text-blue-400'
                        }
                      case 'Professional':
                        return {
                          gradient: 'from-purple-500 to-violet-600',
                          bg: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20',
                          border: 'border-purple-200 dark:border-purple-800',
                          badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
                          icon: 'text-purple-600 dark:text-purple-400'
                        }
                      case 'Specialty':
                        return {
                          gradient: 'from-orange-500 to-red-600',
                          bg: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
                          border: 'border-orange-200 dark:border-orange-800',
                          badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                          icon: 'text-orange-600 dark:text-orange-400'
                        }
                      default:
                        return {
                          gradient: 'from-slate-500 to-slate-600',
                          bg: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/20 dark:to-slate-900/20',
                          border: 'border-slate-200 dark:border-slate-800',
                          badge: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200',
                          icon: 'text-slate-600 dark:text-slate-400'
                        }
                    }
                  }

                  const colors = getLevelColor(cert.level)

                  return (
                    <Card key={cert.id} className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${colors.bg} ${colors.border} border-2`}>
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      {/* Level and Free badges */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge className={`${colors.badge} font-semibold text-xs px-2 py-1`}>
                          {cert.level}
                        </Badge>
                        {cert.isFree && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold text-xs px-2 py-1">
                            FREE
                          </Badge>
                        )}
                      </div>

                      <div className="relative p-6">
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                              {cert.name}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-mono">
                              {cert.code}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {cert.description}
                            </p>
                          </div>

                          {/* Exam details */}
                          <div className="space-y-2 bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                              <span className="font-semibold">{cert.examDetails.duration} min</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-500 dark:text-slate-400">Questions:</span>
                              <span className="font-semibold">{cert.examDetails.questions}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-500 dark:text-slate-400">Passing Score:</span>
                              <span className="font-semibold">{cert.examDetails.passingScore}</span>
                            </div>
                          </div>

                          {/* Domains */}
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                              Key Domains:
                            </h4>
                            <div className="space-y-1">
                              {cert.domains.slice(0, 3).map((domain, index) => (
                                <div key={index} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient}`} />
                                  {domain}
                                </div>
                              ))}
                              {cert.domains.length > 3 && (
                                <div className="text-xs text-slate-500 dark:text-slate-500 italic">
                                  +{cert.domains.length - 3} more domains
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                            <div>
                              {cert.isFree ? (
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                  FREE
                                </div>
                              ) : (
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                  ${cert.price}
                                </div>
                              )}
                            </div>
                            <Button 
                              className={`bg-gradient-to-r ${colors.gradient} hover:shadow-lg transition-all duration-200 text-white font-semibold px-6`}
                              onClick={() => onNavigate('exam-path')}
                            >
                              {cert.isFree ? 'Start Free' : 'Start Path'}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Hover effect border */}
                      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your AWS Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Begin with Cloud Practitioner for free, or choose a plan that fits your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 hover:bg-blue-50 border-white"
              onClick={() => onNavigate('register')}
            >
              Start Cloud Practitioner Free
            </Button>
            <Button
              size="lg"
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => onNavigate('pricing')}
            >
              View All Plans
            </Button>
          </div>
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
                <li><button onClick={() => onNavigate('status')} className="hover:text-white">Status</button></li>
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
            <p>&copy; 2026 PrepWisely. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CertificationsPage
