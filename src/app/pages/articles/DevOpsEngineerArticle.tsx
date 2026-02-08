import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const DevOpsEngineerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-devops-engineer-professional-dop-c02"
      certName="AWS Certified DevOps Engineer – Professional"
      certCode="DOP-C02"
      level="Professional"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'SDLC Automation (22%)',
        'Configuration Management and IaC (17%)',
        'Resilient Cloud Solutions (15%)',
        'Monitoring and Logging (15%)',
        'Incident and Event Response (14%)',
        'Security and Compliance (17%)'
      ]}
      domainTasks={[
        {
          domain: 'SDLC Automation (22%)',
          tasks: [
            'Implement CI/CD pipelines (CodePipeline, CodeBuild, CodeDeploy)',
            'Automate testing strategies (unit, integration, security)',
            'Implement deployment strategies (blue/green, canary, rolling)',
            'Integrate third-party tools into CI/CD workflows',
            'Implement artifact management and versioning'
          ]
        },
        {
          domain: 'Configuration Management and IaC (17%)',
          tasks: [
            'Manage infrastructure as code (CloudFormation, CDK, Terraform)',
            'Implement configuration management (Systems Manager, OpsWorks)',
            'Manage secrets and parameters securely',
            'Implement drift detection and remediation',
            'Version control infrastructure code'
          ]
        },
        {
          domain: 'Resilient Cloud Solutions (15%)',
          tasks: [
            'Design highly available architectures across AZs and Regions',
            'Implement auto-scaling strategies',
            'Design disaster recovery solutions',
            'Implement self-healing architectures',
            'Test resilience through chaos engineering'
          ]
        },
        {
          domain: 'Monitoring and Logging (15%)',
          tasks: [
            'Implement comprehensive monitoring (CloudWatch, X-Ray)',
            'Configure centralized logging solutions',
            'Create actionable alarms and notifications',
            'Implement distributed tracing',
            'Build operational dashboards'
          ]
        },
        {
          domain: 'Incident and Event Response (14%)',
          tasks: [
            'Automate incident response using EventBridge and Lambda',
            'Implement automated remediation workflows',
            'Configure event-driven architectures',
            'Implement runbook automation',
            'Perform root cause analysis'
          ]
        },
        {
          domain: 'Security and Compliance (17%)',
          tasks: [
            'Implement security at scale (Security Hub, GuardDuty)',
            'Automate compliance checks (Config, Systems Manager)',
            'Implement least privilege access controls',
            'Secure CI/CD pipelines',
            'Implement secrets rotation and management'
          ]
        }
      ]}
    />
  )
}

export default DevOpsEngineerArticle
