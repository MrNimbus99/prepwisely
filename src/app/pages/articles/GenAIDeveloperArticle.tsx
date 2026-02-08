import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const GenAIDeveloperArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="generative-ai-developer-professional"
      certName="AWS Certified Generative AI Developer – Professional"
      certCode="AIP-C01"
      level="Professional"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Generative AI Fundamentals',
        'Foundation Models',
        'Application Development',
        'Security and Governance'
      ]}
    />
  )
}

export default GenAIDeveloperArticle
