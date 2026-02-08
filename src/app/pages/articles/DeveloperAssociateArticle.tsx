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
        'Development with AWS Services',
        'Security',
        'Deployment',
        'Troubleshooting and Optimization'
      ]}
    />
  )
}

export default DeveloperAssociateArticle
