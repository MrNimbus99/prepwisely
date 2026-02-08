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
        'Monitoring, Logging, Analysis, Remediation, Performance Optimization',
        'Reliability and Business Continuity',
        'Deployment, Provisioning, and Automation',
        'Security and Compliance',
        'Networking and Content Delivery'
      ]}
    />
  )
}

export default SysOpsAdministratorArticle
