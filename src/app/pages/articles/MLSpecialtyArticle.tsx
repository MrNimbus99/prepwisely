import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const MLSpecialtyArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="machine-learning-specialty"
      certName="AWS Certified Machine Learning – Specialty"
      certCode="MLS-C01"
      level="Specialty"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Data Engineering (20%)',
        'Exploratory Data Analysis (24%)',
        'Modeling (36%)',
        'Machine Learning Implementation and Operations (20%)'
      ]}
    />
  )
}

export default MLSpecialtyArticle
