import React from 'react'
import { NavigationProps } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Header } from '../components/layout/Header'
import { certifications } from '../data/certifications'
import { getBadgeUrl } from '../data/certBadges'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Check, Crown, Calendar, Infinity } from 'lucide-react'

const PricingPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  useSEO({
    title: 'Pricing Plans - AWS Certification Exam Prep | NestedCerts',
    description: 'Choose the perfect plan for your AWS certification journey. Free trial available. Flexible pricing for individuals and teams. Access practice tests, analytics, and study materials for all AWS certifications.',
    keywords: 'AWS certification pricing, AWS exam prep cost, AWS practice test subscription, AWS certification plans, affordable AWS training',
    canonical: 'https://nestedcerts.com/pricing'
  })
  
  const foundationalCerts = certifications.filter(cert => cert.level === 'Foundational')
  const associateCerts = certifications.filter(cert => cert.level === 'Associate')
  const professionalCerts = certifications.filter(cert => cert.level === 'Professional')
  const specialtyCerts = certifications.filter(cert => cert.level === 'Specialty')

  const BundleCard = ({ title, price, originalPrice, certs, gradient }: { title: string, price: number, originalPrice: number, certs: typeof certifications, gradient: string }) => (
    <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-yellow-500 dark:border-yellow-500 p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <Badge className="absolute top-4 right-4 bg-yellow-500 text-white font-bold">BUNDLE</Badge>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
      <div className="relative">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title} Bundle</h3>
        <div className="mb-4">
          <div className="text-sm text-slate-500 dark:text-slate-400 line-through">${originalPrice}</div>
          <div className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">${price}</div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold mt-2">Save ${originalPrice - price}</Badge>
        </div>
        <div className="space-y-2 mb-6 text-left">
          {certs.filter(c => !c.isFree).map(cert => (
            <div key={cert.id} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{cert.name}</span>
            </div>
          ))}
        </div>
        <Button className={`w-full bg-gradient-to-r ${gradient} text-white font-semibold`} onClick={() => onNavigate('register')}>
          Get Bundle
        </Button>
      </div>
    </Card>
  )

  const CertificationCard = ({ cert, showPrice = true }: { cert: typeof certifications[0], showPrice?: boolean }) => {
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
      <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white dark:bg-slate-900 ${colors.border} border-2`}>
        {/* Subtle gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Level badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`${colors.badge} font-semibold text-xs px-2 py-1`}>
            {cert.level}
          </Badge>
        </div>

        <div className="relative p-6">
          {/* Badge Image */}
          <div className="w-24 h-24 mb-4 flex items-center justify-center">
            <img 
              src={getBadgeUrl(cert.code)} 
              alt={`${cert.name} badge`}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 transition-colors">
                {cert.name}
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {cert.description}
              </p>
            </div>

            {/* Exam details */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={`text-xs ${colors.icon} border-current font-medium`}>
                {cert.code}
              </Badge>
              <Badge variant="outline" className="text-xs text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
                {cert.examDetails.duration} min
              </Badge>
              <Badge variant="outline" className="text-xs text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
                {cert.examDetails.questions} questions
              </Badge>
            </div>

            {/* Price */}
            {showPrice && (
              <div className="flex items-center justify-between pt-2">
                <div>
                  {cert.isFree ? (
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      FREE
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 line-through">$20</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        $10
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-bold">50% OFF</Badge>
                    </div>
                  )}
                </div>
                <Button 
                  className={`bg-gradient-to-r ${colors.gradient} hover:shadow-lg transition-all duration-200 text-white font-semibold`}
                  onClick={() => onNavigate('register')}
                >
                  {cert.isFree ? 'Start Free' : 'Get Started'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Header onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            AWS Certification Pricing
          </h1>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Start with Cloud Practitioner for free. Choose individual certifications or subscriptions.
          </p>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-10 sm:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Subscription Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Monthly */}
            <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Monthly</h3>
                <div className="mb-6">
                  <div className="text-sm text-slate-500 dark:text-slate-400 line-through">$40/month</div>
                  <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">$20<span className="text-xl text-slate-600 dark:text-slate-400">/mo</span></div>
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 font-bold">50% OFF</Badge>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">All 13 certifications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Cancel anytime</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">All study tools</span>
                  </li>
                </ul>
                <Button className="w-full py-4 text-lg font-bold bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-xl transition-all duration-300" onClick={() => onNavigate('register')}>
                  Start Monthly
                </Button>
              </div>
            </Card>

            {/* Annual */}
            <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-3 border-blue-500 dark:border-blue-500 p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Badge className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-1.5 shadow-lg whitespace-nowrap">
                BEST VALUE
              </Badge>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Infinity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Annual</h3>
                <div className="mb-6">
                  <div className="text-sm text-slate-500 dark:text-slate-400 line-through">$140/year</div>
                  <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">$70<span className="text-xl text-slate-600 dark:text-slate-400">/yr</span></div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold">50% OFF</Badge>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">All 13 certifications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Save 6+ months</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl transition-all duration-300" onClick={() => onNavigate('register')}>
                  Start Annual
                </Button>
              </div>
            </Card>

            {/* Lifetime */}
            <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-purple-500 dark:border-purple-500 p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Lifetime</h3>
                <div className="mb-6">
                  <div className="text-sm text-slate-500 dark:text-slate-400 line-through">$200</div>
                  <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">$100</div>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 font-bold">50% OFF</Badge>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">All 13 certifications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Lifetime access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Future updates</span>
                  </li>
                </ul>
                <Button className="w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-xl transition-all duration-300" onClick={() => onNavigate('register')}>
                  Buy Lifetime
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Individual Certifications */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
            Individual Certifications
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12">
            Purchase individual certifications at $10 each (50% off)
          </p>
          
          {/* Foundational */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Foundational</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundationalCerts.map(cert => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>

          {/* Associate */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Associate</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {associateCerts.map(cert => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
              <BundleCard title="Associate" price={40} originalPrice={100} certs={associateCerts} gradient="from-blue-500 to-indigo-600" />
            </div>
          </div>

          {/* Professional */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Professional</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalCerts.map(cert => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
              <BundleCard title="Professional" price={25} originalPrice={60} certs={professionalCerts} gradient="from-rose-500 to-red-600" />
            </div>
          </div>

          {/* Specialty */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Specialty</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialtyCerts.map(cert => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
              <BundleCard title="Specialty" price={25} originalPrice={60} certs={specialtyCerts} gradient="from-emerald-500 to-green-600" />
            </div>
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
                <li><button onClick={() => onNavigate('faq')} className="hover:text-white">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('terms')} className="hover:text-white">Terms</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-white">Privacy</button></li>
                <li><button onClick={() => onNavigate('refund-policy')} className="hover:text-white">Refund Policy</button></li>
                <li><button onClick={() => onNavigate('cancellation-policy')} className="hover:text-white">Cancellation</button></li>
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

export default PricingPage
