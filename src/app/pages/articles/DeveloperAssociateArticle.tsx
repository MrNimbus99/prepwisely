import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const DeveloperAssociateArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-developer-associate-dva-c02"
      certName="AWS Certified Developer – Associate"
      certCode="DVA-C02"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Development with AWS Services (32%)',
        'Security (26%)',
        'Deployment (24%)',
        'Troubleshooting and Optimization (18%)'
      ]}
      domainTasks={[
        {
          domain: 'Development with AWS Services (32%)',
          tasks: [
            'Develop code for applications hosted on AWS',
            'Write code for serverless applications (Lambda, API Gateway, Step Functions)',
            'Use AWS SDKs to interact with AWS services',
            'Implement application integration patterns (SQS, SNS, EventBridge)',
            'Store and retrieve data using AWS databases (DynamoDB, RDS, ElastiCache)'
          ]
        },
        {
          domain: 'Security (26%)',
          tasks: [
            'Implement application authentication and authorization (Cognito, IAM)',
            'Implement encryption using AWS services (KMS, Secrets Manager)',
            'Manage sensitive data securely in application code',
            'Apply security best practices for AWS services'
          ]
        },
        {
          domain: 'Deployment (24%)',
          tasks: [
            'Deploy applications using CI/CD pipelines (CodePipeline, CodeBuild, CodeDeploy)',
            'Deploy serverless applications (SAM, CloudFormation)',
            'Deploy containerized applications (ECS, ECR)',
            'Implement deployment strategies (blue/green, canary, rolling)'
          ]
        },
        {
          domain: 'Troubleshooting and Optimization (18%)',
          tasks: [
            'Troubleshoot and optimize code using AWS X-Ray',
            'Perform root cause analysis using CloudWatch Logs and metrics',
            'Optimize application performance and costs',
            'Implement application monitoring and alerting'
          ]
        }
      ]}
    />
  )
}

export default DeveloperAssociateArticle
