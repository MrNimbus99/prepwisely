import React, { useState } from 'react'
import { NavigationProps, PageName } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Header } from '../components/layout/Header'
import { Card, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Search, ChevronRight } from 'lucide-react'

const ArticlesPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const popularArticles = [
    { title: 'How does the 30-day learning path work?', category: 'Getting Started', views: '2.1k views', page: 'article-30day' as PageName },
    { title: 'What is the upgrade pricing system?', category: 'Billing', views: '1.8k views', page: 'article-upgrade' as PageName },
    { title: 'How to interpret my exam results?', category: 'Practice Exams', views: '1.5k views', page: 'article-results' as PageName },
    { title: 'Can I cancel my subscription anytime?', category: 'Billing', views: '1.2k views', page: 'article-cancel' as PageName },
    { title: 'How often are questions updated?', category: 'Practice Exams', views: '980 views', page: 'article-updates' as PageName },
    { title: 'AWS Certified Cloud Practitioner (CLF-C02) - 30-Day Learning Path', category: 'Foundational', views: '6.1k views', page: 'aws-certified-cloud-practitioner-clf-c02' as PageName },
    { title: 'AWS Certified AI Practitioner (AIF-C01) - 30-Day Learning Path', category: 'Foundational', views: '3.2k views', page: 'aws-certified-ai-practitioner-aif-c01' as PageName },
    { title: 'AWS Certified Solutions Architect – Associate (SAA-C03)', category: 'Associate', views: '5.8k views', page: 'aws-certified-solutions-architect-associate-saa-c03' as PageName },
    { title: 'AWS Certified Developer – Associate (DVA-C02)', category: 'Associate', views: '4.2k views', page: 'aws-certified-developer-associate-dva-c02' as PageName },
    { title: 'AWS Certified CloudOps Engineer – Associate (SOA-C03)', category: 'Associate', views: '3.5k views', page: 'aws-certified-cloudops-engineer-associate-soa-c03' as PageName },
    { title: 'AWS Certified Data Engineer – Associate (DEA-C01)', category: 'Associate', views: '4.1k views', page: 'aws-certified-data-engineer-associate-dea-c01' as PageName },
    { title: 'AWS Certified Machine Learning Engineer – Associate (MLA-C01)', category: 'Associate', views: '3.8k views', page: 'aws-certified-machine-learning-engineer-associate-mla-c01' as PageName },
    { title: 'AWS Certified Solutions Architect – Professional (SAP-C02)', category: 'Professional', views: '4.5k views', page: 'aws-certified-solutions-architect-professional-sap-c02' as PageName },
    { title: 'AWS Certified DevOps Engineer – Professional (DOP-C02)', category: 'Professional', views: '3.9k views', page: 'aws-certified-devops-engineer-professional-dop-c02' as PageName },
    { title: 'AWS Certified Generative AI Developer – Professional (AIP-C01)', category: 'Professional', views: '2.8k views', page: 'aws-certified-generative-ai-developer-professional-aip-c01' as PageName },
    { title: 'AWS Certified Security – Specialty (SCS-C03)', category: 'Specialty', views: '3.6k views', page: 'aws-certified-security-specialty-scs-c03' as PageName },
    { title: 'AWS Certified Machine Learning – Specialty (MLS-C01)', category: 'Specialty', views: '3.4k views', page: 'aws-certified-machine-learning-specialty-mls-c01' as PageName },
    { title: 'AWS Certified Advanced Networking – Specialty (ANS-C01)', category: 'Specialty', views: '2.9k views', page: 'aws-certified-advanced-networking-specialty-ans-c01' as PageName }
  ]

  useSEO({
    title: 'Articles - AWS Certification Exam Prep Guides | NestedCerts',
    description: 'Browse helpful articles about AWS certification exam preparation, study tips, and platform features.',
    keywords: 'AWS certification articles, exam prep guides, study tips, certification help',
    canonical: 'https://nestedcerts.com/articles'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Header onNavigate={onNavigate} />

      <section className="py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Popular Articles
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 mb-8">
              Find helpful guides and answers to common questions
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <Card 
                key={index} 
                onClick={() => onNavigate(article.page)}
                className="group bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline" className="text-slate-700 dark:text-slate-100 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
                        {article.category}
                      </Badge>
                      <span className="text-slate-600 dark:text-slate-200 font-medium">{article.views}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArticlesPage
