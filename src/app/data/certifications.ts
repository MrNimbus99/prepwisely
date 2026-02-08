export const CERTIFICATIONS = {
  // Foundational (2)
  'cloud-practitioner': {
    name: 'AWS Certified Cloud Practitioner',
    code: 'CLF-C02',
    domains: [
      'Cloud Concepts',
      'Security and Compliance',
      'Technology',
      'Billing and Pricing'
    ]
  },
  'ai-practitioner': {
    name: 'AWS Certified AI Practitioner',
    code: 'AIF-C01',
    domains: [
      'Fundamentals of AI and ML',
      'Fundamentals of Generative AI',
      'Applications of Foundation Models',
      'Guidelines for Responsible AI',
      'Security, Compliance, and Governance for AI Solutions'
    ]
  },
  // Associate (5)
  'solutions-architect-associate': {
    name: 'AWS Certified Solutions Architect – Associate',
    code: 'SAA-C03',
    domains: [
      'Design Secure Architectures',
      'Design Resilient Architectures',
      'Design High-Performing Architectures',
      'Design Cost-Optimized Architectures'
    ]
  },
  'developer-associate': {
    name: 'AWS Certified Developer – Associate',
    code: 'DVA-C02',
    domains: [
      'Development with AWS Services',
      'Security',
      'Deployment',
      'Troubleshooting and Optimization'
    ]
  },
  'sysops-administrator-associate': {
    name: 'AWS Certified CloudOps Engineer – Associate',
    code: 'SOA-C03',
    domains: [
      'Monitoring, Logging, Analysis, Remediation, Performance Optimization',
      'Reliability and Business Continuity',
      'Deployment, Provisioning, and Automation',
      'Security and Compliance',
      'Networking and Content Delivery'
    ]
  },
  'data-engineer-associate': {
    name: 'AWS Certified Data Engineer – Associate',
    code: 'DEA-C01',
    domains: [
      'Data Ingestion and Transformation',
      'Data Store Management',
      'Data Operations and Support',
      'Data Security and Governance'
    ]
  },
  'machine-learning-engineer-associate': {
    name: 'AWS Certified Machine Learning Engineer – Associate',
    code: 'MLA-C01',
    domains: [
      'Data Preparation for ML',
      'ML Model Development',
      'Deployment and Orchestration of ML Workflows',
      'ML Solution Monitoring, Maintenance, and Security'
    ]
  },
  // Professional (3)
  'solutions-architect-professional': {
    name: 'AWS Certified Solutions Architect – Professional',
    code: 'SAP-C02',
    domains: [
      'Design Solutions for Organizational Complexity',
      'Design for New Solutions',
      'Continuous Improvement for Existing Solutions',
      'Accelerate Workload Migration and Modernization'
    ]
  },
  'devops-engineer-professional': {
    name: 'AWS Certified DevOps Engineer – Professional',
    code: 'DOP-C02',
    domains: [
      'SDLC Automation',
      'Configuration Management and IaC',
      'Monitoring and Logging',
      'Policies and Standards Automation',
      'Incident and Event Response',
      'High Availability, Fault Tolerance, and Disaster Recovery'
    ]
  },
  'advanced-networking-specialty': {
    name: 'AWS Certified Advanced Networking – Specialty',
    code: 'ANS-C01',
    domains: [
      'Network Design',
      'Network Implementation',
      'Network Management and Operation',
      'Network Security, Compliance, and Governance'
    ]
  },
  // Specialty (3)
  'security-specialty': {
    name: 'AWS Certified Security – Specialty',
    code: 'SCS-C03',
    domains: [
      'Incident Response',
      'Logging and Monitoring',
      'Infrastructure Security',
      'Identity and Access Management',
      'Data Protection'
    ]
  },
  'machine-learning-specialty': {
    name: 'AWS Certified Machine Learning – Specialty',
    code: 'MLS-C01',
    domains: [
      'Data Engineering',
      'Exploratory Data Analysis',
      'Modeling',
      'Machine Learning Implementation and Operations'
    ]
  },
  'generative-ai-developer-professional': {
    name: 'AWS Certified Generative AI Developer – Professional',
    code: 'AIP-C01',
    domains: [
      'Generative AI Fundamentals',
      'Foundation Models',
      'Application Development',
      'Security and Governance'
    ]
  }
}

export const QUIZ_TYPES = [
  ...Array.from({ length: 30 }, (_, i) => ({ value: `${i + 1}`, label: `Quiz ${i + 1}` })),
  { value: 'exam-1', label: 'Practice Exam 1' },
  { value: 'exam-2', label: 'Practice Exam 2' }
]

// Legacy export for compatibility
export const certifications = [
  // Foundational (2)
  { 
    id: 'cloud-practitioner', 
    name: 'AWS Certified Cloud Practitioner', 
    level: 'Foundational', 
    code: 'CLF-C02',
    description: 'Foundational understanding of AWS Cloud',
    examDetails: { questions: 65, duration: 90, passingScore: 700 },
    domains: ['Cloud Concepts', 'Security and Compliance', 'Technology', 'Billing and Pricing'],
    isFree: true
  },
  { 
    id: 'ai-practitioner', 
    name: 'AWS Certified AI Practitioner', 
    level: 'Foundational', 
    code: 'AIF-C01',
    description: 'Foundational understanding of AI and ML on AWS',
    examDetails: { questions: 65, duration: 90, passingScore: 700 },
    domains: ['Fundamentals of AI and ML', 'Fundamentals of Generative AI', 'Applications of Foundation Models', 'Guidelines for Responsible AI'],
    isFree: false
  },
  // Associate (5)
  { 
    id: 'solutions-architect-associate', 
    name: 'AWS Certified Solutions Architect - Associate', 
    level: 'Associate', 
    code: 'SAA-C03',
    description: 'Design and deploy scalable systems on AWS',
    examDetails: { questions: 65, duration: 130, passingScore: 720 },
    domains: ['Design Resilient Architectures', 'Design High-Performing Architectures', 'Design Secure Applications and Architectures', 'Design Cost-Optimized Architectures'],
    isFree: false
  },
  { 
    id: 'developer-associate', 
    name: 'AWS Certified Developer - Associate', 
    level: 'Associate', 
    code: 'DVA-C02',
    description: 'Develop and maintain AWS applications',
    examDetails: { questions: 65, duration: 130, passingScore: 720 },
    domains: ['Development with AWS Services', 'Security', 'Deployment', 'Troubleshooting and Optimization'],
    isFree: false
  },
  { 
    id: 'sysops-administrator-associate', 
    name: 'AWS Certified CloudOps Engineer – Associate', 
    level: 'Associate', 
    code: 'SOA-C03',
    description: 'Deploy, manage, and operate AWS systems',
    examDetails: { questions: 65, duration: 130, passingScore: 720 },
    domains: ['Monitoring, Logging, and Remediation', 'Reliability and Business Continuity', 'Deployment, Provisioning, and Automation', 'Security and Compliance', 'Networking and Content Delivery'],
    isFree: false
  },
  { 
    id: 'data-engineer-associate', 
    name: 'AWS Certified Data Engineer – Associate', 
    level: 'Associate', 
    code: 'DEA-C01',
    description: 'Design and maintain data solutions on AWS',
    examDetails: { questions: 65, duration: 130, passingScore: 720 },
    domains: ['Data Ingestion and Transformation', 'Data Store Management', 'Data Operations and Support', 'Data Security and Governance'],
    isFree: false
  },
  { 
    id: 'machine-learning-engineer-associate', 
    name: 'AWS Certified Machine Learning Engineer – Associate', 
    level: 'Associate', 
    code: 'MLA-C01',
    description: 'Build and deploy ML solutions on AWS',
    examDetails: { questions: 65, duration: 130, passingScore: 720 },
    domains: ['Data Preparation for ML', 'ML Model Development', 'Deployment and Orchestration of ML Workflows', 'ML Solution Monitoring, Maintenance, and Security'],
    isFree: false
  },
  // Professional (3)
  { 
    id: 'solutions-architect-professional', 
    name: 'AWS Certified Solutions Architect – Professional', 
    level: 'Professional', 
    code: 'SAP-C02',
    description: 'Advanced AWS architecture design',
    examDetails: { questions: 75, duration: 180, passingScore: 750 },
    domains: ['Design Solutions for Organizational Complexity', 'Design for New Solutions', 'Continuous Improvement for Existing Solutions', 'Accelerate Workload Migration and Modernization'],
    isFree: false
  },
  { 
    id: 'devops-engineer-professional', 
    name: 'AWS Certified DevOps Engineer – Professional', 
    level: 'Professional', 
    code: 'DOP-C02',
    description: 'Automate and optimize AWS operations',
    examDetails: { questions: 75, duration: 180, passingScore: 750 },
    domains: ['SDLC Automation', 'Configuration Management and IaC', 'Monitoring and Logging', 'Policies and Standards Automation', 'Incident and Event Response', 'High Availability, Fault Tolerance, and Disaster Recovery'],
    isFree: false
  },
  { 
    id: 'generative-ai-developer-professional', 
    name: 'AWS Certified Generative AI Developer – Professional', 
    level: 'Professional', 
    code: 'AIP-C01',
    description: 'Build and deploy generative AI applications on AWS',
    examDetails: { questions: 75, duration: 180, passingScore: 750 },
    domains: ['Generative AI Fundamentals', 'Foundation Models', 'Application Development', 'Security and Governance'],
    isFree: false
  },
  { 
    id: 'advanced-networking-specialty', 
    name: 'AWS Certified Advanced Networking – Specialty', 
    level: 'Specialty', 
    code: 'ANS-C01',
    description: 'Design and implement AWS and hybrid network architectures',
    examDetails: { questions: 65, duration: 170, passingScore: 750 },
    domains: ['Network Design', 'Network Implementation', 'Network Management and Operation', 'Network Security, Compliance, and Governance'],
    isFree: false
  },
  // Specialty (3)
  { 
    id: 'security-specialty', 
    name: 'AWS Certified Security – Specialty', 
    level: 'Specialty', 
    code: 'SCS-C03',
    description: 'Secure AWS workloads and applications',
    examDetails: { questions: 65, duration: 170, passingScore: 750 },
    domains: ['Incident Response', 'Logging and Monitoring', 'Infrastructure Security', 'Identity and Access Management', 'Data Protection'],
    isFree: false
  },
  { 
    id: 'machine-learning-specialty', 
    name: 'AWS Certified Machine Learning – Specialty', 
    level: 'Specialty', 
    code: 'MLS-C01',
    description: 'Build, train, and deploy ML models on AWS',
    examDetails: { questions: 65, duration: 170, passingScore: 750 },
    domains: ['Data Engineering', 'Exploratory Data Analysis', 'Modeling', 'Machine Learning Implementation and Operations'],
    isFree: false
  }
]
