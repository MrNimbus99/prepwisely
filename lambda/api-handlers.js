const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

const TABLES = {
  USERS: process.env.USERS_TABLE || 'prepwisely-users',
  QUESTIONS: process.env.QUESTIONS_TABLE || 'prepwisely-questions',
  PROGRESS: process.env.PROGRESS_TABLE || 'prepwisely-user-progress'
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Content-Type': 'application/json'
}

// Get user data
exports.getUser = async (event) => {
  try {
    const userId = event.pathParameters.userId
    
    const result = await dynamodb.get({
      TableName: TABLES.USERS,
      Key: { userId }
    }).promise()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Item || {})
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get user data' })
    }
  }
}

// Update user (subscriptions, owned certs)
exports.updateUser = async (event) => {
  try {
    const userId = event.pathParameters.userId
    const data = JSON.parse(event.body)

    await dynamodb.put({
      TableName: TABLES.USERS,
      Item: {
        userId,
        ...data,
        updatedAt: new Date().toISOString()
      }
    }).promise()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to update user' })
    }
  }
}

// Get questions for quiz
exports.getQuestions = async (event) => {
  try {
    const { certId, quizNumber } = event.pathParameters

    const result = await dynamodb.query({
      TableName: TABLES.QUESTIONS,
      IndexName: 'certId-index',
      KeyConditionExpression: 'certId = :certId',
      FilterExpression: 'quizNumber = :quizNumber',
      ExpressionAttributeValues: {
        ':certId': certId,
        ':quizNumber': parseInt(quizNumber)
      }
    }).promise()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Items || [])
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get questions' })
    }
  }
}

// Save progress
exports.saveProgress = async (event) => {
  try {
    const userId = event.pathParameters.userId
    const { certId, quizId, score, passed } = JSON.parse(event.body)

    await dynamodb.put({
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
    }).promise()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to save progress' })
    }
  }
}

// Get user progress
exports.getUserProgress = async (event) => {
  try {
    const userId = event.pathParameters.userId
    const certId = event.queryStringParameters?.certId

    const params = {
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

    const result = await dynamodb.query(params).promise()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Items || [])
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get progress' })
    }
  }
}
