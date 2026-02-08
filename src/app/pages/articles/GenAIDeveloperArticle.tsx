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
        'Foundation Model Integration, Data Management, and Compliance (31%)',
        'Implementation and Integration (26%)',
        'AI Safety, Security, and Governance (20%)',
        'Operational Efficiency and Optimization (12%)',
        'Testing, Validation, and Troubleshooting (11%)'
      ]}
    />
  )
}

export default GenAIDeveloperArticle
