import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const CloudPractitionerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="cloud-practitioner"
      certName="AWS Certified Cloud Practitioner"
      certCode="CLF-C02"
      level="Foundational"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Cloud Concepts',
        'Security and Compliance',
        'Technology',
        'Billing and Pricing'
      ]}
    />
  )
}

export default CloudPractitionerArticle
