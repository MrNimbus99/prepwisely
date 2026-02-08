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
        'Data Engineering',
        'Exploratory Data Analysis',
        'Modeling',
        'Machine Learning Implementation and Operations'
      ]}
    />
  )
}

export default MLSpecialtyArticle
