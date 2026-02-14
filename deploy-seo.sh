#!/bin/bash
# Deploy SEO files to S3 + CloudFront

echo "Building..."
npm run build

echo "Uploading SEO files to S3..."
aws s3 cp dist/robots.txt s3://prepwisely-app-prod-947977408385/robots.txt --region ap-southeast-2 --content-type "text/plain"
aws s3 cp dist/sitemap.xml s3://prepwisely-app-prod-947977408385/sitemap.xml --region ap-southeast-2 --content-type "application/xml"
aws s3 cp dist/llms.txt s3://prepwisely-app-prod-947977408385/llms.txt --region ap-southeast-2 --content-type "text/plain"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id E14K0R0EJ6FBGY --paths "/robots.txt" "/sitemap.xml" "/llms.txt" --region ap-southeast-2

echo "Done! Verify at:"
echo "  https://nestedcerts.com/robots.txt"
echo "  https://nestedcerts.com/sitemap.xml"
echo "  https://nestedcerts.com/llms.txt"
