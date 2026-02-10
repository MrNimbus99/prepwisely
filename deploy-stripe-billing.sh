#!/bin/bash
set -e

REGION="ap-southeast-2"
WEBHOOK_STACK="stripe-webhook-prod"
BILLING_STACK="stripe-billing-api-prod"

echo "📦 Installing dependencies..."
cd lambda/billing-api && npm install --production && cd ../..
cd lambda/stripe-webhook && npm install --production && cd ../..

echo "📦 Packaging Lambdas..."
cd lambda/billing-api && zip -r ../billing-api.zip . -x "*.git*" && cd ../..
cd lambda/stripe-webhook && zip -r ../stripe-webhook.zip . -x "*.git*" && cd ../..

echo "🚀 Deploying Billing API stack..."
aws cloudformation deploy \
  --template-file cloudformation/stripe-billing-api.yaml \
  --stack-name $BILLING_STACK \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $REGION \
  --parameter-overrides Environment=prod

echo "📤 Uploading Billing API Lambda..."
BILLING_FUNCTION=$(aws cloudformation describe-stacks \
  --stack-name $BILLING_STACK \
  --region $REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`LambdaFunctionArn`].OutputValue' \
  --output text | awk -F: '{print $NF}')

aws lambda update-function-code \
  --function-name $BILLING_FUNCTION \
  --zip-file fileb://lambda/billing-api.zip \
  --region $REGION

aws lambda wait function-updated --function-name $BILLING_FUNCTION --region $REGION

echo "📤 Updating Webhook Lambda..."
WEBHOOK_FUNCTION=$(aws cloudformation describe-stacks \
  --stack-name $WEBHOOK_STACK \
  --region $REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`LambdaFunctionArn`].OutputValue' \
  --output text | awk -F: '{print $NF}')

aws lambda update-function-code \
  --function-name $WEBHOOK_FUNCTION \
  --zip-file fileb://lambda/stripe-webhook.zip \
  --region $REGION

aws lambda wait function-updated --function-name $WEBHOOK_FUNCTION --region $REGION

echo ""
echo "📋 Billing API URL:"
aws cloudformation describe-stacks \
  --stack-name $BILLING_STACK \
  --region $REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`BillingApiUrl`].OutputValue' \
  --output text

echo ""
echo "🎉 Deployment complete!"
