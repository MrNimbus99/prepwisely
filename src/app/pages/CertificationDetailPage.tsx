import React, { useEffect, useState } from 'react'
import { NavigationProps } from '../types'
import { useQuiz } from '../contexts/QuizContext'
import { useFlaggedQuestions } from '../contexts/FlaggedQuestionsContext'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, Trophy, CheckCircle, Lock, Play, Clock, Flag, X } from 'lucide-react'

interface Quiz {
  id: number
  title: string
  questions: number
  duration: number
  isCompleted: boolean
  score?: number
  isLocked: boolean
  isFinalExam?: boolean
}

const CertificationDetailPage: React.FC<NavigationProps & { certId: string }> = ({ onNavigate, certId }) => {
  const { completions } = useQuiz()
  const { getFlaggedByCert, removeFlagged } = useFlaggedQuestions()
  const [quizCounts, setQuizCounts] = useState<{ [key: string]: number }>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'quizzes' | 'flagged'>('quizzes')

  // Quiz metadata for Cloud Practitioner
  const clfQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Cloud Concepts", task: "Task 1.1: AWS Cloud benefits" },
    2: { domain: "Cloud Concepts", task: "Task 1.2: Well-Architected pillars" },
    3: { domain: "Cloud Concepts", task: "Task 1.3: CAF + migration strategies" },
    4: { domain: "Cloud Concepts", task: "Task 1.4: Cloud economics" },
    5: { domain: "Cloud Concepts", task: "Domain 1 Review" },
    6: { domain: "Security & Compliance", task: "Task 2.1: Shared responsibility" },
    7: { domain: "Security & Compliance", task: "Task 2.2: Compliance & governance" },
    8: { domain: "Security & Compliance", task: "Task 2.3: IAM & access management" },
    9: { domain: "Security & Compliance", task: "Task 2.4: Security services" },
    10: { domain: "Security & Compliance", task: "Domain 2 Review" },
    11: { domain: "Technology & Services", task: "Task 3.1: Deployment methods" },
    12: { domain: "Technology & Services", task: "Task 3.2: Global infrastructure" },
    13: { domain: "Technology & Services", task: "Task 3.3: Compute services" },
    14: { domain: "Technology & Services", task: "Task 3.4: Database services" },
    15: { domain: "Technology & Services", task: "Task 3.5: Network services" },
    16: { domain: "Technology & Services", task: "Task 3.6: Storage services" },
    17: { domain: "Technology & Services", task: "Task 3.7: AI/ML & analytics" },
    18: { domain: "Technology & Services", task: "Task 3.8: Integration services" },
    19: { domain: "Technology & Services", task: "Domain 3 Review" },
    20: { domain: "Billing & Pricing", task: "Task 4.1: Pricing models" },
    21: { domain: "Billing & Pricing", task: "Task 4.2: Cost management tools" },
    22: { domain: "Billing & Pricing", task: "Task 4.3: Support resources" },
    23: { domain: "Mixed Review", task: "Billing + Architecture" },
    24: { domain: "Mixed Review", task: "Security + Operations" },
    25: { domain: "Mixed Review", task: "Migration + Global infra" },
    26: { domain: "Mixed Review", task: "App building capstone" },
    27: { domain: "Mixed Review", task: "Observability capstone" },
    28: { domain: "Mixed Review", task: "Domains 1–2 Review" },
    29: { domain: "Mixed Review", task: "Domains 3–4 Review" },
    30: { domain: "Mixed Review", task: "Final Review (Domains 1–4)" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for SysOps Administrator
  const soaQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Monitoring & Reporting", task: "Task 1.1: Setup & alarms" },
    2: { domain: "Monitoring & Reporting", task: "Task 1.1: Dashboards & notifications" },
    3: { domain: "Monitoring & Reporting", task: "Task 1.2: Remediation automation" },
    4: { domain: "Monitoring & Reporting", task: "Task 1.2: EventBridge & SSM" },
    5: { domain: "Monitoring & Reporting", task: "Task 1.3: Compute & EBS optimization" },
    6: { domain: "Monitoring & Reporting", task: "Task 1.3: Storage & DB optimization" },
    7: { domain: "Monitoring & Reporting", task: "Domain 1 Review" },
    8: { domain: "Reliability & Continuity", task: "Task 2.1: Scaling & caching" },
    9: { domain: "Reliability & Continuity", task: "Task 2.2: ELB & health checks" },
    10: { domain: "Reliability & Continuity", task: "Task 2.3: Backup & snapshots" },
    11: { domain: "Reliability & Continuity", task: "Task 2.3: PITR & DR" },
    12: { domain: "Reliability & Continuity", task: "Domain 2 Review" },
    13: { domain: "Deployment & Provisioning", task: "Task 3.1: AMIs & IaC" },
    14: { domain: "Deployment & Provisioning", task: "Task 3.1: StackSets & cross-account" },
    15: { domain: "Deployment & Provisioning", task: "Task 3.1: Deployment strategies" },
    16: { domain: "Deployment & Provisioning", task: "Task 3.2: SSM automation" },
    17: { domain: "Deployment & Provisioning", task: "Task 3.2: Event-driven automation" },
    18: { domain: "Deployment & Provisioning", task: "Domain 3 Review" },
    19: { domain: "Security & Compliance", task: "Task 4.1: IAM & access" },
    20: { domain: "Security & Compliance", task: "Task 4.1: Audit & multi-account" },
    21: { domain: "Security & Compliance", task: "Task 4.2: Encryption at rest" },
    22: { domain: "Security & Compliance", task: "Task 4.2: Secrets & security services" },
    23: { domain: "Security & Compliance", task: "Domain 4 Review" },
    24: { domain: "Networking & Content", task: "Task 5.1: VPC components" },
    25: { domain: "Networking & Content", task: "Task 5.1: Private connectivity & security" },
    26: { domain: "Networking & Content", task: "Task 5.2: Route 53 & DNS" },
    27: { domain: "Networking & Content", task: "Task 5.2: CloudFront & Global Accelerator" },
    28: { domain: "Networking & Content", task: "Task 5.3: VPC troubleshooting" },
    29: { domain: "Networking & Content", task: "Task 5.3: Hybrid connectivity" },
    30: { domain: "Mixed Review (All Domains)", task: "Final Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for Developer Associate
  const dvaQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Development with AWS", task: "Task 1: App patterns & coupling" },
    2: { domain: "Development with AWS", task: "Task 1: Resilience & APIs" },
    3: { domain: "Development with AWS", task: "Task 1: Streaming & EventBridge" },
    4: { domain: "Development with AWS", task: "Task 2: Lambda VPC & config" },
    5: { domain: "Development with AWS", task: "Task 2: Lambda testing & tuning" },
    6: { domain: "Development with AWS", task: "Task 3: Data stores & DynamoDB" },
    7: { domain: "Development with AWS", task: "Task 3: Caching & OpenSearch" },
    8: { domain: "Development with AWS", task: "Domain 1 Review" },
    9: { domain: "Security", task: "Task 1: AuthN/AuthZ & federation" },
    10: { domain: "Security", task: "Task 1: Roles & permissions" },
    11: { domain: "Security", task: "Task 2: Encryption basics" },
    12: { domain: "Security", task: "Task 2: KMS & key rotation" },
    13: { domain: "Security", task: "Task 3: Sensitive data protection" },
    14: { domain: "Security", task: "Task 3: Sanitization & multi-tenant" },
    15: { domain: "Security", task: "Domain 2 Review" },
    16: { domain: "Deployment", task: "Task 1: Artifacts & repos" },
    17: { domain: "Deployment", task: "Task 2: Testing strategies" },
    18: { domain: "Deployment", task: "Task 3: Automate testing" },
    19: { domain: "Deployment", task: "Task 4: CI/CD basics" },
    20: { domain: "Deployment", task: "Task 4: Deployment strategies" },
    21: { domain: "Troubleshooting", task: "Task 1: Root cause analysis" },
    22: { domain: "Troubleshooting", task: "Task 2: Observability" },
    23: { domain: "Troubleshooting", task: "Task 3: Optimization" },
    24: { domain: "Troubleshooting", task: "Domain 4 Review" },
    25: { domain: "Development with AWS", task: "API & Integration focus" },
    26: { domain: "Development with AWS", task: "Data & Streaming focus" },
    27: { domain: "Deployment", task: "CI/CD & IaC focus" },
    28: { domain: "Security", task: "Security services focus" },
    29: { domain: "Troubleshooting", task: "Observability focus" },
    30: { domain: "Mixed Review", task: "Final Review (All Domains)" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for ML Specialty
  const mlsQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Data Engineering", task: "Task 1.1: Data repositories" },
    2: { domain: "Data Engineering", task: "Task 1.2: Batch vs streaming" },
    3: { domain: "Data Engineering", task: "Task 1.3: ETL & MapReduce" },
    4: { domain: "Data Engineering", task: "Domain 1 Review" },
    5: { domain: "Exploratory Data Analysis", task: "Task 2.1: Data sanitization" },
    6: { domain: "Exploratory Data Analysis", task: "Task 2.2: Feature engineering" },
    7: { domain: "Exploratory Data Analysis", task: "Task 2.3: Visualization & stats" },
    8: { domain: "Exploratory Data Analysis", task: "Domain 2 Review" },
    9: { domain: "Modeling", task: "Task 3.1: Frame business problems" },
    10: { domain: "Modeling", task: "Task 3.2: Model selection" },
    11: { domain: "Modeling", task: "Task 3.3: Training workflow" },
    12: { domain: "Modeling", task: "Task 3.4: HPO & tuning" },
    13: { domain: "Modeling", task: "Task 3.5: Evaluation metrics" },
    14: { domain: "Modeling", task: "Domain 3 Review" },
    15: { domain: "Implementation & Operations", task: "Task 4.1: Resilience & performance" },
    16: { domain: "Implementation & Operations", task: "Task 4.2: Managed ML services" },
    17: { domain: "Implementation & Operations", task: "Task 4.3: Security basics" },
    18: { domain: "Implementation & Operations", task: "Task 4.4: Deploy & monitor" },
    19: { domain: "Implementation & Operations", task: "Domain 4 Review" },
    20: { domain: "Data Engineering", task: "Streaming pipelines" },
    21: { domain: "Data Engineering", task: "Data lake & governance" },
    22: { domain: "Exploratory Data Analysis", task: "Search & analytics" },
    23: { domain: "Exploratory Data Analysis", task: "Document & vision" },
    24: { domain: "Modeling", task: "Forecasting & fraud" },
    25: { domain: "Modeling", task: "LLM & FM integration" },
    26: { domain: "Implementation & Operations", task: "Training infrastructure" },
    27: { domain: "Implementation & Operations", task: "Containerized ML" },
    28: { domain: "Implementation & Operations", task: "Edge ML scenarios" },
    29: { domain: "Implementation & Operations", task: "Observability & audit" },
    30: { domain: "Mixed Review (Domains 1–4)", task: "Final Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for Solutions Architect Associate
  const saaQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Secure Architectures", task: "Task 1.1: Secure access" },
    2: { domain: "Secure Architectures", task: "Task 1.2: Secure workloads" },
    3: { domain: "Secure Architectures", task: "Task 1.3: Data security" },
    4: { domain: "Secure Architectures", task: "Domain 1 Review" },
    5: { domain: "Resilient Architectures", task: "Task 2.1: Scalable & loosely coupled" },
    6: { domain: "Resilient Architectures", task: "Task 2.2: HA/FT & DR" },
    7: { domain: "Resilient Architectures", task: "Domain 2 Review" },
    8: { domain: "High-Performing", task: "Task 3.1: Storage performance" },
    9: { domain: "High-Performing", task: "Task 3.2: Compute performance" },
    10: { domain: "High-Performing", task: "Task 3.3: Database performance" },
    11: { domain: "High-Performing", task: "Task 3.4: Network performance" },
    12: { domain: "High-Performing", task: "Task 3.5: Data ingestion" },
    13: { domain: "High-Performing", task: "Domain 3 Review" },
    14: { domain: "Cost-Optimized", task: "Task 4.1: Storage cost" },
    15: { domain: "Cost-Optimized", task: "Task 4.2: Compute cost" },
    16: { domain: "Cost-Optimized", task: "Task 4.3: Database cost" },
    17: { domain: "Cost-Optimized", task: "Task 4.4: Network cost" },
    18: { domain: "Cost-Optimized", task: "Domain 4 Review" },
    19: { domain: "High-Performing", task: "Analytics focus" },
    20: { domain: "Resilient Architectures", task: "Application Integration" },
    21: { domain: "High-Performing", task: "Compute focus" },
    22: { domain: "Resilient Architectures", task: "Containers focus" },
    23: { domain: "High-Performing", task: "Database focus" },
    24: { domain: "Resilient Architectures", task: "Management & Observability" },
    25: { domain: "Secure Architectures", task: "Security services" },
    26: { domain: "Cost-Optimized", task: "Migration & Transfer" },
    27: { domain: "Resilient Architectures", task: "Front-End & API" },
    28: { domain: "Resilient Architectures", task: "ML Services awareness" },
    29: { domain: "Mixed Review (Domains 1–2)", task: "Domains 1–2 Review" },
    30: { domain: "Mixed Review (Domains 3–4)", task: "Domains 3–4 Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for AI Practitioner
  const aifQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "AI & ML Fundamentals", task: "Task 1.1: AI concepts" },
    2: { domain: "AI & ML Fundamentals", task: "Task 1.2: AI use cases" },
    3: { domain: "AI & ML Fundamentals", task: "Task 1.3: ML lifecycle" },
    4: { domain: "AI & ML Fundamentals", task: "Domain 1 Review" },
    5: { domain: "GenAI Fundamentals", task: "Task 2.1: GenAI concepts" },
    6: { domain: "GenAI Fundamentals", task: "Task 2.2: GenAI capabilities" },
    7: { domain: "GenAI Fundamentals", task: "Task 2.3: AWS GenAI infrastructure" },
    8: { domain: "GenAI Fundamentals", task: "Domain 2 Review" },
    9: { domain: "Foundation Models", task: "Task 3.1: FM design considerations" },
    10: { domain: "Foundation Models", task: "Task 3.2: Prompt engineering" },
    11: { domain: "Foundation Models", task: "Task 3.3: Training & fine-tuning" },
    12: { domain: "Foundation Models", task: "Task 3.4: FM evaluation" },
    13: { domain: "Foundation Models", task: "Domain 3 Review" },
    14: { domain: "Responsible AI", task: "Task 4.1: Responsible development" },
    15: { domain: "Responsible AI", task: "Task 4.2: Transparency & explainability" },
    16: { domain: "Responsible AI", task: "Domain 4 Review" },
    17: { domain: "Security & Governance", task: "Task 5.1: Secure AI systems" },
    18: { domain: "Security & Governance", task: "Task 5.2: Governance & compliance" },
    19: { domain: "Security & Governance", task: "Domain 5 Review" },
    20: { domain: "Foundation Models", task: "Machine Learning services" },
    21: { domain: "Security & Governance", task: "Security services" },
    22: { domain: "AI & ML Fundamentals", task: "Analytics services" },
    23: { domain: "Foundation Models", task: "Database & vector storage" },
    24: { domain: "Security & Governance", task: "Management & Governance" },
    25: { domain: "AI & ML Fundamentals", task: "Storage services" },
    26: { domain: "Foundation Models", task: "Networking & Content Delivery" },
    27: { domain: "AI & ML Fundamentals", task: "Cloud Financial Management" },
    28: { domain: "Foundation Models", task: "Compute & Containers" },
    29: { domain: "Mixed Review (Domains 1–3)", task: "Domains 1–3 Review" },
    30: { domain: "Mixed Review (Domains 4–5)", task: "Domains 4–5 Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  const getQuizMetadata = (quizId: number) => {
    if (certId === 'cloud-practitioner') return clfQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'sysops-administrator-associate') return soaQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'developer-associate') return dvaQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'machine-learning-specialty') return mlsQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'solutions-architect-associate') return saaQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'ai-practitioner') return aifQuizMetadata[quizId] || { domain: "", task: "" }
    return { domain: "", task: "" }
  }

  // Certification data
  const certifications: { [key: string]: { name: string; code: string; gradient: string } } = {
    // Foundational (2)
    'cloud-practitioner': {
      name: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      gradient: 'from-green-500 to-emerald-600'
    },
    'ai-practitioner': {
      name: 'AWS Certified AI Practitioner',
      code: 'AIF-C01',
      gradient: 'from-violet-500 to-purple-600'
    },
    // Associate (5)
    'solutions-architect-associate': {
      name: 'AWS Certified Solutions Architect – Associate',
      code: 'SAA-C03',
      gradient: 'from-blue-500 to-indigo-600'
    },
    'developer-associate': {
      name: 'AWS Certified Developer – Associate',
      code: 'DVA-C02',
      gradient: 'from-purple-500 to-pink-600'
    },
    'sysops-administrator-associate': {
      name: 'AWS Certified CloudOps Engineer – Associate',
      code: 'SOA-C03',
      gradient: 'from-orange-500 to-amber-600'
    },
    'data-engineer-associate': {
      name: 'AWS Certified Data Engineer – Associate',
      code: 'DEA-C01',
      gradient: 'from-cyan-500 to-teal-600'
    },
    'machine-learning-engineer-associate': {
      name: 'AWS Certified Machine Learning Engineer – Associate',
      code: 'MLA-C01',
      gradient: 'from-fuchsia-500 to-pink-600'
    },
    // Professional (3)
    'solutions-architect-professional': {
      name: 'AWS Certified Solutions Architect – Professional',
      code: 'SAP-C02',
      gradient: 'from-rose-500 to-red-600'
    },
    'devops-engineer-professional': {
      name: 'AWS Certified DevOps Engineer – Professional',
      code: 'DOP-C02',
      gradient: 'from-slate-600 to-gray-700'
    },
    'generative-ai-developer-professional': {
      name: 'AWS Certified Generative AI Developer – Professional',
      code: 'AIP-C01',
      gradient: 'from-indigo-500 to-purple-600'
    },
    'advanced-networking-specialty': {
      name: 'AWS Certified Advanced Networking – Specialty',
      code: 'ANS-C01',
      gradient: 'from-sky-500 to-blue-600'
    },
    // Specialty (3)
    'security-specialty': {
      name: 'AWS Certified Security – Specialty',
      code: 'SCS-C03',
      gradient: 'from-emerald-500 to-green-600'
    },
    'machine-learning-specialty': {
      name: 'AWS Certified Machine Learning – Specialty',
      code: 'MLS-C01',
      gradient: 'from-lime-500 to-green-600'
    }
  }

  const certification = {
    id: certId,
    ...certifications[certId]
  }

  if (!certification.name) {
    return <div>Certification not found</div>
  }

  const certCompletions = completions[certification.id] || {}

  // Fetch question counts for all quizzes
  useEffect(() => {
    const fetchQuestionCounts = async () => {
      setLoading(true)
      const counts: { [key: string]: number } = {}
      
      // Fetch counts for quizzes 1-30
      for (let i = 1; i <= 30; i++) {
        try {
          const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${certification.code}/${i}`)
          const data = await response.json()
          counts[`quiz-${i}`] = Array.isArray(data) ? data.length : 0
        } catch (error) {
          counts[`quiz-${i}`] = 0
        }
      }
      
      // Fetch counts for final exams 1-2
      for (let i = 1; i <= 2; i++) {
        try {
          const response = await fetch(`https://ep78jmwohk.execute-api.ap-southeast-2.amazonaws.com/prod/questions/${certification.code}/exam-${i}`)
          const data = await response.json()
          counts[`exam-${i}`] = Array.isArray(data) ? data.length : 0
        } catch (error) {
          counts[`exam-${i}`] = 0
        }
      }
      
      setQuizCounts(counts)
      setLoading(false)
    }
    
    fetchQuestionCounts()
  }, [certId])

  const quizzes: Quiz[] = [
    ...Array.from({ length: 30 }, (_, i) => {
      const quizId = i + 1
      const quizKey = `quiz-${quizId}`
      const questionCount = quizCounts[quizKey] || 0
      const completion = certCompletions[quizId]
      return {
        id: quizId,
        title: `Quiz ${quizId}`,
        questions: questionCount,
        duration: questionCount, // 1 minute per question
        isCompleted: completion?.completed || false,
        score: completion?.score,
        isLocked: false
      }
    }),
    // Final Exams
    ...Array.from({ length: 2 }, (_, i) => {
      const quizId = 31 + i
      const quizKey = `exam-${i + 1}`
      const questionCount = quizCounts[quizKey] || 0
      const completion = certCompletions[quizId]
      return {
        id: quizId,
        title: `Final Exam ${i + 1}`,
        questions: questionCount,
        duration: questionCount, // 1 minute per question
        isCompleted: completion?.completed || false,
        score: completion?.score,
        isLocked: false,
        isFinalExam: true
      }
    })
  ]

  const handleStartQuiz = (quizId: number) => {
    // Store quiz and cert code (not slug) in sessionStorage
    sessionStorage.setItem('currentQuizId', quizId.toString())
    sessionStorage.setItem('currentCertId', certifications[certId].code)
    onNavigate('exam')
  }

  const handleBackToDashboard = () => {
    onNavigate('dashboard')
  }

  const completedCount = quizzes.filter(q => q.isCompleted).length
  const progress = (completedCount / quizzes.length) * 100

  const getQuizGradient = (quiz: Quiz) => {
    if (quiz.isFinalExam) return 'from-red-500 to-rose-600'
    return certification.gradient
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={handleBackToDashboard}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              NestedCerts
            </button>
            <Button variant="outline" onClick={handleBackToDashboard}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-8 py-6 sm:py-12">
        {/* Certification Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${certification.gradient} flex items-center justify-center shadow-xl`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {certification.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-mono">
                {certification.code}
              </p>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Overall Progress
              </h2>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {completedCount}/{quizzes.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${certification.gradient} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-sm text-slate-500 dark:text-slate-400 mt-2">
              {progress.toFixed(0)}% Complete
            </div>
          </Card>
        </div>

        {/* Quizzes Grid */}
        <div>
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6 border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`pb-3 px-2 font-bold text-lg sm:text-xl transition-colors relative ${
                activeTab === 'quizzes'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Practice Quizzes
              {activeTab === 'quizzes' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('flagged')}
              className={`pb-3 px-2 font-bold text-lg sm:text-xl transition-colors relative flex items-center gap-2 ${
                activeTab === 'flagged'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Flag className="w-5 h-5" />
              Flagged Questions
              {getFlaggedByCert(certification.code).length > 0 && (
                <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {getFlaggedByCert(certification.code).length}
                </span>
              )}
              {activeTab === 'flagged' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>

          {activeTab === 'quizzes' ? (
            loading ? (
              <div className="text-center py-6 sm:py-12 text-slate-600 dark:text-slate-400">
                Loading quizzes...
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className={`group relative overflow-hidden transition-all duration-300 ${
                  quiz.isLocked
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60'
                    : quiz.isCompleted
                    ? quiz.isFinalExam
                      ? 'bg-red-50 dark:bg-red-950/20 border-2 border-red-500 hover:shadow-lg'
                      : 'bg-green-50 dark:bg-green-950/20 border-2 border-green-500 hover:shadow-lg'
                    : quiz.isFinalExam
                    ? 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 hover:shadow-xl'
                    : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-xl'
                }`}
              >
                <div className="p-6">
                  {/* Status Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      quiz.isLocked
                        ? 'bg-slate-200 dark:bg-slate-700'
                        : `bg-gradient-to-br ${getQuizGradient(quiz)}`
                    } shadow-lg`}>
                      {quiz.isLocked ? (
                        <Lock className="w-6 h-6 text-slate-500" />
                      ) : quiz.isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </div>
                    {quiz.isCompleted && quiz.score && (
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                          {quiz.score}%
                        </div>
                        <div className="text-xs text-slate-500">Score</div>
                      </div>
                    )}
                  </div>

                  {/* Quiz Info */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {quiz.title}
                  </h3>

                  {/* Domain and Task */}
                  {getQuizMetadata(quiz.id).domain && (
                    <div className="mb-3 space-y-1">
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {getQuizMetadata(quiz.id).domain}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {getQuizMetadata(quiz.id).task}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span>{quiz.questions} Question{quiz.questions > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.duration} min</span>
                    </div>
                  </div>

                  {/* Action */}
                  {!quiz.isLocked && (
                    <div className="mt-4">
                      {quiz.isCompleted ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-full ${
                            quiz.isFinalExam
                              ? 'border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
                              : 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20'
                          }`}
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Retake Quiz
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className={`w-full bg-gradient-to-r ${getQuizGradient(quiz)} text-white font-semibold`}
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Start Quiz
                        </Button>
                      )}
                    </div>
                  )}

                  {quiz.isLocked && (
                    <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                      Complete previous quiz to unlock
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
            )
          ) : (
            /* Flagged Questions View */
            <div>
              {getFlaggedByCert(certification.code).length === 0 ? (
                <Card className="bg-white dark:bg-slate-900 p-8 text-center">
                  <Flag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    No Flagged Questions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Flag questions during practice to review them later
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {getFlaggedByCert(certification.code).map((flagged) => (
                    <Card key={flagged.questionId} className="bg-white dark:bg-slate-900 p-4 sm:p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-3">
                        <Flag className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" fill="currentColor" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base text-slate-900 dark:text-white mb-4 font-medium">
                            {flagged.questionText}
                          </p>
                          
                          {/* Answer Options */}
                          <div className="space-y-2 mb-4">
                            {flagged.options.map((option, idx) => {
                              const isCorrect = option === flagged.correctAnswer
                              return (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-lg border-2 transition-colors ${
                                    isCorrect
                                      ? 'bg-green-50 dark:bg-green-950/20 border-green-500 dark:border-green-600'
                                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    <span className={`font-bold flex-shrink-0 ${
                                      isCorrect ? 'text-green-700 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'
                                    }`}>
                                      {String.fromCharCode(65 + idx)}.
                                    </span>
                                    <span className={`text-sm ${
                                      isCorrect ? 'text-green-900 dark:text-green-100 font-medium' : 'text-slate-700 dark:text-slate-300'
                                    }`}>
                                      {option}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-mono">Quiz {flagged.quizId}</span>
                            <span>•</span>
                            <span>{new Date(flagged.flaggedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFlagged(flagged.questionId)}
                          className="flex-shrink-0 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Remove flag"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CertificationDetailPage
