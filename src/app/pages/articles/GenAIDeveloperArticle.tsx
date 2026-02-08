import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const GenAIDeveloperArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-generative-ai-developer-professional-aip-c01"
      certName="AWS Certified Generative AI Developer – Professional"
      certCode="AIP-C01"
      level="Professional"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Foundation Model Integration, Data Management, and Compliance (31%)',
        'Implementation and Integration (26%)',
        'AI Safety, Security, and Governance (20%)',
        'Operational Efficiency and Optimization (12%)',
        'Testing, Validation, and Troubleshooting (11%)'
      ]}
      domainTasks={[
        {
          domain: 'Foundation Model Integration, Data Management, and Compliance (31%)',
          tasks: [
            'Select and configure appropriate foundation models (Amazon Bedrock)',
            'Implement RAG patterns with vector databases (OpenSearch, Kendra)',
            'Manage and prepare data for GenAI applications',
            'Ensure compliance with data governance policies',
            'Implement fine-tuning and customization strategies'
          ]
        },
        {
          domain: 'Implementation and Integration (26%)',
          tasks: [
            'Build GenAI applications using Amazon Bedrock',
            'Implement agentic AI solutions with tool integrations',
            'Integrate GenAI with existing AWS services',
            'Implement prompt engineering best practices',
            'Build conversational AI applications'
          ]
        },
        {
          domain: 'AI Safety, Security, and Governance (20%)',
          tasks: [
            'Implement guardrails for responsible AI (Bedrock Guardrails)',
            'Secure GenAI applications (IAM, VPC, encryption)',
            'Implement content filtering and moderation',
            'Monitor for bias and fairness issues',
            'Implement AI governance frameworks'
          ]
        },
        {
          domain: 'Operational Efficiency and Optimization (12%)',
          tasks: [
            'Optimize GenAI application costs',
            'Implement caching strategies for LLM responses',
            'Monitor and optimize model performance',
            'Implement efficient token management',
            'Scale GenAI applications effectively'
          ]
        },
        {
          domain: 'Testing, Validation, and Troubleshooting (11%)',
          tasks: [
            'Test GenAI application outputs for quality',
            'Validate model responses against requirements',
            'Troubleshoot common GenAI issues',
            'Implement evaluation metrics for GenAI',
            'Debug prompt engineering problems'
          ]
        }
      ]}
    />
  )
}

export default GenAIDeveloperArticle
