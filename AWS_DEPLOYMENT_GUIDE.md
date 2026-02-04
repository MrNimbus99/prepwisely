# AWS Deployment Guide

This guide will help you deploy PrepWisely to AWS using S3 for hosting and CloudFront for global CDN.

## Prerequisites

1. **AWS CLI** - [Install AWS CLI](https://aws.amazon.com/cli/)
2. **jq** - JSON processor for parsing AWS responses
3. **Node.js & npm** - For building the application

### Install Prerequisites (Ubuntu/Debian)
```bash
# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Install jq
sudo apt-get update
sudo apt-get install jq

# Verify installations
aws --version
jq --version
node --version
npm --version
```

### Install Prerequisites (macOS)
```bash
# Install AWS CLI
brew install awscli

# Install jq
brew install jq

# Verify installations
aws --version
jq --version
```

## AWS Configuration

1. **Configure AWS CLI**
```bash
aws configure
```
Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (recommend: `us-east-1`)
- Default output format: `json`

2. **Verify AWS Access**
```bash
aws sts get-caller-identity
```

## Deployment Steps

### Option 1: One-Command Setup (Recommended)

```bash
# Set up complete infrastructure and deploy
./aws-manager.sh setup
./aws-manager.sh deploy
```

### Option 2: Step-by-Step Setup

1. **Create S3 Bucket**
```bash
./scripts/setup-s3.sh
```

2. **Create CloudFront Distribution**
```bash
./scripts/setup-cloudfront.sh
```

3. **Deploy Application**
```bash
./scripts/deploy.sh
```

## Management Commands

```bash
# Check infrastructure status
./aws-manager.sh status

# Deploy updates
./aws-manager.sh deploy

# View deployment logs
./aws-manager.sh logs

# Destroy infrastructure (careful!)
./aws-manager.sh destroy
```

## What Gets Created

### S3 Bucket
- **Purpose**: Static website hosting
- **Configuration**: Public read access, website hosting enabled
- **Error handling**: Routes 404s to index.html (for SPA routing)

### CloudFront Distribution
- **Purpose**: Global CDN for fast content delivery
- **Features**: 
  - HTTPS redirect
  - Gzip compression
  - Global edge locations
  - Custom error pages
- **Cache**: 24 hours for assets, no cache for HTML

## URLs After Deployment

After successful deployment, you'll get:

1. **S3 Website URL**: `http://your-bucket-name.s3-website-us-east-1.amazonaws.com`
2. **CloudFront URL**: `https://your-distribution-id.cloudfront.net`

## Custom Domain (Optional)

To use a custom domain:

1. **Register domain** in Route 53 or external registrar
2. **Request SSL certificate** in AWS Certificate Manager
3. **Update CloudFront** distribution with custom domain
4. **Create Route 53** records pointing to CloudFront

## Costs Estimation

### S3 Costs
- **Storage**: ~$0.023/GB/month
- **Requests**: ~$0.0004/1000 requests
- **Data Transfer**: First 1GB free, then ~$0.09/GB

### CloudFront Costs
- **Data Transfer**: First 1TB free/month, then ~$0.085/GB
- **Requests**: First 10M free/month, then ~$0.0075/10,000

**Estimated monthly cost for small site**: $1-5/month

## Automated Deployment (CI/CD)

### GitHub Actions Setup

1. **Add secrets** to your GitHub repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `S3_BUCKET_NAME`
   - `CLOUDFRONT_DISTRIBUTION_ID`

2. **Push to main branch** - automatic deployment will trigger

### Manual Deployment
```bash
# Build and deploy manually
npm run build
./scripts/deploy.sh
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Check AWS credentials: `aws sts get-caller-identity`
   - Ensure IAM user has S3 and CloudFront permissions

2. **Bucket Name Already Exists**
   - S3 bucket names are globally unique
   - Script generates unique names with timestamp

3. **CloudFront Takes Time**
   - Distribution deployment takes 10-15 minutes
   - Check status: `./aws-manager.sh status`

4. **404 Errors**
   - Ensure error document is set to `index.html`
   - Check CloudFront custom error pages configuration

### Required IAM Permissions

Your AWS user needs these permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*",
        "cloudfront:*"
      ],
      "Resource": "*"
    }
  ]
}
```

## Security Best Practices

1. **Use IAM roles** instead of access keys when possible
2. **Rotate access keys** regularly
3. **Enable CloudTrail** for audit logging
4. **Use least privilege** IAM policies
5. **Enable S3 bucket versioning** for backup

## Monitoring

### CloudWatch Metrics
- S3 bucket requests and errors
- CloudFront cache hit ratio
- Data transfer metrics

### Cost Monitoring
- Set up billing alerts
- Use AWS Cost Explorer
- Monitor daily spend

## Cleanup

To remove all AWS resources:
```bash
./aws-manager.sh destroy
```

**Warning**: This permanently deletes all data and resources!

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review AWS CloudFormation events (if using)
3. Check AWS service health dashboard
4. Contact AWS support for infrastructure issues

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure monitoring and alerts
3. Set up automated backups
4. Implement additional AWS services as needed:
   - **API Gateway + Lambda** for backend APIs
   - **DynamoDB** for database
   - **Cognito** for authentication
   - **SES** for email services
