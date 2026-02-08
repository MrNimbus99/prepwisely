import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const SecuritySpecialtyArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-security-specialty-scs-c03"
      certName="AWS Certified Security – Specialty"
      certCode="SCS-C03"
      level="Specialty"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Detection (16%)',
        'Incident Response (14%)',
        'Infrastructure Security (18%)',
        'Identity and Access Management (20%)',
        'Data Protection (18%)',
        'Security Foundations and Governance (14%)'
      ]}
      domainTasks={[
        {
          domain: 'Detection (16%)',
          tasks: [
            'Design and implement monitoring solutions (CloudWatch, GuardDuty)',
            'Configure automated detection using Security Hub',
            'Analyze logs for security events (CloudTrail, VPC Flow Logs)',
            'Implement threat detection and anomaly detection',
            'Configure security alerting and notifications'
          ]
        },
        {
          domain: 'Incident Response (14%)',
          tasks: [
            'Respond to security incidents using AWS services',
            'Automate incident response workflows',
            'Perform forensic analysis on compromised resources',
            'Implement automated remediation actions',
            'Document and improve incident response procedures'
          ]
        },
        {
          domain: 'Infrastructure Security (18%)',
          tasks: [
            'Implement edge security (CloudFront, WAF, Shield)',
            'Secure compute resources (EC2, containers, Lambda)',
            'Design secure network architectures (VPC, security groups, NACLs)',
            'Implement Network Firewall and traffic inspection',
            'Secure API endpoints and application layers'
          ]
        },
        {
          domain: 'Identity and Access Management (20%)',
          tasks: [
            'Design and implement IAM policies following least privilege',
            'Implement federated access (IAM Identity Center, SAML)',
            'Configure authentication strategies (Cognito, IAM)',
            'Implement cross-account access securely',
            'Audit and validate IAM configurations'
          ]
        },
        {
          domain: 'Data Protection (18%)',
          tasks: [
            'Implement encryption at rest and in transit (KMS, ACM)',
            'Manage secrets securely (Secrets Manager, Parameter Store)',
            'Implement data classification and protection strategies',
            'Configure S3 security controls and encryption',
            'Implement database encryption and key rotation'
          ]
        },
        {
          domain: 'Security Foundations and Governance (14%)',
          tasks: [
            'Implement security governance frameworks',
            'Configure compliance monitoring (Config, Audit Manager)',
            'Implement security baselines and standards',
            'Manage security at scale across multiple accounts',
            'Implement automated compliance checks and reporting'
          ]
        }
      ]}
    />
  )
}

export default SecuritySpecialtyArticle
