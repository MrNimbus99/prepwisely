import React from 'react'
import { NavigationProps } from '../types'
import { certifications } from '../data/certifications'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Check, Crown, Calendar, Infinity } from 'lucide-react'

const PricingPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const foundationalCerts = certifications.filter(cert => cert.level === 'Foundational')
  const associateCerts = certifications.filter(cert => cert.level === 'Associate')
  const professionalCerts = certifications.filter(cert => cert.level === 'Professional')
  const specialtyCerts = certifications.filter(cert => cert.level === 'Specialty')

  const getBundlePrice = (certs: typeof certifications) => {
    const paidCerts = certs.filter(cert => !cert.isFree)
    return paidCerts.length * 49
  }

  const getBundleDiscount = (certs: typeof certifications) => {
    const originalPrice = getBundlePrice(certs)
    const bundlePrice = Math.floor(originalPrice * 0.7) // 30% discount
    return { originalPrice, bundlePrice }
  }

  const CertificationCard = ({ cert, showPrice = true }: { cert: typeof certifications[0], showPrice?: boolean }) => (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
            {cert.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            {cert.description}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">
              {cert.code}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {cert.examDetails.duration} min
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {cert.examDetails.questions} questions
            </Badge>
          </div>
        </div>
        {showPrice && (
          <div className="text-right ml-4">
            {cert.isFree ? (
              <div className="text-2xl font-bold text-green-600">FREE</div>
            ) : (
              <div className="text-2xl font-bold text-slate-900 dark:text-white">${cert.price}</div>
            )}
          </div>
        )}
      </div>
      <Button 
        className="w-full" 
        variant={cert.isFree ? "default" : "outline"}
        onClick={() => onNavigate('register')}
      >
        {cert.isFree ? 'Start Free' : 'Get Started'}
      </Button>
    </Card>
  )

  const BundleCard = ({ title, certs, level }: { title: string, certs: typeof certifications, level: string }) => {
    const { originalPrice, bundlePrice } = getBundleDiscount(certs)
    const paidCerts = certs.filter(cert => !cert.isFree)
    
    if (paidCerts.length === 0) return null

    return (
      <Card className="p-6 border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <div className="text-center mb-4">
          <Crown className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">
            {title} Bundle
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            All {level} certifications together
          </p>
          <div className="mb-4">
            <div className="text-sm text-slate-500 line-through">${originalPrice}</div>
            <div className="text-3xl font-bold text-blue-600">${bundlePrice}</div>
            <div className="text-sm text-green-600 font-medium">Save ${originalPrice - bundlePrice}</div>
          </div>
        </div>
        <ul className="space-y-2 mb-6 text-sm">
          {paidCerts.map(cert => (
            <li key={cert.id} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>{cert.name}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={() => onNavigate('register')}>
          Get Bundle
        </Button>
      </Card>
    )
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
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                Certifications
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className="text-blue-600 dark:text-blue-400 font-medium"
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            AWS Certification
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Start with Cloud Practitioner for free. Choose individual certifications or save with bundles.
          </p>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Subscription Plans
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly */}
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Monthly</h3>
              <div className="mb-4">
                <div className="text-sm text-slate-500 line-through">$39/month</div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white">$20<span className="text-lg">/month</span></div>
                <Badge className="mt-2">48% OFF</Badge>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Access to all certifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>All study tools & analytics</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => onNavigate('register')}>
                Start Monthly
              </Button>
            </Card>

            {/* Annual */}
            <Card className="p-8 text-center border-2 border-blue-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                BEST VALUE
              </Badge>
              <Infinity className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Annual</h3>
              <div className="mb-4">
                <div className="text-sm text-slate-500 line-through">$468/year</div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white">$180<span className="text-lg">/year</span></div>
                <Badge className="mt-2">Save $288</Badge>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Access to all certifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Save 2+ months vs monthly</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => onNavigate('register')}>
                Start Annual
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Foundational Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Foundational Certifications
            </h2>
            <div className="text-right">
              <div className="text-sm text-slate-600 dark:text-slate-400">Bundle Price</div>
              <div className="text-2xl font-bold text-blue-600">$35</div>
              <div className="text-sm text-slate-500 line-through">$49</div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {foundationalCerts.map(cert => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
            <BundleCard title="Foundational" certs={foundationalCerts} level="foundational" />
          </div>
        </div>
      </section>

      {/* Associate Certifications */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Associate Certifications
            </h2>
            <div className="text-right">
              <div className="text-sm text-slate-600 dark:text-slate-400">Bundle Price</div>
              <div className="text-2xl font-bold text-blue-600">$103</div>
              <div className="text-sm text-slate-500 line-through">$147</div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {associateCerts.map(cert => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
            <BundleCard title="Associate" certs={associateCerts} level="associate" />
          </div>
        </div>
      </section>

      {/* Professional Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Professional Certifications
            </h2>
            <div className="text-right">
              <div className="text-sm text-slate-600 dark:text-slate-400">Bundle Price</div>
              <div className="text-2xl font-bold text-blue-600">$69</div>
              <div className="text-sm text-slate-500 line-through">$98</div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {professionalCerts.map(cert => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
            <BundleCard title="Professional" certs={professionalCerts} level="professional" />
          </div>
        </div>
      </section>

      {/* Specialty Certifications */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Specialty Certifications
            </h2>
            <div className="text-right">
              <div className="text-sm text-slate-600 dark:text-slate-400">Bundle Price</div>
              <div className="text-2xl font-bold text-blue-600">$207</div>
              <div className="text-sm text-slate-500 line-through">$294</div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {specialtyCerts.map(cert => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
            <div className="lg:col-span-2 xl:col-span-1">
              <BundleCard title="Specialty" certs={specialtyCerts} level="specialty" />
            </div>
          </div>
        </div>
      </section>

      {/* Everything Pass */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Crown className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything Pass
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get lifetime access to all current and future AWS certifications
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <div className="text-blue-100 text-lg line-through mb-2">$637 individual price</div>
            <div className="text-5xl font-bold text-white mb-2">$299</div>
            <div className="text-green-300 font-medium">Save $338 (53% OFF)</div>
          </div>
          <Button size="lg" variant="secondary" onClick={() => onNavigate('register')}>
            Get Everything Pass
          </Button>
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

export default PricingPage
