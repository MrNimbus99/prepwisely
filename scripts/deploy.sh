#!/bin/bash

# Deploy PrepWisely to AWS S3 + CloudFront
# Builds the app and deploys to AWS infrastructure

set -e

# Load configuration
if [ ! -f .env.aws ]; then
  echo "❌ .env.aws not found. Run setup scripts first"
  exit 1
fi

source .env.aws

echo "🏗️  Building PrepWisely for production..."

# Build the application
npm run build

echo "📦 Build complete! Deploying to AWS..."

# Sync to S3 bucket
echo "⬆️  Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --profile $PROFILE \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json"

# Upload HTML files with shorter cache
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --profile $PROFILE \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --include "*.json"

# Invalidate CloudFront cache if distribution exists
if [ ! -z "$DISTRIBUTION_ID" ]; then
  echo "🔄 Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --profile $PROFILE \
    --output table
fi

echo ""
echo "✅ Deployment complete!"
echo "🌐 S3 URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
if [ ! -z "$DOMAIN_NAME" ]; then
  echo "🚀 CloudFront URL: https://$DOMAIN_NAME"
fi
echo ""
echo "🎯 Your PrepWisely app is now live!"
