import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const SolutionsArchitectAssociateArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="solutions-architect-associate"
      certName="AWS Certified Solutions Architect – Associate"
      certCode="SAA-C03"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Design Secure Architectures',
        'Design Resilient Architectures',
        'Design High-Performing Architectures',
        'Design Cost-Optimized Architectures'
      ]}
    />
  )
}

export default SolutionsArchitectAssociateArticle
