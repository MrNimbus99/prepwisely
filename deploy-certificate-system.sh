#!/bin/bash
set -e

ENVIRONMENT="prod"
STACK_NAME="nestedcerts-certificate-system-${ENVIRONMENT}"
REGION="ap-southeast-2"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "🚀 Deploying Certificate Generation System..."
echo "Environment: $ENVIRONMENT"
echo "Region: $REGION"
echo "Account: $ACCOUNT_ID"

# Step 1: Install Lambda dependencies
echo ""
echo "📦 Installing Lambda dependencies..."
cd lambda/certificate-generator
npm install
cd ../..

# Step 2: Package Lambda function
echo ""
echo "📦 Packaging Lambda function..."
cd lambda/certificate-generator
zip -r ../../certificate-lambda.zip . -x "*.git*" "node_modules/.cache/*"
cd ../..

# Step 3: Upload Lambda package to S3 (using existing app bucket temporarily)
echo ""
echo "📤 Uploading Lambda package to S3..."
aws s3 cp certificate-lambda.zip s3://prepwisely-app-${ENVIRONMENT}-${ACCOUNT_ID}/lambda/ --region $REGION

# Step 4: Deploy CloudFormation stack
echo ""
echo "☁️  Deploying CloudFormation stack..."
aws cloudformation deploy \
  --template-file cloudformation/certificate-system.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides \
    Environment=$ENVIRONMENT \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $REGION

# Step 5: Get Lambda function name and update code
echo ""
echo "🔄 Updating Lambda function code..."
LAMBDA_FUNCTION=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`LambdaFunctionArn`].OutputValue' \
  --output text | cut -d':' -f7)

aws lambda update-function-code \
  --function-name $LAMBDA_FUNCTION \
  --zip-file fileb://certificate-lambda.zip \
  --region $REGION

# Wait for update to complete
echo "⏳ Waiting for Lambda update to complete..."
aws lambda wait function-updated \
  --function-name $LAMBDA_FUNCTION \
  --region $REGION

# Step 6: Get outputs
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Stack Outputs:"
aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
  --output table

# Cleanup
rm certificate-lambda.zip

echo ""
echo "🎉 Certificate system deployed successfully!"
echo ""
echo "Next steps:"
echo "1. Update frontend with API endpoint"
echo "2. Test certificate generation"
echo "3. Verify S3 bucket access"
