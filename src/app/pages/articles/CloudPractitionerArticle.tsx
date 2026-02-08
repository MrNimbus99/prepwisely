import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const CloudPractitionerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-cloud-practitioner-clf-c02"
      certName="AWS Certified Cloud Practitioner"
      certCode="CLF-C02"
      level="Foundational"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Cloud Concepts (24%)',
        'Security and Compliance (30%)',
        'Cloud Technology and Services (34%)',
        'Billing, Pricing, and Support (12%)'
      ]}
      domainTasks={[
        {
          domain: 'Cloud Concepts (24%)',
          tasks: [
            'Define benefits of AWS Cloud (high availability, elasticity, agility, global reach)',
            'Identify AWS Well-Architected Framework pillars (operational excellence, security, reliability, performance efficiency, cost optimization, sustainability)',
            'Understand cloud migration strategies and AWS Cloud Adoption Framework (CAF)',
            'Understand cloud economics (fixed vs variable costs, rightsizing, economies of scale)'
          ]
        },
        {
          domain: 'Security and Compliance (30%)',
          tasks: [
            'Understand AWS shared responsibility model and differences by service type',
            'Identify compliance resources (AWS Artifact) and security services (GuardDuty, Security Hub, Inspector, Shield)',
            'Implement IAM best practices (least privilege, MFA, root user protection, IAM Identity Center)',
            'Understand encryption in transit and at rest, and governance services (CloudTrail, Config, Control Tower)'
          ]
        },
        {
          domain: 'Cloud Technology and Services (34%)',
          tasks: [
            'Choose deployment methods (Console, CLI, SDK, IaC) and understand deployment models',
            'Understand AWS global infrastructure (Regions, AZs, edge locations) and when to use multi-Region',
            'Identify compute services (EC2, Lambda, ECS, EKS, Fargate) and their use cases',
            'Identify database services (RDS, Aurora, DynamoDB, ElastiCache) and migration tools (DMS, SCT)',
            'Identify network services (VPC, Route 53, Direct Connect, VPN) and security controls',
            'Identify storage services (S3, EBS, EFS, FSx, Storage Gateway) and lifecycle policies',
            'Identify AI/ML services (SageMaker, Lex, Kendra) and analytics services (Athena, Kinesis, Glue, QuickSight)',
            'Identify application integration (EventBridge, SNS, SQS) and developer tools (CodeBuild, CodePipeline, X-Ray)'
          ]
        },
        {
          domain: 'Billing, Pricing, and Support (12%)',
          tasks: [
            'Compare pricing models (On-Demand, Reserved, Spot, Savings Plans, Dedicated Hosts)',
            'Use billing tools (Budgets, Cost Explorer, Pricing Calculator, Cost & Usage Reports)',
            'Understand consolidated billing, cost allocation tags, and AWS Organizations',
            'Identify AWS Support plans and technical resources (whitepapers, Knowledge Center, re:Post, Trusted Advisor)'
          ]
        }
      ]}
    />
  )
}

export default CloudPractitionerArticle
