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
        'Data Ingestion and Transformation (34%)',
        'Data Store Management (26%)',
        'Data Operations and Support (22%)',
        'Data Security and Governance (18%)'
      ]}
    />
  )
}

export default DataEngineerArticle
