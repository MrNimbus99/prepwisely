#!/bin/bash

# Deploy to S3 with proper cache headers
BUCKET="prepwisely-app-prod-947977408385"
REGION="ap-southeast-2"
DIST_ID="E14K0R0EJ6FBGY"

echo "📦 Syncing files to S3..."
aws s3 sync dist/ s3://$BUCKET --delete --region $REGION

echo "🔧 Setting cache headers for SEO files..."
aws s3 cp s3://$BUCKET/robots.txt s3://$BUCKET/robots.txt \
  --metadata-directive REPLACE \
  --content-type "text/plain" \
  --cache-control "public, max-age=3600" \
  --region $REGION

aws s3 cp s3://$BUCKET/sitemap.xml s3://$BUCKET/sitemap.xml \
  --metadata-directive REPLACE \
  --content-type "application/xml" \
  --cache-control "public, max-age=3600" \
  --region $REGION

echo "♻️  Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths "/*" \
  --region $REGION \
  --query 'Invalidation.Id' \
  --output text

echo "✅ Deployment complete!"
