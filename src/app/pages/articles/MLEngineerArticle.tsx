import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const MLEngineerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-machine-learning-engineer-associate-mla-c01"
      certName="AWS Certified Machine Learning Engineer – Associate"
      certCode="MLA-C01"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Data Preparation for ML (28%)',
        'ML Model Development (26%)',
        'Deployment and Orchestration of ML Workflows (22%)',
        'ML Solution Monitoring, Maintenance, and Security (24%)'
      ]}
    />
  )
}

export default MLEngineerArticle
