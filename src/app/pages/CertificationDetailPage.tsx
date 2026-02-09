import React, { useEffect, useState } from 'react'
import { NavigationProps } from '../types'
import { useQuiz } from '../contexts/QuizContext'
import { useFlaggedQuestions } from '../contexts/FlaggedQuestionsContext'
import { useAuth } from '../contexts/AuthContext'
import { fetchAuthSession } from 'aws-amplify/auth'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { ArrowLeft, Trophy, CheckCircle, Lock, Play, Clock, Flag, X, Download, Award } from 'lucide-react'
import { generateCertificate, downloadCertificate } from '../utils/certificateService'

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
  const { user, getCredentials } = useAuth()
  const [quizCounts, setQuizCounts] = useState<{ [key: string]: number }>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'quizzes' | 'flagged'>('quizzes')
  const [generatingCert, setGeneratingCert] = useState(false)

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

  // Quiz metadata for Data Engineer Associate
  const deaQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Data Ingestion", task: "Task 1.1: Streaming/batch reads" },
    2: { domain: "Data Ingestion", task: "Task 1.1: Throttling & fan-in/out" },
    3: { domain: "Data Ingestion", task: "Task 1.2: Transform services" },
    4: { domain: "Data Ingestion", task: "Task 1.2: Containers & debugging" },
    5: { domain: "Data Ingestion", task: "Task 1.3: Orchestration" },
    6: { domain: "Data Ingestion", task: "Task 1.3: Serverless workflows" },
    7: { domain: "Data Ingestion", task: "Task 1.4: Performance optimization" },
    8: { domain: "Data Ingestion", task: "Task 1.4: IaC & CI/CD" },
    9: { domain: "Data Ingestion", task: "Domain 1 Review" },
    10: { domain: "Data Store Management", task: "Task 2.1: Choose data store" },
    11: { domain: "Data Store Management", task: "Task 2.1: Federated queries" },
    12: { domain: "Data Store Management", task: "Task 2.2: Data Catalog" },
    13: { domain: "Data Store Management", task: "Task 2.3: Lifecycle & retention" },
    14: { domain: "Data Store Management", task: "Task 2.4: Schema design" },
    15: { domain: "Data Store Management", task: "Domain 2 Review" },
    16: { domain: "Data Operations", task: "Task 3.1: Automation" },
    17: { domain: "Data Operations", task: "Task 3.2: Analytics & visualization" },
    18: { domain: "Data Operations", task: "Task 3.3: Monitoring & logging" },
    19: { domain: "Data Operations", task: "Task 3.4: Data quality" },
    20: { domain: "Data Operations", task: "Domain 3 Review" },
    21: { domain: "Security & Governance", task: "Task 4.1: Authentication" },
    22: { domain: "Security & Governance", task: "Task 4.2: Authorization" },
    23: { domain: "Security & Governance", task: "Task 4.3: Encryption & masking" },
    24: { domain: "Security & Governance", task: "Task 4.4: Audit logs" },
    25: { domain: "Security & Governance", task: "Task 4.5: Privacy & governance" },
    26: { domain: "Security & Governance", task: "Domain 4 Review" },
    27: { domain: "Data Ingestion", task: "Streaming + Eventing" },
    28: { domain: "Data Store Management", task: "Lakehouse + Warehouse" },
    29: { domain: "Security & Governance", task: "Security Edge" },
    30: { domain: "Mixed Review (All Domains)", task: "Final Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for DevOps Engineer Professional
  const dopQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "SDLC Automation", task: "Task 1.1: CI/CD pipeline design" },
    2: { domain: "SDLC Automation", task: "Task 1.2: Testing strategy" },
    3: { domain: "SDLC Automation", task: "Task 1.3: Artifacts management" },
    4: { domain: "SDLC Automation", task: "Task 1.4: Deployment strategies" },
    5: { domain: "IaC & Config Mgmt", task: "Task 2.1: CloudFormation/CDK/SAM" },
    6: { domain: "IaC & Config Mgmt", task: "Task 2.2: Account vending" },
    7: { domain: "IaC & Config Mgmt", task: "Task 2.3: Automation at scale" },
    8: { domain: "Resilience & DR", task: "Task 3.1: Multi-AZ/Region HA" },
    9: { domain: "Resilience & DR", task: "Task 3.2: Scaling strategies" },
    10: { domain: "Resilience & DR", task: "Task 3.3: RTO/RPO & recovery" },
    11: { domain: "Observability", task: "Task 4.1: Log/metric pipelines" },
    12: { domain: "Observability", task: "Task 4.2: Detection & dashboards" },
    13: { domain: "Observability", task: "Task 4.3: Event-driven monitoring" },
    14: { domain: "Incident Response", task: "Task 5.1: Event sources" },
    15: { domain: "Incident Response", task: "Task 5.2: Config remediation" },
    16: { domain: "Incident Response", task: "Task 5.3: RCA for failures" },
    17: { domain: "Security & Compliance", task: "Task 6.1: IAM at scale" },
    18: { domain: "Security & Compliance", task: "Task 6.2: Automated controls" },
    19: { domain: "Security & Compliance", task: "Task 6.3: Auditing & detection" },
    20: { domain: "SDLC Automation", task: "Domain 1 Review" },
    21: { domain: "IaC & Config Mgmt", task: "Domain 2 Review" },
    22: { domain: "Resilience & DR", task: "Domain 3 Review" },
    23: { domain: "Observability", task: "Domain 4 Review" },
    24: { domain: "Incident Response", task: "Domain 5 Review" },
    25: { domain: "Security & Compliance", task: "Domain 6 Review" },
    26: { domain: "SDLC Automation", task: "CI/CD + DevTools" },
    27: { domain: "IaC & Config Mgmt", task: "Multi-account governance" },
    28: { domain: "Resilience & DR", task: "Networking delivery" },
    29: { domain: "Observability", task: "Data/Storage/DR" },
    30: { domain: "Mixed Review (Domains 1–6)", task: "Final Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for GenAI Developer Professional
  const aipQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "FM Integration & Data", task: "Task 1.1: Requirements & design" },
    2: { domain: "FM Integration & Data", task: "Task 1.2: FM selection" },
    3: { domain: "FM Integration & Data", task: "Task 1.3: Data validation" },
    4: { domain: "FM Integration & Data", task: "Task 1.4: Vector stores" },
    5: { domain: "FM Integration & Data", task: "Task 1.5: Retrieval mechanisms" },
    6: { domain: "FM Integration & Data", task: "Task 1.6: Prompt engineering" },
    7: { domain: "FM Integration & Data", task: "Domain 1 Review" },
    8: { domain: "Implementation", task: "Task 2.1: Agentic AI" },
    9: { domain: "Implementation", task: "Task 2.2: Model deployment" },
    10: { domain: "Implementation", task: "Task 2.3: Enterprise integration" },
    11: { domain: "Implementation", task: "Task 2.4: FM API integration" },
    12: { domain: "Implementation", task: "Task 2.5: Dev tools" },
    13: { domain: "Implementation", task: "Domain 2 Review" },
    14: { domain: "AI Safety & Security", task: "Task 3.1: Input/output safety" },
    15: { domain: "AI Safety & Security", task: "Task 3.2: Privacy & security" },
    16: { domain: "AI Safety & Security", task: "Task 3.3: Governance" },
    17: { domain: "AI Safety & Security", task: "Task 3.4: Responsible AI" },
    18: { domain: "AI Safety & Security", task: "Domain 3 Review" },
    19: { domain: "Operational Efficiency", task: "Task 4.1: Cost optimization" },
    20: { domain: "Operational Efficiency", task: "Task 4.2: Performance optimization" },
    21: { domain: "Operational Efficiency", task: "Task 4.3: Monitoring" },
    22: { domain: "Operational Efficiency", task: "Domain 4 Review" },
    23: { domain: "Testing & Troubleshooting", task: "Task 5.1: Evaluation systems" },
    24: { domain: "Testing & Troubleshooting", task: "Task 5.2: Troubleshooting" },
    25: { domain: "Testing & Troubleshooting", task: "Domain 5 Review" },
    26: { domain: "FM Integration & Data", task: "RAG at scale" },
    27: { domain: "Implementation", task: "Agents + workflows" },
    28: { domain: "Implementation", task: "Enterprise integration" },
    29: { domain: "Operational Efficiency", task: "Cost/perf/observability" },
    30: { domain: "Mixed Review", task: "Final Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for ML Engineer Associate
  const mlaQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Data Preparation", task: "Task 1.1: Ingest & store" },
    2: { domain: "Data Preparation", task: "Task 1.1: Multi-source merge" },
    3: { domain: "Data Preparation", task: "Task 1.2: Transform & feature eng" },
    4: { domain: "Data Preparation", task: "Task 1.2: Encodings & labeling" },
    5: { domain: "Data Preparation", task: "Task 1.3: Integrity & bias" },
    6: { domain: "Data Preparation", task: "Task 1.3: Encryption & compliance" },
    7: { domain: "Data Preparation", task: "Domain 1 Review" },
    8: { domain: "Model Development", task: "Task 2.1: Modeling approach" },
    9: { domain: "Model Development", task: "Task 2.2: Train & refine" },
    10: { domain: "Model Development", task: "Task 2.2: HPO & ensembling" },
    11: { domain: "Model Development", task: "Task 2.3: Performance metrics" },
    12: { domain: "Model Development", task: "Task 2.3: Shadow testing" },
    13: { domain: "Model Development", task: "Domain 2 Review" },
    14: { domain: "Deployment", task: "Task 3.1: Deploy infra" },
    15: { domain: "Deployment", task: "Task 3.1: Orchestrators" },
    16: { domain: "Deployment", task: "Task 3.2: IaC & containers" },
    17: { domain: "Deployment", task: "Task 3.2: BYOC containers" },
    18: { domain: "Deployment", task: "Task 3.3: CI/CD pipelines" },
    19: { domain: "Deployment", task: "Task 3.3: Retraining triggers" },
    20: { domain: "Deployment", task: "Domain 3 Review" },
    21: { domain: "Monitor & Maintain", task: "Task 4.1: Inference monitoring" },
    22: { domain: "Monitor & Maintain", task: "Task 4.1: A/B testing" },
    23: { domain: "Monitor & Maintain", task: "Task 4.2: Infra & cost KPIs" },
    24: { domain: "Monitor & Maintain", task: "Task 4.2: CloudTrail & dashboards" },
    25: { domain: "Monitor & Maintain", task: "Task 4.3: Security & IAM" },
    26: { domain: "Monitor & Maintain", task: "Domain 4 Review" },
    27: { domain: "Data Preparation", task: "Analytics + Lakehouse" },
    28: { domain: "Model Development", task: "SageMaker Core" },
    29: { domain: "Model Development", task: "Bedrock + AI Services" },
    30: { domain: "Mixed Review (All Domains)", task: "Final Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for Security Specialty
  const scsQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Threat Detection", task: "Task 1.1: Monitoring & alerting" },
    2: { domain: "Threat Detection", task: "Task 1.2: Logging solutions" },
    3: { domain: "Threat Detection", task: "Task 1.3: Troubleshooting" },
    4: { domain: "Threat Detection", task: "Domain 1 Review" },
    5: { domain: "Incident Response", task: "Task 2.1: IR plan & testing" },
    6: { domain: "Incident Response", task: "Task 2.2: Responding to events" },
    7: { domain: "Incident Response", task: "Domain 2 Review" },
    8: { domain: "Infrastructure Security", task: "Task 3.1: Edge security" },
    9: { domain: "Infrastructure Security", task: "Task 3.2: Compute security" },
    10: { domain: "Infrastructure Security", task: "Task 3.3: Network security" },
    11: { domain: "Infrastructure Security", task: "Domain 3 Review" },
    12: { domain: "Identity & Access Mgmt", task: "Task 4.1: Authentication" },
    13: { domain: "Identity & Access Mgmt", task: "Task 4.2: Authorization" },
    14: { domain: "Identity & Access Mgmt", task: "Domain 4 Review" },
    15: { domain: "Data Protection", task: "Task 5.1: Data in transit" },
    16: { domain: "Data Protection", task: "Task 5.2: Data at rest" },
    17: { domain: "Data Protection", task: "Task 5.3: Secrets & keys" },
    18: { domain: "Data Protection", task: "Domain 5 Review" },
    19: { domain: "Management & Governance", task: "Task 6.1: Account management" },
    20: { domain: "Management & Governance", task: "Task 6.2: Secure deployments" },
    21: { domain: "Management & Governance", task: "Task 6.3: Compliance" },
    22: { domain: "Management & Governance", task: "Domain 6 Review" },
    23: { domain: "Threat Detection", task: "Security data lake" },
    24: { domain: "Incident Response", task: "Ransomware resilience" },
    25: { domain: "Infrastructure Security", task: "Edge protection" },
    26: { domain: "Management & Governance", task: "Secure build pipeline" },
    27: { domain: "Infrastructure Security", task: "Hybrid connectivity" },
    28: { domain: "Identity & Access Mgmt", task: "IAM at scale" },
    29: { domain: "Incident Response", task: "IR automation" },
    30: { domain: "Mixed Review (Domains 1–6)", task: "Final Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for Solutions Architect Professional
  const sapQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Organizational Complexity", task: "Task 1.1: Network connectivity" },
    2: { domain: "Organizational Complexity", task: "Task 1.2: Security controls" },
    3: { domain: "Organizational Complexity", task: "Task 1.3: Reliable architectures" },
    4: { domain: "Organizational Complexity", task: "Task 1.4: Multi-account" },
    5: { domain: "Organizational Complexity", task: "Task 1.5: Cost visibility" },
    6: { domain: "Organizational Complexity", task: "Domain 1 Review" },
    7: { domain: "Design for New Solutions", task: "Task 2.1: Deployment strategy" },
    8: { domain: "Design for New Solutions", task: "Task 2.2: Business continuity" },
    9: { domain: "Design for New Solutions", task: "Task 2.3: Security controls" },
    10: { domain: "Design for New Solutions", task: "Task 2.4: Reliability" },
    11: { domain: "Design for New Solutions", task: "Task 2.5: Performance" },
    12: { domain: "Design for New Solutions", task: "Task 2.6: Cost optimization" },
    13: { domain: "Design for New Solutions", task: "Domain 2 Review A" },
    14: { domain: "Design for New Solutions", task: "Domain 2 Review B" },
    15: { domain: "Continuous Improvement", task: "Task 3.1: Operational excellence" },
    16: { domain: "Continuous Improvement", task: "Task 3.2: Improve security" },
    17: { domain: "Continuous Improvement", task: "Task 3.3: Improve performance" },
    18: { domain: "Continuous Improvement", task: "Task 3.4: Improve reliability" },
    19: { domain: "Continuous Improvement", task: "Task 3.5: Cost optimization" },
    20: { domain: "Continuous Improvement", task: "Domain 3 Review" },
    21: { domain: "Continuous Improvement", task: "Existing-solution capstone" },
    22: { domain: "Migration & Modernization", task: "Task 4.1: Migration selection" },
    23: { domain: "Migration & Modernization", task: "Task 4.2: Migration approach" },
    24: { domain: "Migration & Modernization", task: "Task 4.3: New architecture" },
    25: { domain: "Migration & Modernization", task: "Task 4.4: Modernization" },
    26: { domain: "Migration & Modernization", task: "Domain 4 Review" },
    27: { domain: "Organizational Complexity", task: "Org complexity capstone" },
    28: { domain: "Design for New Solutions", task: "Resilience capstone" },
    29: { domain: "Migration & Modernization", task: "Migration capstone" },
    30: { domain: "Mixed Review (Domains 1–4)", task: "Final Review" },
    31: { domain: "Final Exam", task: "Practice Exam 1" },
    32: { domain: "Final Exam", task: "Practice Exam 2" }
  }

  // Quiz metadata for Advanced Networking Specialty
  const ansQuizMetadata: { [key: number]: { domain: string; task: string } } = {
    1: { domain: "Network Design", task: "Task 1.1: Edge services" },
    2: { domain: "Network Design", task: "Task 1.2: DNS solutions" },
    3: { domain: "Network Design", task: "Task 1.3: Load balancing" },
    4: { domain: "Network Design", task: "Task 1.4: Logging & monitoring" },
    5: { domain: "Network Design", task: "Task 1.5: Hybrid routing" },
    6: { domain: "Network Design", task: "Task 1.6: Multi-account connectivity" },
    7: { domain: "Network Design", task: "Domain 1 Review" },
    8: { domain: "Network Implementation", task: "Task 2.1: Hybrid implementation" },
    9: { domain: "Network Implementation", task: "Task 2.2: Multi-account implementation" },
    10: { domain: "Network Implementation", task: "Task 2.3: Complex DNS" },
    11: { domain: "Network Implementation", task: "Task 2.4: Automation" },
    12: { domain: "Network Implementation", task: "Domain 2 Review" },
    13: { domain: "Network Management", task: "Task 3.1: Maintain routing" },
    14: { domain: "Network Management", task: "Task 3.2: Monitor & troubleshoot" },
    15: { domain: "Network Management", task: "Task 3.3: Optimize networks" },
    16: { domain: "Network Management", task: "Domain 3 Review" },
    17: { domain: "Security & Compliance", task: "Task 4.1: Security features" },
    18: { domain: "Security & Compliance", task: "Task 4.2: Validate & audit" },
    19: { domain: "Security & Compliance", task: "Task 4.3: Data confidentiality" },
    20: { domain: "Security & Compliance", task: "Domain 4 Review" },
    21: { domain: "Network Design", task: "Global architecture" },
    22: { domain: "Network Design", task: "Multi-account hub" },
    23: { domain: "Network Implementation", task: "Hybrid multi-site" },
    24: { domain: "Network Implementation", task: "Private service exposure" },
    25: { domain: "Network Implementation", task: "EKS networking" },
    26: { domain: "Network Management", task: "Observability" },
    27: { domain: "Network Management", task: "Cost & performance" },
    28: { domain: "Security & Compliance", task: "Compliance perimeter" },
    29: { domain: "Security & Compliance", task: "Automation & drift" },
    30: { domain: "Mixed Review (Domains 1–4)", task: "Final Review" },
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
    if (certId === 'data-engineer-associate') return deaQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'devops-engineer-professional') return dopQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'generative-ai-developer-professional') return aipQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'machine-learning-engineer-associate') return mlaQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'security-specialty') return scsQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'solutions-architect-professional') return sapQuizMetadata[quizId] || { domain: "", task: "" }
    if (certId === 'advanced-networking-specialty') return ansQuizMetadata[quizId] || { domain: "", task: "" }
    return { domain: "", task: "" }
  }

  // Exam durations (in minutes) based on AWS official times
  const getExamDuration = () => {
    const examDurations: { [key: string]: number } = {
      'cloud-practitioner': 90,
      'ai-practitioner': 120,
      'solutions-architect-associate': 130,
      'developer-associate': 130,
      'sysops-administrator-associate': 130,
      'data-engineer-associate': 130,
      'machine-learning-engineer-associate': 130,
      'solutions-architect-professional': 180,
      'devops-engineer-professional': 180,
      'generative-ai-developer-professional': 180,
      'advanced-networking-specialty': 170,
      'security-specialty': 170,
      'machine-learning-specialty': 180
    }
    return examDurations[certId] || 180
  }

  // Certification data
  const certifications: { [key: string]: { name: string; code: string; gradient: string; badge: string } } = {
    // Foundational (2)
    'cloud-practitioner': {
      name: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      gradient: 'from-green-500 to-emerald-600',
      badge: '/badges/aws-clf-badge-transparent-500x500.png'
    },
    'ai-practitioner': {
      name: 'AWS Certified AI Practitioner',
      code: 'AIF-C01',
      gradient: 'from-violet-500 to-purple-600',
      badge: '/badges/aws_ai_practitioner_foundational_badge_500x500_v2.png'
    },
    // Associate (5)
    'solutions-architect-associate': {
      name: 'AWS Certified Solutions Architect – Associate',
      code: 'SAA-C03',
      gradient: 'from-blue-500 to-indigo-600',
      badge: '/badges/saa-badge-transparent-500.png'
    },
    'developer-associate': {
      name: 'AWS Certified Developer – Associate',
      code: 'DVA-C02',
      gradient: 'from-purple-500 to-pink-600',
      badge: '/badges/aws-developer-associate-badge-500x500.png'
    },
    'sysops-administrator-associate': {
      name: 'AWS Certified CloudOps Engineer – Associate',
      code: 'SOA-C03',
      gradient: 'from-orange-500 to-amber-600',
      badge: '/badges/aws-cloudops-engineer-badge-500.png'
    },
    'data-engineer-associate': {
      name: 'AWS Certified Data Engineer – Associate',
      code: 'DEA-C01',
      gradient: 'from-cyan-500 to-teal-600',
      badge: '/badges/dea-badge-500.png'
    },
    'machine-learning-engineer-associate': {
      name: 'AWS Certified Machine Learning Engineer – Associate',
      code: 'MLA-C01',
      gradient: 'from-fuchsia-500 to-pink-600',
      badge: '/badges/mla-badge-500-transparent.png'
    },
    // Professional (3)
    'solutions-architect-professional': {
      name: 'AWS Certified Solutions Architect – Professional',
      code: 'SAP-C02',
      gradient: 'from-rose-500 to-red-600',
      badge: '/badges/sap-badge-transparent-500.png'
    },
    'devops-engineer-professional': {
      name: 'AWS Certified DevOps Engineer – Professional',
      code: 'DOP-C02',
      gradient: 'from-slate-600 to-gray-700',
      badge: '/badges/dop-badge-500-transparent.png'
    },
    'generative-ai-developer-professional': {
      name: 'AWS Certified Generative AI Developer – Professional',
      code: 'AIP-C01',
      gradient: 'from-indigo-500 to-purple-600',
      badge: '/badges/aws_generative_ai_developer_pro_badge_500x500_v2.png'
    },
    'advanced-networking-specialty': {
      name: 'AWS Certified Advanced Networking – Specialty',
      code: 'ANS-C01',
      gradient: 'from-sky-500 to-blue-600',
      badge: '/badges/aws-advanced-networking-badge-500.png'
    },
    // Specialty (3)
    'security-specialty': {
      name: 'AWS Certified Security – Specialty',
      code: 'SCS-C03',
      gradient: 'from-emerald-500 to-green-600',
      badge: '/badges/aws-security-specialty-badge-500x500.png'
    },
    'machine-learning-specialty': {
      name: 'AWS Certified Machine Learning – Specialty',
      code: 'MLS-C01',
      gradient: 'from-lime-500 to-green-600',
      badge: '/badges/mls-badge-500.png'
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
        duration: 30, // 30 minutes for all quizzes
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
        duration: getExamDuration(), // AWS official exam time
        isCompleted: completion?.completed || false,
        score: completion?.score,
        isLocked: false,
        isFinalExam: true
      }
    })
  ]

  const handleStartQuiz = (quizId: number) => {
    const quiz = quizzes.find(q => q.id === quizId)
    // Store quiz and cert code (not slug) in sessionStorage
    sessionStorage.setItem('currentQuizId', quizId.toString())
    sessionStorage.setItem('currentCertId', certifications[certId].code)
    sessionStorage.setItem('quizDuration', quiz?.duration.toString() || '30')
    onNavigate('exam')
  }

  const handleBackToDashboard = () => {
    onNavigate('dashboard')
  }

  const completedCount = quizzes.filter(q => q.isCompleted).length
  const progress = (completedCount / quizzes.length) * 100
  const isFullyCompleted = completedCount === quizzes.length

  const handleDownloadCertificate = async () => {
    if (!user) return
    
    setGeneratingCert(true)
    try {
      const session = await fetchAuthSession();
      const accessToken = session.tokens?.accessToken?.toString();
      
      if (!accessToken) {
        throw new Error('No access token available');
      }
      
      const result = await generateCertificate(certification.code, accessToken)
      
      if (result.downloadUrl) {
        downloadCertificate(
          result.downloadUrl, 
          `${certification.code}-Certificate.pdf`
        )
      }
    } catch (error) {
      console.error('Failed to generate certificate:', error)
      alert('Failed to generate certificate. Please try again.')
    } finally {
      setGeneratingCert(false)
    }
  }

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
            <img src={certification.badge} alt={certification.name} className="w-30 h-30 object-contain" />
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
            
            {/* Certificate Download Button - Only show when fully completed */}
            {isFullyCompleted && (
              <button
                onClick={handleDownloadCertificate}
                disabled={generatingCert}
                className="ml-auto pb-3 px-4 font-bold text-base transition-colors flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingCert ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5" />
                    Download Certificate
                  </>
                )}
              </button>
            )}
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
