#!/bin/bash
set -e

REGION="ap-southeast-2"
STACK_NAME="stripe-webhook-prod"
LAMBDA_DIR="lambda/stripe-webhook"

echo "📦 Installing Lambda dependencies..."
cd $LAMBDA_DIR
npm install --production
cd ../..

echo "📦 Packaging Lambda..."
cd $LAMBDA_DIR
zip -r ../stripe-webhook.zip . -x "*.git*" "node_modules/.cache/*"
cd ../..

echo "🚀 Deploying CloudFormation stack..."
aws cloudformation deploy \
  --template-file cloudformation/stripe-webhook.yaml \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $REGION \
  --parameter-overrides Environment=prod

echo "📤 Uploading Lambda code..."
FUNCTION_NAME=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`LambdaFunctionArn`].OutputValue' \
  --output text | awk -F: '{print $NF}')

aws lambda update-function-code \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://lambda/stripe-webhook.zip \
  --region $REGION

echo "⏳ Waiting for Lambda update..."
aws lambda wait function-updated \
  --function-name $FUNCTION_NAME \
  --region $REGION

echo ""
echo "📋 Stack Outputs:"
aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs' \
  --output table

echo ""
echo "🎉 Webhook endpoint deployed successfully!"
echo ""
echo "⚠️  IMPORTANT: Copy the WebhookUrl from above and configure it in Stripe Dashboard:"
echo "   1. Go to https://dashboard.stripe.com/test/webhooks"
echo "   2. Click 'Add endpoint'"
echo "   3. Paste the WebhookUrl"
echo "   4. Select events: checkout.session.completed, customer.subscription.*, invoice.*"
echo "   5. Copy the webhook signing secret and add it to Secrets Manager"
