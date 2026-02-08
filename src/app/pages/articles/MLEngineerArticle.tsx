import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const MLEngineerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-machine-learning-engineer-associate-mla-c01"
      certName="AWS Certified Machine Learning Engineer – Associate"
      certCode="MLA-C01"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Data Preparation for ML (28%)',
        'ML Model Development (26%)',
        'Deployment and Orchestration of ML Workflows (22%)',
        'ML Solution Monitoring, Maintenance, and Security (24%)'
      ]}
      domainTasks={[
        {
          domain: 'Data Preparation for ML (28%)',
          tasks: [
            'Ingest and store data for ML workloads (S3, Feature Store)',
            'Transform data and perform feature engineering (Data Wrangler, Processing jobs)',
            'Implement data validation and quality checks',
            'Handle imbalanced datasets and missing data',
            'Create and manage feature stores for reusability'
          ]
        },
        {
          domain: 'ML Model Development (26%)',
          tasks: [
            'Select appropriate algorithms for ML problems',
            'Train ML models using SageMaker',
            'Perform hyperparameter optimization',
            'Evaluate and validate model performance',
            'Implement model versioning and experiment tracking'
          ]
        },
        {
          domain: 'Deployment and Orchestration of ML Workflows (22%)',
          tasks: [
            'Deploy models to SageMaker endpoints (real-time, batch, serverless)',
            'Implement A/B testing and canary deployments',
            'Orchestrate ML pipelines using SageMaker Pipelines',
            'Automate model retraining workflows',
            'Implement CI/CD for ML models'
          ]
        },
        {
          domain: 'ML Solution Monitoring, Maintenance, and Security (24%)',
          tasks: [
            'Monitor model inference performance and latency',
            'Detect model drift and data quality issues',
            'Implement model explainability (SageMaker Clarify)',
            'Secure ML workloads (IAM, VPC, encryption)',
            'Optimize infrastructure costs for ML workloads'
          ]
        }
      ]}
    />
  )
}

export default MLEngineerArticle
