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
        'Design Secure Architectures (30%)',
        'Design Resilient Architectures (26%)',
        'Design High-Performing Architectures (24%)',
        'Design Cost-Optimized Architectures (20%)'
      ]}
    />
  )
}

export default SolutionsArchitectAssociateArticle
