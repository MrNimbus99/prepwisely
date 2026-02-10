import React, { useState } from 'react'
import { NavigationProps, PageName } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { useQuiz } from '../contexts/QuizContext'
import { getBadgeUrl } from '../data/certBadges'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { LogOut, CheckCircle, Lock, Play, Shield, Menu, X, Settings, User, HelpCircle, CreditCard, MapPin, Phone, Package, History } from 'lucide-react'
import { NestedCertsLogo } from '../components/NestedCertsLogo'
import { createPortalSession } from '../services/stripe'

interface CertificationCard {
  id: string
  name: string
  code: string
  level: string
  progress: number
  totalQuizzes: number
  completedQuizzes: number
  completedExams: number
  isUnlocked: boolean
  gradient: string
}

const DashboardPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth()
  const { getProgress } = useQuiz()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [purchasedCerts, setPurchasedCerts] = useState<string[]>([])
  const [hasSubscription, setHasSubscription] = useState(false)

  // Check if user has access to all certs (admin and owner)
  const hasFullAccess = user?.email === 'admin@prepwisely.com'

  const priceMap: Record<string, string> = {
    'ai-practitioner': 'price_1Sz6OwETKsGuZh3dpMKNYEGk',
    'solutions-architect-associate': 'price_1Sz6OyETKsGuZh3dy3UVCkKE',
    'developer-associate': 'price_1Sz6OzETKsGuZh3dpW6LAvZc',
    'cloudops-engineer-associate': 'price_1Sz6OzETKsGuZh3d7cymNzUG',
    'data-engineer-associate': 'price_1Sz6P0ETKsGuZh3dystnojnN',
    'machine-learning-engineer-associate': 'price_1Sz6P1ETKsGuZh3dCXNenr5x',
    'solutions-architect-professional': 'price_1Sz6P2ETKsGuZh3dSYHzmkZE',
    'devops-engineer-professional': 'price_1Sz6P3ETKsGuZh3dQgbGvZXg',
    'generative-ai-developer-professional': 'price_1Sz6P3ETKsGuZh3dwkCHMMmA',
    'advanced-networking-specialty': 'price_1Sz6P4ETKsGuZh3dfS498Ua0',
    'security-specialty': 'price_1Sz6P5ETKsGuZh3d73HnsepF',
    'machine-learning-specialty': 'price_1Sz6P6ETKsGuZh3dmtFZBT0s'
  }

  const isCertUnlocked = (certId: string) => {
    if (hasFullAccess || hasSubscription) return true
    if (certId === 'cloud-practitioner') return true
    const priceId = priceMap[certId]
    const unlocked = purchasedCerts.includes(priceId)
    console.log(`Cert ${certId}: priceId=${priceId}, unlocked=${unlocked}`)
    return unlocked
  }

  // Fetch purchased certs on mount
  React.useEffect(() => {
    if (user?.userId) {
      fetch(`https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com/api/billing/subscription?userId=${user.userId}&t=${Date.now()}`)
        .then(r => r.json())
        .then(data => {
          console.log('API Response:', data)
          console.log('Purchased certs:', data.purchasedCerts)
          if (data.purchasedCerts) {
            setPurchasedCerts(data.purchasedCerts)
          }
          setHasSubscription(data.hasAccess && (data.status === 'active' || data.status === 'trialing'))
        })
        .catch(console.error)
    }
  }, [user?.userId])

  // All certifications with unique colors - recalculate when purchasedCerts changes
  const allCertifications = React.useMemo(() => [
    // Foundational (2)
    {
      id: 'cloud-practitioner',
      name: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      level: 'Foundational',
      gradient: 'from-green-500 to-emerald-600',
      isUnlocked: true
    },
    {
      id: 'ai-practitioner',
      name: 'AWS Certified AI Practitioner',
      code: 'AIF-C01',
      level: 'Foundational',
      gradient: 'from-violet-500 to-purple-600',
      isUnlocked: isCertUnlocked('ai-practitioner')
    },
    // Associate (5)
    {
      id: 'solutions-architect-associate',
      name: 'AWS Certified Solutions Architect – Associate',
      code: 'SAA-C03',
      level: 'Associate',
      gradient: 'from-blue-500 to-indigo-600',
      isUnlocked: isCertUnlocked('solutions-architect-associate')
    },
    {
      id: 'developer-associate',
      name: 'AWS Certified Developer – Associate',
      code: 'DVA-C02',
      level: 'Associate',
      gradient: 'from-purple-500 to-pink-600',
      isUnlocked: isCertUnlocked('developer-associate')
    },
    {
      id: 'cloudops-engineer-associate',
      name: 'AWS Certified CloudOps Engineer – Associate',
      code: 'SOA-C03',
      level: 'Associate',
      gradient: 'from-orange-500 to-amber-600',
      isUnlocked: isCertUnlocked('cloudops-engineer-associate')
    },
    {
      id: 'data-engineer-associate',
      name: 'AWS Certified Data Engineer – Associate',
      code: 'DEA-C01',
      level: 'Associate',
      gradient: 'from-cyan-500 to-teal-600',
      isUnlocked: isCertUnlocked('data-engineer-associate')
    },
    {
      id: 'machine-learning-engineer-associate',
      name: 'AWS Certified Machine Learning Engineer – Associate',
      code: 'MLA-C01',
      level: 'Associate',
      gradient: 'from-fuchsia-500 to-pink-600',
      isUnlocked: isCertUnlocked('machine-learning-engineer-associate')
    },
    // Professional (3)
    {
      id: 'solutions-architect-professional',
      name: 'AWS Certified Solutions Architect – Professional',
      code: 'SAP-C02',
      level: 'Professional',
      gradient: 'from-rose-500 to-red-600',
      isUnlocked: isCertUnlocked('solutions-architect-professional')
    },
    {
      id: 'devops-engineer-professional',
      name: 'AWS Certified DevOps Engineer – Professional',
      code: 'DOP-C02',
      level: 'Professional',
      gradient: 'from-slate-600 to-gray-700',
      isUnlocked: isCertUnlocked('devops-engineer-professional')
    },
    {
      id: 'generative-ai-developer-professional',
      name: 'AWS Certified Generative AI Developer – Professional',
      code: 'AIP-C01',
      level: 'Professional',
      gradient: 'from-indigo-500 to-purple-600',
      isUnlocked: isCertUnlocked('generative-ai-developer-professional')
    },
    // Specialty (3)
    {
      id: 'advanced-networking-specialty',
      name: 'AWS Certified Advanced Networking – Specialty',
      code: 'ANS-C01',
      level: 'Specialty',
      gradient: 'from-sky-500 to-blue-600',
      isUnlocked: isCertUnlocked('advanced-networking-specialty')
    },
    {
      id: 'security-specialty',
      name: 'AWS Certified Security – Specialty',
      code: 'SCS-C03',
      level: 'Specialty',
      gradient: 'from-emerald-500 to-green-600',
      isUnlocked: isCertUnlocked('security-specialty')
    },
    {
      id: 'machine-learning-specialty',
      name: 'AWS Certified Machine Learning – Specialty',
      code: 'MLS-C01',
      level: 'Specialty',
      gradient: 'from-lime-500 to-green-600',
      isUnlocked: isCertUnlocked('machine-learning-specialty')
    }
  ], [purchasedCerts, hasFullAccess, hasSubscription])

  const certifications: CertificationCard[] = allCertifications.map(cert => {
    const { completed, percentage } = getProgress(cert.id, 32)
    const completedQuizzes = Math.min(completed, 30)
    const completedExams = Math.max(0, completed - 30)
    return {
      ...cert,
      progress: percentage,
      totalQuizzes: 32,
      completedQuizzes: completedQuizzes,
      completedExams: completedExams
    }
  })

  const handleSignOut = async () => {
    await signOut()
    onNavigate('landing')
  }

  const handleStartCertification = (certId: string) => {
    const pageMap: { [key: string]: PageName } = {
      'cloud-practitioner': 'cert-cloud-practitioner',
      'ai-practitioner': 'cert-ai-practitioner',
      'solutions-architect-associate': 'cert-solutions-architect-associate',
      'developer-associate': 'cert-developer-associate',
      'cloudops-engineer-associate': 'cert-cloudops-engineer-associate',
      'data-engineer-associate': 'cert-data-engineer-associate',
      'machine-learning-engineer-associate': 'cert-machine-learning-engineer-associate',
      'solutions-architect-professional': 'cert-solutions-architect-professional',
      'devops-engineer-professional': 'cert-devops-engineer-professional',
      'generative-ai-developer-professional': 'cert-generative-ai-developer-professional',
      'advanced-networking-specialty': 'cert-advanced-networking-specialty',
      'security-specialty': 'cert-security-specialty',
      'machine-learning-specialty': 'cert-machine-learning-specialty'
    }
    onNavigate(pageMap[certId])
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
            <div className="flex items-center gap-2">
              {user?.email === 'admin@prepwisely.com' && (
                <Button variant="outline" onClick={() => onNavigate('admin')} className="text-xs sm:text-sm px-2 sm:px-4">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              )}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {userMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.email}</p>
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={() => { setUserMenuOpen(false); onNavigate('dashboard'); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); /* Add profile page */ }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <Settings className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); /* Add address page */ }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <MapPin className="w-4 h-4" />
                        Address
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); onNavigate('contact-support'); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <Phone className="w-4 h-4" />
                        Contact
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-200 dark:border-slate-700 py-1">
                      <button
                        onClick={async () => {
                          setUserMenuOpen(false)
                          if (user) {
                            try {
                              const { url } = await createPortalSession(user.userId)
                              window.location.href = url
                            } catch (error) {
                              console.error('Portal error:', error)
                            }
                          }
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <CreditCard className="w-4 h-4" />
                        Manage Billing
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); onNavigate('pricing'); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <Package className="w-4 h-4" />
                        Membership & Subscriptions
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); /* Add purchase history */ }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <History className="w-4 h-4" />
                        Purchase History
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); /* Add payment method */ }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <CreditCard className="w-4 h-4" />
                        Add / Change Credit Card
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-200 dark:border-slate-700 py-1">
                      <button
                        onClick={() => { setUserMenuOpen(false); onNavigate('help'); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-3"
                      >
                        <HelpCircle className="w-4 h-4" />
                        Help Center
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-1">
                      <button
                        onClick={() => { setUserMenuOpen(false); handleSignOut(); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300">
            Continue your AWS certification journey
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
            Your Certifications
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert) => (
              <Card
                key={cert.id}
                className={`group relative overflow-hidden bg-white dark:bg-slate-900 border-2 transition-all duration-300 hover:shadow-2xl ${
                  cert.isUnlocked
                    ? 'border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500'
                    : 'border-slate-200 dark:border-slate-700 opacity-60'
                }`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Lock badge for locked certs */}
                {!cert.isUnlocked && (
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-slate-500" />
                    </div>
                  </div>
                )}

                <div className="relative p-4 sm:p-6">
                  {/* Badge Image */}
                  <div className={`mb-3 sm:mb-4 flex items-center justify-center ${cert.code === 'MLA-C01' ? 'w-24 h-24 sm:w-32 sm:h-32' : 'w-16 h-16 sm:w-24 sm:h-24'}`}>
                    <img 
                      src={getBadgeUrl(cert.code)} 
                      alt={`${cert.name} badge`}
                      className={`w-full h-full object-contain drop-shadow-lg ${cert.isUnlocked ? 'group-hover:scale-110' : ''} transition-transform duration-300`}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-1">
                        {cert.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-mono">
                        {cert.code}
                      </p>
                    </div>

                    {cert.isUnlocked && (
                      <>
                        {/* Progress */}
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600 dark:text-slate-400">Progress</span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {cert.completedQuizzes}/30 Quizzes • {cert.completedExams}/2 Exams
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${cert.gradient} transition-all duration-500`}
                              style={{ width: `${cert.progress}%` }}
                            />
                          </div>
                          <div className="text-right text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {cert.progress}% Complete
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button
                          onClick={() => handleStartCertification(cert.id)}
                          className={`w-full ${
                            cert.completedQuizzes === cert.totalQuizzes
                              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
                              : `bg-gradient-to-r ${cert.gradient}`
                          } hover:shadow-lg transition-all duration-300 text-white font-semibold`}
                        >
                          {cert.completedQuizzes === 0 ? (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start Learning
                            </>
                          ) : cert.completedQuizzes === cert.totalQuizzes ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Continue
                            </>
                          )}
                        </Button>
                      </>
                    )}

                    {!cert.isUnlocked && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          onNavigate('pricing')
                        }}
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Unlock Now
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="group p-4 sm:p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onNavigate('pricing')}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <NestedCertsLogo className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-0.5 sm:mb-1">Unlock More</h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">View pricing plans</p>
                </div>
              </div>
            </Card>

            <Card className="group p-4 sm:p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onNavigate('certifications')}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-0.5 sm:mb-1">Browse Certs</h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">Explore all certifications</p>
                </div>
              </div>
            </Card>

            <Card className="group p-4 sm:p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onNavigate('help')}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-0.5 sm:mb-1">Get Help</h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">Visit help center</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
