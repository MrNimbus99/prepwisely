import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const AIPractitionerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="ai-practitioner"
      certName="AWS Certified AI Practitioner"
      certCode="AIF-C01"
      level="Foundational"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Fundamentals of AI and ML',
        'Fundamentals of Generative AI',
        'Applications of Foundation Models',
        'Guidelines for Responsible AI',
        'Security, Compliance, and Governance for AI Solutions'
      ]}
    />
  )
}

export default AIPractitionerArticle
