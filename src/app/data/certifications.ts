// AWS Certifications Data
export const certifications = [
  // Foundational
  {
    id: 'cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner',
    code: 'CLF-C02',
    level: 'Foundational' as const,
    price: 0,
    isFree: true,
    description: 'Foundational understanding of AWS Cloud concepts, services, and terminology',
    domains: ['Cloud Concepts', 'Security & Compliance', 'Technology', 'Billing & Pricing'],
    examDetails: {
      duration: 90,
      questions: 65,
      passingScore: 700
    }
  },
  {
    id: 'ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    code: 'AIF-C01',
    level: 'Foundational' as const,
    price: 49,
    isFree: false,
    description: 'Foundational understanding of AI/ML concepts and AWS AI services',
    domains: ['AI/ML Fundamentals', 'AWS AI Services', 'Responsible AI', 'AI/ML Security'],
    examDetails: {
      duration: 120,
      questions: 65,
      passingScore: 700
    }
  },
  // Associate
  {
    id: 'solutions-architect-associate',
    name: 'AWS Certified Solutions Architect - Associate',
    code: 'SAA-C03',
    level: 'Associate' as const,
    price: 49,
    isFree: false,
    description: 'Design and deploy scalable, highly available systems on AWS',
    domains: ['Design Secure Architectures', 'Design Resilient Architectures', 'Design High-Performing Architectures', 'Design Cost-Optimized Architectures'],
    examDetails: {
      duration: 130,
      questions: 65,
      passingScore: 720
    }
  },
  {
    id: 'developer-associate',
    name: 'AWS Certified Developer - Associate',
    code: 'DVA-C02',
    level: 'Associate' as const,
    price: 49,
    isFree: false,
    description: 'Develop and maintain applications on the AWS platform',
    domains: ['Development with AWS Services', 'Security', 'Deployment', 'Troubleshooting & Optimization'],
    examDetails: {
      duration: 130,
      questions: 65,
      passingScore: 720
    }
  },
  {
    id: 'sysops-administrator-associate',
    name: 'AWS Certified SysOps Administrator - Associate',
    code: 'SOA-C02',
    level: 'Associate' as const,
    price: 49,
    isFree: false,
    description: 'Deploy, manage, and operate scalable systems on AWS',
    domains: ['Monitoring & Reporting', 'High Availability', 'Deployment & Provisioning', 'Storage & Data Management', 'Security & Compliance', 'Networking', 'Automation & Optimization'],
    examDetails: {
      duration: 130,
      questions: 65,
      passingScore: 720
    }
  },
  // Professional
  {
    id: 'solutions-architect-professional',
    name: 'AWS Certified Solutions Architect - Professional',
    code: 'SAP-C02',
    level: 'Professional' as const,
    price: 49,
    isFree: false,
    description: 'Advanced technical skills in designing distributed systems on AWS',
    domains: ['Design Solutions for Organizational Complexity', 'Design for New Solutions', 'Continuous Improvement for Existing Solutions', 'Accelerate Workload Migration and Modernization'],
    examDetails: {
      duration: 180,
      questions: 75,
      passingScore: 750
    }
  },
  {
    id: 'devops-engineer-professional',
    name: 'AWS Certified DevOps Engineer - Professional',
    code: 'DOP-C02',
    level: 'Professional' as const,
    price: 49,
    isFree: false,
    description: 'Provision, operate, and manage distributed application systems on AWS',
    domains: ['SDLC Automation', 'Configuration Management and IaC', 'Resilient Cloud Solutions', 'Monitoring and Logging', 'Incident and Event Response', 'Security and Compliance'],
    examDetails: {
      duration: 180,
      questions: 75,
      passingScore: 750
    }
  },
  // Specialty
  {
    id: 'security-specialty',
    name: 'AWS Certified Security - Specialty',
    code: 'SCS-C02',
    level: 'Specialty' as const,
    price: 49,
    isFree: false,
    description: 'Specialized knowledge in securing AWS workloads',
    domains: ['Threat Detection and Incident Response', 'Security Logging and Monitoring', 'Infrastructure Security', 'Identity and Access Management', 'Data Protection in Transit and at Rest', 'Management and Security Governance'],
    examDetails: {
      duration: 170,
      questions: 65,
      passingScore: 750
    }
  },
  {
    id: 'machine-learning-specialty',
    name: 'AWS Certified Machine Learning - Specialty',
    code: 'MLS-C01',
    level: 'Specialty' as const,
    price: 49,
    isFree: false,
    description: 'Specialized knowledge in building, training, tuning, and deploying ML models on AWS',
    domains: ['Data Engineering', 'Exploratory Data Analysis', 'Modeling', 'Machine Learning Implementation and Operations'],
    examDetails: {
      duration: 170,
      questions: 65,
      passingScore: 750
    }
  },
  {
    id: 'database-specialty',
    name: 'AWS Certified Database - Specialty',
    code: 'DBS-C01',
    level: 'Specialty' as const,
    price: 49,
    isFree: false,
    description: 'Specialized knowledge in designing and maintaining AWS database solutions',
    domains: ['Workload-Specific Database Design', 'Deployment and Migration', 'Management and Operations', 'Monitoring and Troubleshooting', 'Database Security'],
    examDetails: {
      duration: 180,
      questions: 65,
      passingScore: 750
    }
  },
  {
    id: 'data-analytics-specialty',
    name: 'AWS Certified Data Analytics - Specialty',
    code: 'DAS-C01',
    level: 'Specialty' as const,
    price: 49,
    isFree: false,
    description: 'Specialized knowledge in using AWS data lakes and analytics services',
    domains: ['Collection', 'Storage and Data Management', 'Processing', 'Analysis and Visualization', 'Security'],
    examDetails: {
      duration: 180,
      questions: 65,
      passingScore: 750
    }
  },
  {
    id: 'network-specialty',
    name: 'AWS Certified Advanced Networking - Specialty',
    code: 'ANS-C01',
    level: 'Specialty' as const,
    price: 49,
    isFree: false,
    description: 'Specialized knowledge in designing and implementing AWS and hybrid network architectures',
    domains: ['Network Design', 'Network Implementation', 'Network Management and Operation', 'Network Security, Compliance, and Governance'],
    examDetails: {
      duration: 170,
      questions: 65,
      passingScore: 750
    }
  },
  {
    id: 'sap-on-aws-specialty',
    name: 'AWS Certified SAP on AWS - Specialty',
    code: 'PAS-C01',
    level: 'Specialty' as const,
    price: 49,
    isFree: false,
    description: 'Specialized knowledge in designing, implementing, and operating SAP workloads on AWS',
    domains: ['SAP on AWS Planning and Design', 'SAP on AWS Implementation', 'SAP on AWS Operations', 'SAP on AWS Management and Optimization'],
    examDetails: {
      duration: 170,
      questions: 65,
      passingScore: 750
    }
  }
]

// Pricing Plans
export const pricingPlans = [
  {
    id: 'free',
    name: 'Cloud Practitioner',
    price: 0,
    type: 'free' as const,
    badge: 'FREE',
    features: [
      'AWS Cloud Practitioner certification prep',
      'Full 30-day exam path',
      'Daily 20-question exams',
      'Results & review with explanations',
      'Basic analytics',
      'Bookmarks & review queue'
    ],
    certifications: ['cloud-practitioner']
  },
  {
    id: 'individual',
    name: 'Single Certification',
    price: 49,
    originalPrice: 89,
    type: 'individual' as const,
    badge: '45% OFF',
    features: [
      'Full 30-day exam path for 1 certification',
      'Daily 20-question exams',
      'Results & review with explanations',
      'Domain/pillar analytics',
      'Bookmarks + review queue',
      'Flagged questions system'
    ],
    certifications: ['any-single-cert']
  },
  {
    id: 'associates-bundle',
    name: 'All Associates Bundle',
    price: 149,
    originalPrice: 299,
    type: 'bundle' as const,
    badge: 'BEST VALUE',
    popular: true,
    features: [
      'All Associate certifications (SAA, DVA, SOA)',
      'All 30-day paths + cross-cert tracking',
      'Advanced analytics + weak-area drills',
      'Priority content updates',
      'Priority support',
      'Study streak tracking'
    ],
    certifications: ['solutions-architect-associate', 'developer-associate', 'sysops-administrator-associate']
  },
  {
    id: 'everything-pass',
    name: 'Everything Pass',
    price: 299,
    originalPrice: 599,
    type: 'lifetime' as const,
    badge: 'FOUNDERS DEAL',
    features: [
      'ALL certifications (current + future)',
      'All Associate, Professional & Specialty certs',
      'All analytics & study tools',
      'Lifetime access to all content',
      'Priority support',
      'Early access to new features'
    ],
    certifications: ['all']
  },
  {
    id: 'subscription',
    name: 'All-Access Subscription',
    price: 20,
    originalPrice: 39,
    type: 'subscription' as const,
    badge: 'LAUNCH DEAL',
    features: [
      'Access to all certifications',
      'Cancel anytime',
      'All study tools & analytics',
      'Priority support',
      'Flexible monthly billing',
      'New certifications included'
    ],
    certifications: ['all']
  }
]
