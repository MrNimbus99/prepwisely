import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const AIPractitionerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-ai-practitioner-aif-c01"
      certName="AWS Certified AI Practitioner"
      certCode="AIF-C01"
      level="Foundational"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Fundamentals of AI and ML (20%)',
        'Fundamentals of Generative AI (24%)',
        'Applications of Foundation Models (28%)',
        'Guidelines for Responsible AI (14%)',
        'Security, Compliance, and Governance for AI Solutions (14%)'
      ]}
    />
  )
}

export default AIPractitionerArticle
