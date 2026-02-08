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
        'Incident Response',
        'Logging and Monitoring',
        'Infrastructure Security',
        'Identity and Access Management',
        'Data Protection'
      ]}
    />
  )
}

export default SecuritySpecialtyArticle
