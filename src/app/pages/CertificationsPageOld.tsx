import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  Target,
  Trophy,
  Star,
  Users,
  ArrowRight
} from 'lucide-react'

const CertificationsPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const certifications = {
    foundational: [
      {
        id: 'clf-c02',
        name: 'AWS Certified Cloud Practitioner',
        code: 'CLF-C02',
        description: 'Foundational understanding of AWS Cloud concepts, services, and terminology.',
        duration: 90,
        questions: 65,
        passingScore: 700,
        difficulty: 'Beginner',
        popular: true
      }
    ],
    associate: [
      {
        id: 'saa-c03',
        name: 'AWS Certified Solutions Architect',
        code: 'SAA-C03',
        description: 'Design and deploy scalable, highly available systems on AWS.',
        duration: 130,
        questions: 65,
        passingScore: 720,
        difficulty: 'Intermediate',
        popular: true
      },
      {
        id: 'soa-c02',
        name: 'AWS Certified SysOps Administrator',
        code: 'SOA-C02',
        description: 'Deploy, manage, and operate scalable systems on AWS.',
        duration: 130,
        questions: 65,
        passingScore: 720,
        difficulty: 'Intermediate'
      },
      {
        id: 'dva-c02',
        name: 'AWS Certified Developer',
        code: 'DVA-C02',
        description: 'Develop and maintain applications on the AWS platform.',
        duration: 130,
        questions: 65,
        passingScore: 720,
        difficulty: 'Intermediate'
      }
    ],
    professional: [
      {
        id: 'sap-c02',
        name: 'AWS Certified Solutions Architect Professional',
        code: 'SAP-C02',
        description: 'Advanced technical skills in designing distributed systems on AWS.',
        duration: 180,
        questions: 75,
        passingScore: 750,
        difficulty: 'Advanced'
      },
      {
        id: 'dop-c02',
        name: 'AWS Certified DevOps Engineer Professional',
        code: 'DOP-C02',
        description: 'Implement and manage continuous delivery systems on AWS.',
        duration: 180,
        questions: 75,
        passingScore: 750,
        difficulty: 'Advanced'
      }
    ],
    specialty: [
      {
        id: 'ans-c01',
        name: 'AWS Certified Advanced Networking',
        code: 'ANS-C01',
        description: 'Design and implement AWS and hybrid network architectures.',
        duration: 170,
        questions: 65,
        passingScore: 750,
        difficulty: 'Expert'
      },
      {
        id: 'scs-c02',
        name: 'AWS Certified Security',
        code: 'SCS-C02',
        description: 'Demonstrate expertise in securing AWS workloads.',
        duration: 170,
        questions: 65,
        passingScore: 750,
        difficulty: 'Expert'
      }
    ]
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const CertificationCard = ({ cert }: { cert: any }) => (
    <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{cert.name}</CardTitle>
              {cert.popular && <Badge variant="secondary">Popular</Badge>}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">{cert.code}</Badge>
              <Badge className={`text-xs ${getDifficultyColor(cert.difficulty)}`}>
                {cert.difficulty}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {cert.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{cert.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span>{cert.questions} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span>{cert.passingScore}/1000</span>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={() => onNavigate('exam-path')}
        >
          View Exam Path
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('landing')}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  NestedCerts
                </span>
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <span className="text-blue-600 font-medium">Certifications</span>
              <button 
                onClick={() => onNavigate('pricing')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => onNavigate('help')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Help
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
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
      </nav>

      {/* Header */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              AWS Certifications
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Choose your certification path and start your journey to AWS expertise. 
              Each certification includes a structured 30-day learning path with daily practice exams.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>95% pass rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-green-500" />
                <span>All levels covered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Foundational */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Foundational Level
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Perfect for beginners with no prior AWS experience
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.foundational.map(cert => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>

          {/* Associate */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Associate Level
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                For professionals with some AWS experience looking to validate their skills
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.associate.map(cert => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>

          {/* Professional */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Professional Level
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Advanced certifications for experienced AWS practitioners
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.professional.map(cert => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>

          {/* Specialty */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Specialty Level
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Specialized expertise in specific AWS domains
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.specialty.map(cert => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your certification journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get access to all certifications with our comprehensive study platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onNavigate('register')}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('pricing')} className="border-white text-white hover:bg-white hover:text-blue-600">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CertificationsPage
