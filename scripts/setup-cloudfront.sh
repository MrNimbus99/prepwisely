#!/bin/bash

# CloudFront Distribution Setup for PrepWisely
# Creates a CloudFront distribution for global CDN

set -e

# Load configuration
if [ ! -f .env.aws ]; then
  echo "❌ .env.aws not found. Run ./scripts/setup-s3.sh first"
  exit 1
fi

source .env.aws

echo "🌍 Setting up CloudFront distribution..."
echo "S3 Origin: $BUCKET_NAME.s3-website-$REGION.amazonaws.com"

# Create CloudFront distribution configuration
cat > cloudfront-config.json << EOF
{
  "CallerReference": "prepwisely-$(date +%s)",
  "Comment": "PrepWisely Static Website Distribution",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$BUCKET_NAME",
        "DomainName": "$BUCKET_NAME.s3-website-$REGION.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$BUCKET_NAME",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF

# Create CloudFront distribution
echo "📡 Creating CloudFront distribution..."
DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json \
  --profile $PROFILE \
  --output json)

# Extract distribution ID and domain name
DISTRIBUTION_ID=$(echo $DISTRIBUTION_OUTPUT | jq -r '.Distribution.Id')
DOMAIN_NAME=$(echo $DISTRIBUTION_OUTPUT | jq -r '.Distribution.DomainName')

# Save to configuration
echo "DISTRIBUTION_ID=$DISTRIBUTION_ID" >> .env.aws
echo "DOMAIN_NAME=$DOMAIN_NAME" >> .env.aws

echo "✅ CloudFront distribution created successfully!"
echo "Distribution ID: $DISTRIBUTION_ID"
echo "Domain Name: https://$DOMAIN_NAME"
echo "Status: Deploying (this may take 10-15 minutes)"

# Clean up
rm cloudfront-config.json

echo ""
echo "🎯 Your site will be available at: https://$DOMAIN_NAME"
echo "🔄 Run ./scripts/deploy.sh to build and deploy your app"
