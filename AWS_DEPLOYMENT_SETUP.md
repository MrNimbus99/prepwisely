# AWS Deployment Setup Guide

## 🚨 SECURITY FIRST
**NEVER share AWS credentials in plain text!** The credentials you shared earlier must be deleted immediately.

## 🔐 GitHub Secrets Setup

To enable CI/CD deployment, add these secrets to your GitHub repository:

### Required Secrets:
1. Go to GitHub Repository → Settings → Secrets and variables → Actions
2. Add these Repository Secrets:

```
AWS_ACCESS_KEY_ID: Your AWS Access Key ID
AWS_SECRET_ACCESS_KEY: Your AWS Secret Access Key
```

### Creating Secure AWS Credentials:
1. Go to AWS Console → IAM → Users
2. Create a new user for CI/CD (e.g., "prepwisely-cicd")
3. Attach this policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:*",
                "s3:*",
                "cloudfront:*",
                "iam:PassRole"
            ],
            "Resource": "*"
        }
    ]
}
```

## 🚀 Deployment Options

### Option 1: Manual Deployment (Recommended First)
```bash
# Configure AWS CLI with your credentials
aws configure

# Deploy everything
./deploy-aws.sh
```

### Option 2: GitHub Actions (Automated)
1. Set up GitHub secrets (above)
2. Push to main branch
3. GitHub Actions will automatically deploy

## 📋 What Gets Created

### Stack 1: S3 (prepwisely-s3-stack)
- S3 bucket for static website hosting
- Bucket policy for public read access
- Website configuration

### Stack 2: CloudFront (prepwisely-cloudfront-stack)
- CloudFront distribution for global CDN
- Origin Access Identity for secure S3 access
- Custom error pages for SPA routing
- HTTPS redirect and compression

## 🔧 Manual Deployment Steps

1. **Deploy S3 Stack:**
```bash
aws cloudformation deploy \
  --template-file infrastructure/s3-stack.yaml \
  --stack-name prepwisely-s3-stack \
  --parameter-overrides Environment=prod
```

2. **Deploy CloudFront Stack:**
```bash
aws cloudformation deploy \
  --template-file infrastructure/cloudfront-stack.yaml \
  --stack-name prepwisely-cloudfront-stack \
  --parameter-overrides S3StackName=prepwisely-s3-stack Environment=prod
```

3. **Build and Deploy App:**
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🌐 After Deployment

You'll get these URLs:
- **S3 Website URL**: `http://bucket-name.s3-website-us-east-1.amazonaws.com`
- **CloudFront URL**: `https://distribution-id.cloudfront.net` (Use this one!)

## 💰 Cost Estimation

### Monthly Costs (small site):
- **S3**: ~$1-2 (storage + requests)
- **CloudFront**: ~$1-3 (data transfer)
- **Total**: ~$2-5/month

## 🔄 CI/CD Pipeline Features

- **Automatic deployment** on push to main
- **Infrastructure as Code** with CloudFormation
- **Separate infrastructure and app deployment** jobs
- **Cache invalidation** for instant updates
- **Build optimization** with proper cache headers

## 🛡️ Security Features

- **Origin Access Identity** prevents direct S3 access
- **HTTPS redirect** for all traffic
- **Proper IAM permissions** for least privilege
- **No hardcoded credentials** in code

## 🔧 Troubleshooting

### Common Issues:
1. **Stack already exists**: Use `--no-fail-on-empty-changeset` flag
2. **Bucket name taken**: CloudFormation generates unique names
3. **Permission denied**: Check IAM permissions
4. **CloudFront takes time**: Distribution deployment takes 10-15 minutes

### Useful Commands:
```bash
# Check stack status
aws cloudformation describe-stacks --stack-name prepwisely-s3-stack

# Get stack outputs
aws cloudformation describe-stacks --stack-name prepwisely-cloudfront-stack --query 'Stacks[0].Outputs'

# Delete stacks (careful!)
aws cloudformation delete-stack --stack-name prepwisely-cloudfront-stack
aws cloudformation delete-stack --stack-name prepwisely-s3-stack
```

## 🎯 Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Add AWS Certificate Manager SSL
3. Implement backend APIs with Lambda + API Gateway
4. Add DynamoDB for data storage
5. Set up Cognito for authentication
