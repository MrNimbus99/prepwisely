import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const SecuritySpecialtyArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="security-specialty"
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
    />
  )
}

export default SecuritySpecialtyArticle
