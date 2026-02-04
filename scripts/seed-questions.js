#!/usr/bin/env node

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

const QUESTIONS_TABLE = 'prepwisely-questions'

// Sample questions for Cloud Practitioner Quiz 1
const sampleQuestions = [
  {
    questionId: 'clp-q1-1',
    certId: 'cloud-practitioner',
    quizNumber: 1,
    question: 'What is the AWS shared responsibility model?',
    options: [
      'AWS is responsible for security OF the cloud, customers are responsible for security IN the cloud',
      'AWS is responsible for everything',
      'Customers are responsible for everything',
      'AWS and customers share all responsibilities equally'
    ],
    correctAnswer: 0,
    explanation: 'AWS manages security OF the cloud (infrastructure), while customers manage security IN the cloud (data, applications, access).',
    difficulty: 'easy'
  },
  {
    questionId: 'clp-q1-2',
    certId: 'cloud-practitioner',
    quizNumber: 1,
    question: 'Which AWS service provides object storage?',
    options: [
      'Amazon EBS',
      'Amazon S3',
      'Amazon EFS',
      'Amazon RDS'
    ],
    correctAnswer: 1,
    explanation: 'Amazon S3 (Simple Storage Service) provides scalable object storage for any type of data.',
    difficulty: 'easy'
  },
  {
    questionId: 'clp-q1-3',
    certId: 'cloud-practitioner',
    quizNumber: 1,
    question: 'What is Amazon EC2?',
    options: [
      'A database service',
      'A virtual server in the cloud',
      'A content delivery network',
      'A storage service'
    ],
    correctAnswer: 1,
    explanation: 'Amazon EC2 (Elastic Compute Cloud) provides resizable virtual servers in the cloud.',
    difficulty: 'easy'
  }
]

async function seedQuestions() {
  console.log('🌱 Seeding sample questions...')
  
  for (const question of sampleQuestions) {
    try {
      await dynamodb.put({
        TableName: QUESTIONS_TABLE,
        Item: question
      }).promise()
      console.log(`✅ Added question: ${question.questionId}`)
    } catch (error) {
      console.error(`❌ Error adding question ${question.questionId}:`, error)
    }
  }
  
  console.log('✅ Sample questions seeded successfully!')
}

seedQuestions().catch(console.error)
