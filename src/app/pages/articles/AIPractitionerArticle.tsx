import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const AIPractitionerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-ai-practitioner-aif-c01"
      certName="AWS Certified AI Practitioner"
      certCode="AIF-C01"
      level="Foundational"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Fundamentals of AI and ML (20%)',
        'Fundamentals of Generative AI (24%)',
        'Applications of Foundation Models (28%)',
        'Guidelines for Responsible AI (14%)',
        'Security, Compliance, and Governance for AI Solutions (14%)'
      ]}
      domainTasks={[
        {
          domain: 'Fundamentals of AI and ML (20%)',
          tasks: [
            'Understand basic AI/ML concepts and terminology',
            'Identify appropriate use cases for AI/ML solutions',
            'Understand the ML development lifecycle and model training process'
          ]
        },
        {
          domain: 'Fundamentals of Generative AI (24%)',
          tasks: [
            'Understand foundation models and their capabilities',
            'Identify use cases for generative AI applications',
            'Understand prompt engineering techniques and best practices'
          ]
        },
        {
          domain: 'Applications of Foundation Models (28%)',
          tasks: [
            'Design solutions using Amazon Bedrock and foundation models',
            'Implement RAG (Retrieval Augmented Generation) patterns',
            'Build AI agents and integrate with AWS services',
            'Optimize model selection and configuration for specific use cases'
          ]
        },
        {
          domain: 'Guidelines for Responsible AI (14%)',
          tasks: [
            'Implement fairness and bias mitigation strategies',
            'Ensure transparency and explainability in AI systems',
            'Apply responsible AI principles throughout the ML lifecycle'
          ]
        },
        {
          domain: 'Security, Compliance, and Governance for AI Solutions (14%)',
          tasks: [
            'Implement security controls for AI/ML workloads',
            'Ensure data privacy and compliance in AI applications',
            'Apply governance frameworks for AI systems'
          ]
        }
      ]}
    />
  )
}

export default AIPractitionerArticle
