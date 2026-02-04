import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' })
const docClient = DynamoDBDocumentClient.from(client)

const TABLES = {
  USERS: 'prepwisely-users',
  QUESTIONS: 'prepwisely-questions',
  PROGRESS: 'prepwisely-user-progress'
}

// Get user data (subscriptions, owned certs)
export const getUser = async (userId: string) => {
  try {
    const response = await docClient.send(new GetCommand({
      TableName: TABLES.USERS,
      Key: { userId }
    }))
    return response.Item
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

// Update user subscriptions/owned certs
export const updateUser = async (userId: string, data: any) => {
  try {
    await docClient.send(new PutCommand({
      TableName: TABLES.USERS,
      Item: {
        userId,
        ...data,
        updatedAt: new Date().toISOString()
      }
    }))
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Get questions for a certification
export const getQuestions = async (certId: string, quizNumber: number) => {
  try {
    const response = await docClient.send(new QueryCommand({
      TableName: TABLES.QUESTIONS,
      IndexName: 'certId-index',
      KeyConditionExpression: 'certId = :certId',
      FilterExpression: 'quizNumber = :quizNumber',
      ExpressionAttributeValues: {
        ':certId': certId,
        ':quizNumber': quizNumber
      }
    }))
    return response.Items || []
  } catch (error) {
    console.error('Error getting questions:', error)
    throw error
  }
}

// Save user progress
export const saveProgress = async (userId: string, certId: string, quizId: number, score: number, passed: boolean) => {
  try {
    await docClient.send(new PutCommand({
      TableName: TABLES.PROGRESS,
      Item: {
        userId,
        certQuizId: `${certId}#${quizId}`,
        certId,
        quizId,
        score,
        passed,
        completedAt: new Date().toISOString()
      }
    }))
  } catch (error) {
    console.error('Error saving progress:', error)
    throw error
  }
}

// Get user progress for a certification
export const getUserProgress = async (userId: string, certId?: string) => {
  try {
    const params: any = {
      TableName: TABLES.PROGRESS,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }

    if (certId) {
      params.KeyConditionExpression += ' AND begins_with(certQuizId, :certId)'
      params.ExpressionAttributeValues[':certId'] = certId
    }

    const response = await docClient.send(new QueryCommand(params))
    return response.Items || []
  } catch (error) {
    console.error('Error getting user progress:', error)
    throw error
  }
}

export { TABLES }
