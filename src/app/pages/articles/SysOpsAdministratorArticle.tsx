import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const SysOpsAdministratorArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="sysops-administrator-associate"
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
    />
  )
}

export default SysOpsAdministratorArticle
