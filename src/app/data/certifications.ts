export const CERTIFICATIONS = {
  'solutions-architect-associate': {
    name: 'Solutions Architect Associate',
    domains: [
      'Design Resilient Architectures',
      'Design High-Performing Architectures',
      'Design Secure Applications and Architectures',
      'Design Cost-Optimized Architectures'
    ]
  },
  'developer-associate': {
    name: 'Developer Associate',
    domains: [
      'Development with AWS Services',
      'Security',
      'Deployment',
      'Troubleshooting and Optimization'
    ]
  },
  'sysops-administrator-associate': {
    name: 'SysOps Administrator Associate',
    domains: [
      'Monitoring, Logging, and Remediation',
      'Reliability and Business Continuity',
      'Deployment, Provisioning, and Automation',
      'Security and Compliance',
      'Networking and Content Delivery',
      'Cost and Performance Optimization'
    ]
  },
  'solutions-architect-professional': {
    name: 'Solutions Architect Professional',
    domains: [
      'Design Solutions for Organizational Complexity',
      'Design for New Solutions',
      'Continuous Improvement for Existing Solutions',
      'Accelerate Workload Migration and Modernization'
    ]
  },
  'devops-engineer-professional': {
    name: 'DevOps Engineer Professional',
    domains: [
      'SDLC Automation',
      'Configuration Management and IaC',
      'Monitoring and Logging',
      'Policies and Standards Automation',
      'Incident and Event Response',
      'High Availability, Fault Tolerance, and Disaster Recovery'
    ]
  },
  'security-specialty': {
    name: 'Security Specialty',
    domains: [
      'Incident Response',
      'Logging and Monitoring',
      'Infrastructure Security',
      'Identity and Access Management',
      'Data Protection'
    ]
  },
  'machine-learning-specialty': {
    name: 'Machine Learning Specialty',
    domains: [
      'Data Engineering',
      'Exploratory Data Analysis',
      'Modeling',
      'Machine Learning Implementation and Operations'
    ]
  },
  'database-specialty': {
    name: 'Database Specialty',
    domains: [
      'Workload-Specific Database Design',
      'Deployment and Migration',
      'Management and Operations',
      'Monitoring and Troubleshooting',
      'Database Security'
    ]
  }
}

export const QUIZ_TYPES = [
  ...Array.from({ length: 30 }, (_, i) => ({ value: `quiz-${i + 1}`, label: `Quiz ${i + 1}` })),
  { value: 'exam-1', label: 'Practice Exam 1' },
  { value: 'exam-2', label: 'Practice Exam 2' }
]

// Legacy export for compatibility
export const certifications = [
  { 
    id: 'cloud-practitioner', 
    name: 'Cloud Practitioner', 
    level: 'Foundational', 
    code: 'CLF-C02',
    description: 'Foundational understanding of AWS Cloud',
    examDetails: { questions: 65, duration: 90, passingScore: 700 },
    domains: ['Cloud Concepts', 'Security and Compliance', 'Technology', 'Billing and Pricing'],
    isFree: false
  },
  { 
    id: 'solutions-architect-associate', 
    name: 'Solutions Architect Associate', 
    level: 'Associate', 
    code: 'SAA-C03',
    description: 'Design and deploy scalable systems on AWS',
    examDetails: { questions: 65, duration: 130, passingScore: 720 },
    domains: ['Design Resilient Architectures', 'Design High-Performing Architectures', 'Design Secure Applications and Architectures', 'Design Cost-Optimized Architectures'],
    isFree: false
  },
  { 
    id: 'developer-associate', 
    name: 'Developer Associate', 
    level: 'Associate', 
    code: 'DVA-C02',
    description: 'Develop and maintain AWS applications',
    examDetails: { questions: 65, duration: 130, passingScore: 720 },
    domains: ['Development with AWS Services', 'Security', 'Deployment', 'Troubleshooting and Optimization'],
    isFree: false
  },
  { 
    id: 'sysops-administrator-associate', 
    name: 'SysOps Administrator Associate', 
    level: 'Associate', 
    code: 'SOA-C02',
    description: 'Deploy, manage, and operate AWS systems',
    examDetails: { questions: 65, duration: 130, passingScore: 720 },
    domains: ['Monitoring, Logging, and Remediation', 'Reliability and Business Continuity', 'Deployment, Provisioning, and Automation', 'Security and Compliance', 'Networking and Content Delivery', 'Cost and Performance Optimization'],
    isFree: false
  },
  { 
    id: 'solutions-architect-professional', 
    name: 'Solutions Architect Professional', 
    level: 'Professional', 
    code: 'SAP-C02',
    description: 'Advanced AWS architecture design',
    examDetails: { questions: 75, duration: 180, passingScore: 750 },
    domains: ['Design Solutions for Organizational Complexity', 'Design for New Solutions', 'Continuous Improvement for Existing Solutions', 'Accelerate Workload Migration and Modernization'],
    isFree: false
  },
  { 
    id: 'devops-engineer-professional', 
    name: 'DevOps Engineer Professional', 
    level: 'Professional', 
    code: 'DOP-C02',
    description: 'Automate and optimize AWS operations',
    examDetails: { questions: 75, duration: 180, passingScore: 750 },
    domains: ['SDLC Automation', 'Configuration Management and IaC', 'Monitoring and Logging', 'Policies and Standards Automation', 'Incident and Event Response', 'High Availability, Fault Tolerance, and Disaster Recovery'],
    isFree: false
  },
  { 
    id: 'security-specialty', 
    name: 'Security Specialty', 
    level: 'Specialty', 
    code: 'SCS-C02',
    description: 'Secure AWS workloads and applications',
    examDetails: { questions: 65, duration: 170, passingScore: 750 },
    domains: ['Incident Response', 'Logging and Monitoring', 'Infrastructure Security', 'Identity and Access Management', 'Data Protection'],
    isFree: false
  },
  { 
    id: 'machine-learning-specialty', 
    name: 'Machine Learning Specialty', 
    level: 'Specialty', 
    code: 'MLS-C01',
    description: 'Build, train, and deploy ML models on AWS',
    examDetails: { questions: 65, duration: 170, passingScore: 750 },
    domains: ['Data Engineering', 'Exploratory Data Analysis', 'Modeling', 'Machine Learning Implementation and Operations'],
    isFree: false
  },
  { 
    id: 'database-specialty', 
    name: 'Database Specialty', 
    level: 'Specialty', 
    code: 'DBS-C01',
    description: 'Design and maintain AWS database solutions',
    examDetails: { questions: 65, duration: 180, passingScore: 750 },
    domains: ['Workload-Specific Database Design', 'Deployment and Migration', 'Management and Operations', 'Monitoring and Troubleshooting', 'Database Security'],
    isFree: false
  }
]
