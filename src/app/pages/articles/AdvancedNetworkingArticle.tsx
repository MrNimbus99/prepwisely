import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const AdvancedNetworkingArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-advanced-networking-specialty-ans-c01"
      certName="AWS Certified Advanced Networking – Specialty"
      certCode="ANS-C01"
      level="Specialty"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Network Design (30%)',
        'Network Implementation (26%)',
        'Network Management and Operation (20%)',
        'Network Security, Compliance, and Governance (24%)'
      ]}
    />
  )
}

export default AdvancedNetworkingArticle
