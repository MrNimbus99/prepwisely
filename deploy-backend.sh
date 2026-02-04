#!/bin/bash

set -e

echo "🚀 Deploying PrepWisely Backend Infrastructure..."

# Get AWS region
REGION=${AWS_REGION:-us-east-1}
STACK_PREFIX="prepwisely"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📦 Step 1: Deploying DynamoDB Tables...${NC}"
aws cloudformation deploy \
  --template-file infrastructure/dynamodb-tables.yaml \
  --stack-name ${STACK_PREFIX}-dynamodb \
  --region $REGION \
  --capabilities CAPABILITY_IAM

echo -e "${GREEN}✅ DynamoDB tables deployed${NC}"

# Get Cognito User Pool ID
echo -e "${BLUE}📦 Step 2: Getting Cognito User Pool ID...${NC}"
USER_POOL_ID=$(aws cognito-idp list-user-pools --max-results 10 --region $REGION \
  --query "UserPools[?Name=='prepwisely-user-pool'].Id" --output text)

if [ -z "$USER_POOL_ID" ]; then
  echo "❌ Error: Cognito User Pool not found. Please deploy authentication first."
  exit 1
fi

echo -e "${GREEN}✅ Found User Pool: $USER_POOL_ID${NC}"

# Package Lambda functions
echo -e "${BLUE}📦 Step 3: Packaging Lambda functions...${NC}"
cd lambda
npm install --production
cd ..

echo -e "${BLUE}📦 Step 4: Deploying API Gateway and Lambda Functions...${NC}"
aws cloudformation deploy \
  --template-file infrastructure/api-gateway.yaml \
  --stack-name ${STACK_PREFIX}-api \
  --region $REGION \
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
  --parameter-overrides CognitoUserPoolId=$USER_POOL_ID

echo -e "${GREEN}✅ API Gateway and Lambda functions deployed${NC}"

# Get API endpoint
API_ENDPOINT=$(aws cloudformation describe-stacks \
  --stack-name ${STACK_PREFIX}-api \
  --region $REGION \
  --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" \
  --output text)

echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "API Endpoint: $API_ENDPOINT"
echo ""
echo "Next steps:"
echo "1. Update src/app/config/api-config.ts with the API endpoint"
echo "2. Run sample data script to populate questions"
echo ""
