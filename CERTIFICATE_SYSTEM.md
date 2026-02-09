# Certificate Generation System

## Overview
Automatic PDF certificate generation for users who complete certification prep paths.

## Architecture
- **Lambda Function**: Generates PDF certificates using pdf-lib
- **S3 Bucket**: Stores generated certificates with public read access
- **API Gateway**: REST API with IAM authentication
- **DynamoDB**: User data for certificate personalization

## Deployment

### Prerequisites
- AWS CLI configured
- Node.js 20.x
- Existing prepwisely infrastructure deployed

### Deploy Certificate System
```bash
cd /home/althwabt/aws-certs/prepwisely
./deploy-certificate-system.sh
```

### Get API Endpoint
After deployment, get the API URL:
```bash
aws cloudformation describe-stacks \
  --stack-name nestedcerts-certificate-system-prod \
  --region ap-southeast-2 \
  --query 'Stacks[0].Outputs[?OutputKey==`CertificateApiUrl`].OutputValue' \
  --output text
```

### Update Frontend
Add the API URL to `.env`:
```
VITE_CERTIFICATE_API_URL=https://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod/generate
```

## Testing

### Test Certificate Generation
```bash
# Get user credentials from Cognito
# Then call the API with signed request

curl -X POST https://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod/generate \
  -H "Content-Type: application/json" \
  -d '{"userId":"USER_ID","certCode":"CLF-C02"}' \
  --aws-sigv4 "aws:amz:ap-southeast-2:execute-api"
```

## Certificate Template
- Location: `public/Certificate/nestedcerts_simple_colored_certificate.pdf`
- Fields replaced:
  - Full Name (from user profile)
  - Certification Title (from cert code)
  - Completion Date (current date)
  - Serial Number (generated: NC-{CERT}-{TIMESTAMP})

## Security
- API uses IAM authentication (AWS Signature V4)
- Certificates stored in public S3 bucket (read-only)
- User data retrieved from DynamoDB with proper IAM permissions

## Monitoring
- Lambda logs: CloudWatch Logs
- API Gateway logs: CloudWatch Logs
- S3 access logs: (optional, can be enabled)

## Cost Estimate
- Lambda: ~$0.20 per 1000 certificates
- S3 Storage: ~$0.023 per GB/month
- API Gateway: ~$3.50 per million requests
- Data Transfer: ~$0.09 per GB

## Troubleshooting

### Certificate not generating
1. Check Lambda logs in CloudWatch
2. Verify user exists in DynamoDB
3. Check S3 bucket permissions
4. Verify template PDF exists in S3

### Download link not working
1. Check S3 bucket policy allows public read
2. Verify CORS configuration
3. Check certificate was uploaded successfully

## Future Enhancements
- Email certificate to user
- Certificate verification page
- Custom certificate designs per certification level
- Certificate revocation system
