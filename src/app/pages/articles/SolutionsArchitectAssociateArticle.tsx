import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const SolutionsArchitectAssociateArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-solutions-architect-associate-saa-c03"
      certName="AWS Certified Solutions Architect – Associate"
      certCode="SAA-C03"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Design Secure Architectures (30%)',
        'Design Resilient Architectures (26%)',
        'Design High-Performing Architectures (24%)',
        'Design Cost-Optimized Architectures (20%)'
      ]}
      domainTasks={[
        {
          domain: 'Design Secure Architectures (30%)',
          tasks: [
            'Design secure access to AWS resources using IAM policies and roles',
            'Design secure application tiers with security groups and NACLs',
            'Select appropriate data security options (encryption at rest and in transit)',
            'Implement secure multi-tier architectures'
          ]
        },
        {
          domain: 'Design Resilient Architectures (26%)',
          tasks: [
            'Design scalable and loosely coupled architectures',
            'Design highly available and fault-tolerant architectures using multiple AZs',
            'Implement elasticity and appropriate scaling strategies',
            'Choose appropriate resilient storage solutions'
          ]
        },
        {
          domain: 'Design High-Performing Architectures (24%)',
          tasks: [
            'Identify elastic and scalable compute solutions',
            'Select high-performing and scalable storage solutions',
            'Select high-performing networking solutions',
            'Choose high-performing database solutions for specific workloads'
          ]
        },
        {
          domain: 'Design Cost-Optimized Architectures (20%)',
          tasks: [
            'Identify cost-effective storage solutions',
            'Identify cost-effective compute and database services',
            'Design cost-optimized network architectures',
            'Implement cost optimization strategies (Reserved Instances, Savings Plans, rightsizing)'
          ]
        }
      ]}
    />
  )
}

export default SolutionsArchitectAssociateArticle
