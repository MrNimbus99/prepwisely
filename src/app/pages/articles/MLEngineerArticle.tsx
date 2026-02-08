import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const MLEngineerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="machine-learning-engineer-associate"
      certName="AWS Certified Machine Learning Engineer – Associate"
      certCode="MLA-C01"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Data Preparation for ML',
        'ML Model Development',
        'Deployment and Orchestration of ML Workflows',
        'ML Solution Monitoring, Maintenance, and Security'
      ]}
    />
  )
}

export default MLEngineerArticle
