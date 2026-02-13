# NestedCerts Backend Setup

## DynamoDB Tables

### 1. Users Table (`prepwisely-users`)
Stores user subscription and ownership data:
```json
{
  "userId": "user-email@example.com",
  "subscription": "monthly|annual|lifetime|none",
  "ownedCerts": ["cloud-practitioner", "solutions-architect-associate"],
  "subscriptionStartDate": "2026-02-05T00:00:00Z",
  "subscriptionEndDate": "2026-03-05T00:00:00Z",
  "updatedAt": "2026-02-05T00:00:00Z"
}
```

### 2. Questions Table (`prepwisely-questions`)
Stores all exam questions:
```json
{
  "questionId": "clp-q1-1",
  "certId": "cloud-practitioner",
  "quizNumber": 1,
  "question": "What is AWS?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Detailed explanation...",
  "difficulty": "easy|medium|hard"
}
```

### 3. User Progress Table (`prepwisely-user-progress`)
Tracks quiz completions:
```json
{
  "userId": "user-email@example.com",
  "certQuizId": "cloud-practitioner#1",
  "certId": "cloud-practitioner",
  "quizId": 1,
  "score": 85,
  "passed": true,
  "completedAt": "2026-02-05T00:00:00Z"
}
```

## API Endpoints

All endpoints require Cognito authentication (Bearer token).

### User Management
- `GET /users/{userId}` - Get user data
- `PUT /users/{userId}` - Update user data

### Questions
- `GET /questions/{certId}/{quizNumber}` - Get questions for a quiz

### Progress
- `POST /progress/{userId}` - Save quiz completion
- `GET /progress/{userId}?certId={certId}` - Get user progress

## Deployment

### 1. Deploy DynamoDB Tables
```bash
./deploy-backend.sh
```

### 2. Update API Endpoint
After deployment, update `src/app/config/api-config.ts` with your API endpoint.

### 3. Seed Sample Questions
```bash
cd scripts
npm install aws-sdk
node seed-questions.js
```

## Security Features

- ✅ Cognito JWT authentication on all endpoints
- ✅ IAM roles with least privilege access
- ✅ CORS configured for frontend domain
- ✅ Point-in-time recovery enabled on all tables
- ✅ DynamoDB streams for audit logging
- ✅ Error handling and logging in all Lambda functions

## Cost Optimization

- Using DynamoDB On-Demand pricing (pay per request)
- Lambda functions with appropriate memory/timeout settings
- API Gateway with caching enabled (optional)

## Monitoring

CloudWatch logs automatically created for:
- All Lambda function executions
- API Gateway requests
- DynamoDB operations
