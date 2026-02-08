import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const SolutionsArchitectProfessionalArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-solutions-architect-professional-sap-c02"
      certName="AWS Certified Solutions Architect – Professional"
      certCode="SAP-C02"
      level="Professional"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Design Solutions for Organizational Complexity (26%)',
        'Design for New Solutions (29%)',
        'Continuous Improvement for Existing Solutions (25%)',
        'Accelerate Workload Migration and Modernization (20%)'
      ]}
      domainTasks={[
        {
          domain: 'Design Solutions for Organizational Complexity (26%)',
          tasks: [
            'Design multi-account AWS environments (Organizations, Control Tower)',
            'Design hybrid and multi-Region network architectures',
            'Implement centralized logging and monitoring across accounts',
            'Design cost optimization strategies at scale',
            'Implement governance and compliance controls'
          ]
        },
        {
          domain: 'Design for New Solutions (29%)',
          tasks: [
            'Design secure, reliable, and high-performing architectures',
            'Select appropriate deployment strategies and IaC tools',
            'Design business continuity solutions (DR, backups)',
            'Implement security controls (WAF, Shield, Network Firewall)',
            'Design for performance optimization (caching, CDN, database selection)'
          ]
        },
        {
          domain: 'Continuous Improvement for Existing Solutions (25%)',
          tasks: [
            'Improve operational excellence through automation',
            'Enhance security posture of existing workloads',
            'Optimize performance using monitoring and analysis',
            'Improve reliability by removing single points of failure',
            'Identify and implement cost optimization opportunities'
          ]
        },
        {
          domain: 'Accelerate Workload Migration and Modernization (20%)',
          tasks: [
            'Select appropriate migration strategies (7Rs framework)',
            'Design migration solutions using AWS migration tools',
            'Plan and execute large-scale migrations',
            'Modernize applications (containers, serverless, microservices)',
            'Implement data migration strategies (DMS, DataSync, Snow family)'
          ]
        }
      ]}
    />
  )
}

export default SolutionsArchitectProfessionalArticle
