import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const CloudOpsEngineerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-cloudops-engineer-associate-soa-c03"
      certName="AWS Certified CloudOps Engineer – Associate"
      certCode="SOA-C03"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Monitoring, Logging, Analysis, Remediation, Performance Optimization (22%)',
        'Reliability and Business Continuity (22%)',
        'Deployment, Provisioning, and Automation (22%)',
        'Security and Compliance (16%)',
        'Networking and Content Delivery (18%)'
      ]}
      domainTasks={[
        {
          domain: 'Monitoring, Logging, Analysis, Remediation, Performance Optimization (22%)',
          tasks: [
            'Implement and manage CloudWatch metrics, logs, and alarms',
            'Configure automated remediation using EventBridge and Systems Manager',
            'Analyze logs and metrics to identify performance issues',
            'Create dashboards for operational visibility',
            'Optimize resource performance based on metrics'
          ]
        },
        {
          domain: 'Reliability and Business Continuity (22%)',
          tasks: [
            'Implement backup and restore strategies (AWS Backup)',
            'Design and implement disaster recovery solutions',
            'Ensure high availability across multiple AZs',
            'Test recovery procedures and validate RTO/RPO',
            'Implement auto-scaling for reliability'
          ]
        },
        {
          domain: 'Deployment, Provisioning, and Automation (22%)',
          tasks: [
            'Deploy resources using CloudFormation and infrastructure as code',
            'Automate operational tasks using Systems Manager',
            'Implement patch management and maintenance windows',
            'Use AWS CLI and SDKs for automation',
            'Manage configuration drift and compliance'
          ]
        },
        {
          domain: 'Security and Compliance (16%)',
          tasks: [
            'Implement IAM policies and roles following least privilege',
            'Configure data encryption at rest and in transit',
            'Audit and validate security controls (Config, CloudTrail)',
            'Implement security group and NACL rules'
          ]
        },
        {
          domain: 'Networking and Content Delivery (18%)',
          tasks: [
            'Configure VPC components (subnets, route tables, gateways)',
            'Implement hybrid connectivity (VPN, Direct Connect)',
            'Configure Route 53 for DNS and traffic management',
            'Optimize content delivery using CloudFront',
            'Troubleshoot network connectivity issues'
          ]
        }
      ]}
    />
  )
}

export default CloudOpsEngineerArticle
