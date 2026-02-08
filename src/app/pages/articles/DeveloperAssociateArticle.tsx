import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const DeveloperAssociateArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="developer-associate"
      certName="AWS Certified Developer – Associate"
      certCode="DVA-C02"
      level="Associate"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Development with AWS Services (32%)',
        'Security (26%)',
        'Deployment (24%)',
        'Troubleshooting and Optimization (18%)'
      ]}
    />
  )
}

export default DeveloperAssociateArticle
