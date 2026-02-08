import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const CloudPractitionerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-cloud-practitioner-clf-c02"
      certName="AWS Certified Cloud Practitioner"
      certCode="CLF-C02"
      level="Foundational"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Cloud Concepts (24%)',
        'Security and Compliance (30%)',
        'Cloud Technology and Services (34%)',
        'Billing, Pricing, and Support (12%)'
      ]}
    />
  )
}

export default CloudPractitionerArticle
