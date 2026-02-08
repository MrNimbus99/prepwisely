import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const DataEngineerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="data-engineer-associate"
      certName="AWS Certified Data Engineer – Associate"
      certCode="DEA-C01"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Data Ingestion and Transformation',
        'Data Store Management',
        'Data Operations and Support',
        'Data Security and Governance'
      ]}
    />
  )
}

export default DataEngineerArticle
