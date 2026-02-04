#!/bin/bash

# PrepWisely AWS Infrastructure Setup
# This script sets up S3 + CloudFront for static website hosting

set -e

# Configuration
BUCKET_NAME="prepwisely-app-$(date +%s)"
REGION="us-east-1"
PROFILE="default"

echo "🚀 Setting up PrepWisely AWS Infrastructure..."
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"

# Create S3 bucket
echo "📦 Creating S3 bucket..."
aws s3 mb s3://$BUCKET_NAME --region $REGION --profile $PROFILE

# Configure bucket for static website hosting
echo "🌐 Configuring static website hosting..."
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document index.html \
  --profile $PROFILE

# Create bucket policy for public read access
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

# Apply bucket policy
echo "🔒 Setting bucket policy..."
aws s3api put-bucket-policy \
  --bucket $BUCKET_NAME \
  --policy file://bucket-policy.json \
  --profile $PROFILE

# Save configuration
echo "BUCKET_NAME=$BUCKET_NAME" > .env.aws
echo "REGION=$REGION" >> .env.aws
echo "PROFILE=$PROFILE" >> .env.aws

echo "✅ S3 bucket created successfully!"
echo "Bucket URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "Configuration saved to .env.aws"

# Clean up
rm bucket-policy.json

echo "🎯 Next: Run ./scripts/setup-cloudfront.sh to create CloudFront distribution"
