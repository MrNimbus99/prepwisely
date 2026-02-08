import React, { useState } from 'react'
import { NavigationProps, PageName } from '../types'
import { useSEO } from '../hooks/useSEO'
import { Header } from '../components/layout/Header'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Search, BookOpen, TrendingUp, Award, DollarSign, HelpCircle, Sparkles } from 'lucide-react'

const ArticlesPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { name: 'Getting Started', icon: Sparkles, color: 'blue', count: 2 },
    { name: 'Foundational', icon: BookOpen, color: 'green', count: 2 },
    { name: 'Associate', icon: Award, color: 'purple', count: 5 },
    { name: 'Professional', icon: TrendingUp, color: 'orange', count: 3 },
    { name: 'Specialty', icon: Award, color: 'red', count: 3 },
    { name: 'Billing', icon: DollarSign, color: 'emerald', count: 2 },
    { name: 'Practice Exams', icon: HelpCircle, color: 'indigo', count: 3 }
  ]

  const articles = [
    { title: 'How does the 30-day learning path work?', category: 'Getting Started', views: '2.1k', readTime: '3 min', page: 'article-30day' as PageName },
    { title: 'What is the upgrade pricing system?', category: 'Billing', views: '1.8k', readTime: '2 min', page: 'article-upgrade' as PageName },
    { title: 'How to interpret my exam results?', category: 'Practice Exams', views: '1.5k', readTime: '4 min', page: 'article-results' as PageName },
    { title: 'Can I cancel my subscription anytime?', category: 'Billing', views: '1.2k', readTime: '2 min', page: 'article-cancel' as PageName },
    { title: 'How often are questions updated?', category: 'Practice Exams', views: '980', readTime: '3 min', page: 'article-updates' as PageName },
    { title: 'AWS Certified Cloud Practitioner (CLF-C02)', category: 'Foundational', views: '6.1k', readTime: '8 min', page: 'aws-certified-cloud-practitioner-clf-c02' as PageName },
    { title: 'AWS Certified AI Practitioner (AIF-C01)', category: 'Foundational', views: '3.2k', readTime: '8 min', page: 'aws-certified-ai-practitioner-aif-c01' as PageName },
    { title: 'AWS Solutions Architect – Associate (SAA-C03)', category: 'Associate', views: '5.8k', readTime: '10 min', page: 'aws-certified-solutions-architect-associate-saa-c03' as PageName },
    { title: 'AWS Developer – Associate (DVA-C02)', category: 'Associate', views: '4.2k', readTime: '9 min', page: 'aws-certified-developer-associate-dva-c02' as PageName },
    { title: 'AWS CloudOps Engineer – Associate (SOA-C03)', category: 'Associate', views: '3.5k', readTime: '9 min', page: 'aws-certified-cloudops-engineer-associate-soa-c03' as PageName },
    { title: 'AWS Data Engineer – Associate (DEA-C01)', category: 'Associate', views: '4.1k', readTime: '9 min', page: 'aws-certified-data-engineer-associate-dea-c01' as PageName },
    { title: 'AWS ML Engineer – Associate (MLA-C01)', category: 'Associate', views: '3.8k', readTime: '9 min', page: 'aws-certified-machine-learning-engineer-associate-mla-c01' as PageName },
    { title: 'AWS Solutions Architect – Professional (SAP-C02)', category: 'Professional', views: '4.5k', readTime: '12 min', page: 'aws-certified-solutions-architect-professional-sap-c02' as PageName },
    { title: 'AWS DevOps Engineer – Professional (DOP-C02)', category: 'Professional', views: '3.9k', readTime: '11 min', page: 'aws-certified-devops-engineer-professional-dop-c02' as PageName },
    { title: 'AWS GenAI Developer – Professional (AIP-C01)', category: 'Professional', views: '2.8k', readTime: '11 min', page: 'aws-certified-generative-ai-developer-professional-aip-c01' as PageName },
    { title: 'AWS Security – Specialty (SCS-C03)', category: 'Specialty', views: '3.6k', readTime: '10 min', page: 'aws-certified-security-specialty-scs-c03' as PageName },
    { title: 'AWS Machine Learning – Specialty (MLS-C01)', category: 'Specialty', views: '3.4k', readTime: '10 min', page: 'aws-certified-machine-learning-specialty-mls-c01' as PageName },
    { title: 'AWS Advanced Networking – Specialty (ANS-C01)', category: 'Specialty', views: '2.9k', readTime: '10 min', page: 'aws-certified-advanced-networking-specialty-ans-c01' as PageName }
  ]

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category)
    return cat?.color || 'slate'
  }

  useSEO({
    title: 'Articles - AWS Certification Exam Prep Guides | NestedCerts',
    description: 'Browse helpful articles about AWS certification exam preparation, study tips, and platform features.',
    keywords: 'AWS certification articles, exam prep guides, study tips, certification help',
    canonical: 'https://nestedcerts.com/articles'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Header onNavigate={onNavigate} />

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Knowledge Base</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              AWS Certification Guides
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need to know about preparing for AWS certifications
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, certifications, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg transition-all"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.name}
                  onClick={() => setSearchQuery(cat.name)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all hover:scale-105 ${
                    searchQuery === cat.name
                      ? `bg-${cat.color}-500 border-${cat.color}-500 text-white`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{cat.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">{cat.count}</Badge>
                </button>
              )
            })}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <Card
                key={index}
                onClick={() => onNavigate(article.page)}
                className="group relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${getCategoryColor(article.category)}-400 to-${getCategoryColor(article.category)}-600`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      variant="secondary" 
                      className={`bg-${getCategoryColor(article.category)}-100 dark:bg-${getCategoryColor(article.category)}-900/30 text-${getCategoryColor(article.category)}-700 dark:text-${getCategoryColor(article.category)}-400 border-0`}
                    >
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <BookOpen className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{article.views} views</span>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or browse all categories</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ArticlesPage
