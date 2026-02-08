import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const DevOpsEngineerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="devops-engineer-professional"
      certName="AWS Certified DevOps Engineer – Professional"
      certCode="DOP-C02"
      level="Professional"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'SDLC Automation',
        'Configuration Management and IaC',
        'Monitoring and Logging',
        'Policies and Standards Automation',
        'Incident and Event Response',
        'High Availability, Fault Tolerance, and Disaster Recovery'
      ]}
    />
  )
}

export default DevOpsEngineerArticle
