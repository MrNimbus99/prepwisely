import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const AdvancedNetworkingArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="advanced-networking-specialty"
      certName="AWS Certified Advanced Networking – Specialty"
      certCode="ANS-C01"
      level="Specialty"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Network Design',
        'Network Implementation',
        'Network Management and Operation',
        'Network Security, Compliance, and Governance'
      ]}
    />
  )
}

export default AdvancedNetworkingArticle
