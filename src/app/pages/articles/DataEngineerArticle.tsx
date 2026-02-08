import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const DataEngineerArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-data-engineer-associate-dea-c01"
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
      domainTasks={[
        {
          domain: 'Data Ingestion and Transformation (34%)',
          tasks: [
            'Perform data ingestion from streaming sources (Kinesis, MSK)',
            'Perform data ingestion from batch sources (S3, databases)',
            'Transform and process data using AWS Glue',
            'Transform data using EMR and Spark',
            'Orchestrate data pipelines (MWAA, Step Functions, Glue workflows)'
          ]
        },
        {
          domain: 'Data Store Management (26%)',
          tasks: [
            'Choose appropriate data stores for different use cases',
            'Manage data lakes using S3 and Lake Formation',
            'Implement data warehousing solutions (Redshift)',
            'Use NoSQL databases for specific workloads (DynamoDB)',
            'Optimize data storage costs and performance'
          ]
        },
        {
          domain: 'Data Operations and Support (22%)',
          tasks: [
            'Automate data pipeline operations',
            'Monitor data pipelines and troubleshoot failures',
            'Implement data quality checks and validation',
            'Optimize pipeline performance and costs',
            'Maintain data pipeline documentation'
          ]
        },
        {
          domain: 'Data Security and Governance (18%)',
          tasks: [
            'Implement data encryption at rest and in transit',
            'Apply fine-grained access controls (Lake Formation, IAM)',
            'Implement data cataloging and metadata management',
            'Ensure compliance with data governance policies',
            'Audit data access using CloudTrail and Lake Formation'
          ]
        }
      ]}
    />
  )
}

export default DataEngineerArticle
