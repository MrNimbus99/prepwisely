import React from 'react'
import { NavigationProps } from '../types'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  ArrowLeft, 
  Trophy,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Shield
} from 'lucide-react'

const StatusPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const services = [
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.9%',
      icon: Server,
      description: 'Core API and backend services'
    },
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.8%',
      icon: Globe,
      description: 'Main web application and user interface'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.9%',
      icon: Database,
      description: 'User data and exam content storage'
    },
    {
      name: 'Payment Processing',
      status: 'operational',
      uptime: '99.7%',
      icon: Shield,
      description: 'Stripe payment gateway integration'
    },
    {
      name: 'Email Delivery',
      status: 'operational',
      uptime: '99.5%',
      icon: Activity,
      description: 'Transactional and notification emails'
    }
  ]

  const incidents = [
    {
      date: 'Feb 1, 2026',
      title: 'Scheduled Maintenance - Database Optimization',
      status: 'resolved',
      duration: '2 hours',
      description: 'Performed routine database maintenance to improve performance.'
    },
    {
      date: 'Jan 28, 2026',
      title: 'Brief API Slowdown',
      status: 'resolved',
      duration: '15 minutes',
      description: 'Temporary slowdown in API responses due to high traffic. Resolved by scaling infrastructure.'
    },
    {
      date: 'Jan 25, 2026',
      title: 'Email Delivery Delay',
      status: 'resolved',
      duration: '45 minutes',
      description: 'Some users experienced delays in receiving verification emails. Issue resolved.'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 dark:text-green-400'
      case 'degraded':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'outage':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-slate-600 dark:text-slate-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
      case 'outage':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge variant="success">Operational</Badge>
      case 'degraded':
        return <Badge variant="warning">Degraded</Badge>
      case 'outage':
        return <Badge variant="destructive">Outage</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PrepWisely
              </span>
            </button>
            
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            System Status
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
            Current status of PrepWisely services and infrastructure
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span className="text-lg font-medium text-green-600 dark:text-green-400">
              All Systems Operational
            </span>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last updated: February 4, 2026 at 3:30 PM EST
          </p>
        </div>

        {/* Services Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Service Status
          </h2>
          
          <div className="space-y-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {service.uptime} uptime
                        </div>
                        <div className="text-xs text-slate-500">
                          Last 30 days
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Incidents */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Recent Incidents
          </h2>
          
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <Badge variant="secondary">Resolved</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                        <span>{incident.date}</span>
                        <span>Duration: {incident.duration}</span>
                      </div>
                      <CardDescription className="text-base">
                        {incident.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          {incidents.length === 0 && (
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <CardTitle className="text-xl text-green-600 dark:text-green-400">
                  No Recent Incidents
                </CardTitle>
                <CardDescription>
                  All systems have been running smoothly with no reported incidents in the past 30 days.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Subscribe to status updates or contact support if you're experiencing issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              Subscribe to Updates
            </Button>
            <Button onClick={() => onNavigate('contact-support')}>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusPage
