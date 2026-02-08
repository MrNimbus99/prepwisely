import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const SolutionsArchitectProfessionalArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-solutions-architect-professional-sap-c02"
      certName="AWS Certified Solutions Architect – Professional"
      certCode="SAP-C02"
      level="Professional"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Design Solutions for Organizational Complexity (26%)',
        'Design for New Solutions (29%)',
        'Continuous Improvement for Existing Solutions (25%)',
        'Accelerate Workload Migration and Modernization (20%)'
      ]}
    />
  )
}

export default SolutionsArchitectProfessionalArticle
