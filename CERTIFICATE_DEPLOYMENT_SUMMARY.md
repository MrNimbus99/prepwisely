# Certificate Generation System - Deployment Summary

## ✅ Successfully Deployed

### Infrastructure
- **Lambda Function**: `nestedcerts-certificate-generator-prod`
  - Runtime: Node.js 20.x
  - Memory: 512 MB
  - Timeout: 30 seconds
  - Status: Active ✓

- **S3 Bucket**: `nestedcerts-certificates-prod-947977408385`
  - Public read access for certificates
  - Versioning enabled
  - CORS configured for nestedcerts.com

- **API Gateway**: `https://yxa4lhwakg.execute-api.ap-southeast-2.amazonaws.com/prod/generate`
  - Method: POST
  - Authentication: None (uses Cognito access token in request body)
  - CORS enabled

- **Certificate Template**: Stored in `s3://prepwisely-app-prod-947977408385/Certificate/`

### Frontend Integration
- Certificate download button added to certification detail pages
- Button only appears when all 32 quizzes/exams are completed (100% progress)
- Located next to "Practice Quizzes" and "Flagged Questions" tabs
- Shows loading state while generating certificate

## How It Works

### User Flow
1. User completes all 32 quizzes/exams for a certification
2. "Download Certificate" button appears with Award icon
3. User clicks button
4. Frontend:
   - Gets Cognito access token from current session
   - Calls certificate API with token and cert code
5. Lambda:
   - Validates access token with Cognito
   - Retrieves user's name from Cognito attributes (uses `name`, or `given_name + family_name`)
   - Loads PDF template from S3
   - Generates certificate with:
     * User's full name (centered, large font)
     * Certification title (centered)
     * Completion date (bottom left)
     * Serial number: `NC-{CERT_CODE}-{TIMESTAMP}` (bottom right)
   - Saves PDF to S3
   - Returns download URL
6. Browser automatically downloads the certificate

### Certificate Details
- **Format**: PDF
- **Template**: Professional design with NestedCerts branding
- **Personalization**:
  - User's name from Cognito (NOT email)
  - Certification name (e.g., "AWS Certified Cloud Practitioner")
  - Completion date (formatted: "February 9, 2026")
  - Unique serial number for verification

### Supported Certifications (13 total)
1. AWS Certified Cloud Practitioner (CLF-C02)
2. AWS Certified AI Practitioner (AIF-C01)
3. AWS Certified Solutions Architect – Associate (SAA-C03)
4. AWS Certified Developer – Associate (DVA-C02)
5. AWS Certified SysOps Administrator – Associate (SOA-C03)
6. AWS Certified Data Engineer – Associate (DEA-C01)
7. AWS Certified Machine Learning Engineer – Associate (MLA-C01)
8. AWS Certified Solutions Architect – Professional (SAP-C02)
9. AWS Certified DevOps Engineer – Professional (DOP-C02)
10. AWS Certified Generative AI Developer – Professional (AIP-C01)
11. AWS Certified Advanced Networking – Specialty (ANS-C01)
12. AWS Certified Security – Specialty (SCS-C03)
13. AWS Certified Machine Learning – Specialty (MLS-C01)

## Security

### Authentication
- Uses Cognito access tokens (no IAM signing required)
- Token validated by Lambda via Cognito GetUser API
- No user data stored in DynamoDB - all from Cognito

### Permissions
- Lambda has minimal permissions:
  - Read template from S3 (prepwisely-app bucket)
  - Write certificates to S3 (certificates bucket)
  - Get user info from Cognito
- Certificates bucket allows public read (for downloads)

### Data Privacy
- Certificates stored with user ID in path: `certificates/{userId}/{certCode}-{timestamp}.pdf`
- No PII in certificate metadata
- Serial numbers are unique but not personally identifiable

## Monitoring

### CloudWatch Logs
```bash
aws logs tail /aws/lambda/nestedcerts-certificate-generator-prod --follow --region ap-southeast-2
```

### Check Generated Certificates
```bash
aws s3 ls s3://nestedcerts-certificates-prod-947977408385/certificates/ --recursive --region ap-southeast-2
```

### Lambda Metrics
- Invocations
- Duration
- Errors
- Throttles

## Cost Estimate

### Per Certificate
- Lambda: ~$0.0002 (512MB, ~5 seconds)
- S3 Storage: ~$0.000023/month per certificate
- S3 GET requests: ~$0.0000004 per download
- API Gateway: ~$0.0000035 per request

### Monthly (assuming 100 certificates/month)
- Lambda: $0.02
- S3 Storage: $0.002
- S3 Requests: $0.0001
- API Gateway: $0.0004
- **Total: ~$0.02/month**

## Troubleshooting

### Certificate not generating
1. Check Lambda logs for errors
2. Verify user has completed all 32 quizzes
3. Check Cognito user has 'name' attribute set
4. Verify template PDF exists in S3

### Download link not working
1. Check S3 bucket policy allows public read
2. Verify CORS configuration
3. Check certificate was uploaded successfully

### Button not appearing
1. Verify all 32 quizzes show as completed
2. Check browser console for errors
3. Verify user is logged in

## Files Changed

### New Files
- `lambda/certificate-generator/index.mjs` - Lambda function
- `lambda/certificate-generator/package.json` - Dependencies
- `cloudformation/certificate-system.yaml` - Infrastructure
- `deploy-certificate-system.sh` - Deployment script
- `src/app/utils/certificateService.ts` - Frontend service
- `CERTIFICATE_SYSTEM.md` - Documentation
- `test-certificate-system.sh` - Test instructions

### Modified Files
- `src/app/pages/CertificationDetailPage.tsx` - Added download button
- `package.json` - Removed unused AWS SDK dependencies

## Next Steps (Optional Enhancements)

1. **Email Certificates**: Send PDF via email after generation
2. **Certificate Verification**: Public page to verify serial numbers
3. **Custom Designs**: Different templates per certification level
4. **Social Sharing**: Share certificate on LinkedIn
5. **Certificate History**: Show all earned certificates in user profile
6. **Revocation System**: Ability to revoke certificates if needed

## Deployment Complete ✅

The certificate generation system is now live and ready for use. Users who complete all quizzes for any certification can download their personalized certificate immediately.

**Live URL**: https://nestedcerts.com
**API Endpoint**: https://yxa4lhwakg.execute-api.ap-southeast-2.amazonaws.com/prod/generate
**Status**: Production Ready ✓
