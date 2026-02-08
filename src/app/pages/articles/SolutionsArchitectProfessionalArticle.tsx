import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const SolutionsArchitectProfessionalArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="solutions-architect-professional"
      certName="AWS Certified Solutions Architect – Professional"
      certCode="SAP-C02"
      level="Professional"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Design Solutions for Organizational Complexity',
        'Design for New Solutions',
        'Continuous Improvement for Existing Solutions',
        'Accelerate Workload Migration and Modernization'
      ]}
    />
  )
}

export default SolutionsArchitectProfessionalArticle
