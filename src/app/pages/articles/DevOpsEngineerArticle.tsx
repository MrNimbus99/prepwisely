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
        'SDLC Automation (22%)',
        'Configuration Management and IaC (17%)',
        'Resilient Cloud Solutions (15%)',
        'Monitoring and Logging (15%)',
        'Incident and Event Response (14%)',
        'Security and Compliance (17%)'
      ]}
    />
  )
}

export default DevOpsEngineerArticle
