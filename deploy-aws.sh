#!/bin/bash

# PrepWisely AWS Deployment Script
# Deploy infrastructure and application to AWS

set -e

# Configuration
AWS_REGION="us-east-1"
S3_STACK_NAME="prepwisely-s3-stack"
CLOUDFRONT_STACK_NAME="prepwisely-cloudfront-stack"
ENVIRONMENT="prod"

echo "🚀 Deploying PrepWisely to AWS"
echo "Region: $AWS_REGION"
echo "Environment: $ENVIRONMENT"

# Check prerequisites
echo "🔍 Checking prerequisites..."
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install AWS CLI first."
    exit 1
fi

# Verify AWS credentials
echo "🔐 Verifying AWS credentials..."
aws sts get-caller-identity > /dev/null || {
    echo "❌ AWS credentials not configured. Run 'aws configure' first."
    exit 1
}

echo "✅ Prerequisites met!"

# Deploy S3 Stack
echo "📦 Deploying S3 Stack..."
aws cloudformation deploy \
    --template-file infrastructure/s3-stack.yaml \
    --stack-name $S3_STACK_NAME \
    --parameter-overrides Environment=$ENVIRONMENT \
    --tags Project=PrepWisely Environment=$ENVIRONMENT \
    --region $AWS_REGION \
    --no-fail-on-empty-changeset

echo "✅ S3 Stack deployed successfully!"

# Deploy CloudFront Stack
echo "📡 Deploying CloudFront Stack..."
aws cloudformation deploy \
    --template-file infrastructure/cloudfront-stack.yaml \
    --stack-name $CLOUDFRONT_STACK_NAME \
    --parameter-overrides S3StackName=$S3_STACK_NAME Environment=$ENVIRONMENT \
    --tags Project=PrepWisely Environment=$ENVIRONMENT \
    --region $AWS_REGION \
    --no-fail-on-empty-changeset

echo "✅ CloudFront Stack deployed successfully!"

# Get stack outputs
echo "📋 Getting stack outputs..."
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name $S3_STACK_NAME \
    --region $AWS_REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --output text)

DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name $CLOUDFRONT_STACK_NAME \
    --region $AWS_REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
    --output text)

WEBSITE_URL=$(aws cloudformation describe-stacks \
    --stack-name $CLOUDFRONT_STACK_NAME \
    --region $AWS_REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`WebsiteURL`].OutputValue' \
    --output text)

echo "S3 Bucket: $BUCKET_NAME"
echo "CloudFront Distribution: $DISTRIBUTION_ID"
echo "Website URL: $WEBSITE_URL"

# Build application
echo "🏗️  Building application..."
npm run build

# Deploy to S3
echo "⬆️  Deploying to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "*.json" \
    --exclude "*.txt" \
    --region $AWS_REGION

aws s3 sync dist/ s3://$BUCKET_NAME \
    --cache-control "public, max-age=0, must-revalidate" \
    --include "*.html" \
    --include "*.json" \
    --include "*.txt" \
    --region $AWS_REGION

# Invalidate CloudFront
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --output table

echo ""
echo "🎉 Deployment Complete!"
echo "🌐 Website URL: $WEBSITE_URL"
echo ""
echo "📊 Stack Information:"
echo "S3 Stack: $S3_STACK_NAME"
echo "CloudFront Stack: $CLOUDFRONT_STACK_NAME"
echo "S3 Bucket: $BUCKET_NAME"
echo "Distribution ID: $DISTRIBUTION_ID"
