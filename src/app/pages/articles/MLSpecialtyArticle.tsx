import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const MLSpecialtyArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-machine-learning-specialty-mls-c01"
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
      domainTasks={[
        {
          domain: 'Data Engineering (20%)',
          tasks: [
            'Create data repositories for ML (S3, Feature Store)',
            'Implement data ingestion solutions for ML workloads',
            'Transform data for ML (Glue, EMR, SageMaker Processing)',
            'Implement data pipelines for ML workflows',
            'Ensure data quality and validation'
          ]
        },
        {
          domain: 'Exploratory Data Analysis (24%)',
          tasks: [
            'Perform statistical analysis and visualization',
            'Identify data distributions and outliers',
            'Perform feature engineering and selection',
            'Handle missing data and imbalanced datasets',
            'Analyze feature importance and correlations'
          ]
        },
        {
          domain: 'Modeling (36%)',
          tasks: [
            'Frame business problems as ML problems',
            'Select appropriate algorithms for different use cases',
            'Train and tune ML models using SageMaker',
            'Perform hyperparameter optimization',
            'Evaluate model performance using appropriate metrics',
            'Implement ensemble methods and model stacking',
            'Address overfitting and underfitting'
          ]
        },
        {
          domain: 'Machine Learning Implementation and Operations (20%)',
          tasks: [
            'Deploy ML models to production (endpoints, batch transform)',
            'Implement A/B testing for models',
            'Monitor model performance and detect drift',
            'Implement model retraining strategies',
            'Optimize inference costs and latency',
            'Implement MLOps best practices'
          ]
        }
      ]}
    />
  )
}

export default MLSpecialtyArticle
