#!/bin/bash

# PrepWisely AWS Infrastructure Manager
# One-stop script for managing AWS infrastructure

set -e

show_help() {
  echo "PrepWisely AWS Infrastructure Manager"
  echo ""
  echo "Usage: ./aws-manager.sh [command]"
  echo ""
  echo "Commands:"
  echo "  setup     - Set up complete AWS infrastructure (S3 + CloudFront)"
  echo "  deploy    - Build and deploy application"
  echo "  status    - Show current infrastructure status"
  echo "  destroy   - Destroy all AWS resources (careful!)"
  echo "  logs      - Show deployment logs"
  echo "  help      - Show this help message"
  echo ""
  echo "Prerequisites:"
  echo "  - AWS CLI configured with appropriate permissions"
  echo "  - jq installed for JSON parsing"
  echo "  - Node.js and npm for building the app"
}

check_prerequisites() {
  echo "🔍 Checking prerequisites..."
  
  if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install AWS CLI first."
    exit 1
  fi
  
  if ! command -v jq &> /dev/null; then
    echo "❌ jq not found. Please install jq first."
    exit 1
  fi
  
  if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js first."
    exit 1
  fi
  
  echo "✅ All prerequisites met!"
}

setup_infrastructure() {
  echo "🚀 Setting up complete AWS infrastructure..."
  
  check_prerequisites
  
  # Run S3 setup
  echo "📦 Step 1: Setting up S3..."
  ./scripts/setup-s3.sh
  
  # Run CloudFront setup
  echo "📡 Step 2: Setting up CloudFront..."
  ./scripts/setup-cloudfront.sh
  
  echo ""
  echo "🎉 Infrastructure setup complete!"
  echo "🔄 Run './aws-manager.sh deploy' to deploy your app"
}

deploy_app() {
  echo "🚀 Deploying PrepWisely..."
  ./scripts/deploy.sh
}

show_status() {
  if [ ! -f .env.aws ]; then
    echo "❌ No AWS infrastructure found. Run './aws-manager.sh setup' first."
    exit 1
  fi
  
  source .env.aws
  
  echo "📊 PrepWisely AWS Infrastructure Status"
  echo "======================================"
  echo "S3 Bucket: $BUCKET_NAME"
  echo "Region: $REGION"
  echo "Profile: $PROFILE"
  
  if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "CloudFront Distribution: $DISTRIBUTION_ID"
    echo "Domain: https://$DOMAIN_NAME"
    
    # Get CloudFront status
    STATUS=$(aws cloudfront get-distribution --id $DISTRIBUTION_ID --profile $PROFILE --query 'Distribution.Status' --output text)
    echo "Status: $STATUS"
  fi
  
  echo ""
  echo "🌐 URLs:"
  echo "S3: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
  if [ ! -z "$DOMAIN_NAME" ]; then
    echo "CloudFront: https://$DOMAIN_NAME"
  fi
}

destroy_infrastructure() {
  if [ ! -f .env.aws ]; then
    echo "❌ No AWS infrastructure found."
    exit 1
  fi
  
  source .env.aws
  
  echo "⚠️  WARNING: This will destroy all AWS resources!"
  echo "Bucket: $BUCKET_NAME"
  if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "CloudFront Distribution: $DISTRIBUTION_ID"
  fi
  echo ""
  read -p "Are you sure? Type 'yes' to confirm: " confirm
  
  if [ "$confirm" != "yes" ]; then
    echo "❌ Cancelled."
    exit 1
  fi
  
  echo "🗑️  Destroying infrastructure..."
  
  # Disable and delete CloudFront distribution
  if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "📡 Disabling CloudFront distribution..."
    aws cloudfront get-distribution-config --id $DISTRIBUTION_ID --profile $PROFILE > cf-config.json
    
    # Update config to disable distribution
    jq '.DistributionConfig.Enabled = false' cf-config.json > cf-config-disabled.json
    ETAG=$(jq -r '.ETag' cf-config.json)
    
    aws cloudfront update-distribution \
      --id $DISTRIBUTION_ID \
      --distribution-config file://cf-config-disabled.json \
      --if-match $ETAG \
      --profile $PROFILE
    
    echo "⏳ Waiting for distribution to be disabled (this may take 10-15 minutes)..."
    aws cloudfront wait distribution-deployed --id $DISTRIBUTION_ID --profile $PROFILE
    
    echo "🗑️  Deleting CloudFront distribution..."
    aws cloudfront delete-distribution --id $DISTRIBUTION_ID --if-match $ETAG --profile $PROFILE
    
    rm cf-config.json cf-config-disabled.json
  fi
  
  # Empty and delete S3 bucket
  echo "📦 Emptying S3 bucket..."
  aws s3 rm s3://$BUCKET_NAME --recursive --profile $PROFILE
  
  echo "🗑️  Deleting S3 bucket..."
  aws s3 rb s3://$BUCKET_NAME --profile $PROFILE
  
  # Remove configuration
  rm .env.aws
  
  echo "✅ Infrastructure destroyed successfully!"
}

# Main script logic
case "${1:-help}" in
  setup)
    setup_infrastructure
    ;;
  deploy)
    deploy_app
    ;;
  status)
    show_status
    ;;
  destroy)
    destroy_infrastructure
    ;;
  logs)
    echo "📋 Recent deployment logs:"
    tail -n 50 /tmp/prepwisely-deploy.log 2>/dev/null || echo "No logs found"
    ;;
  help|*)
    show_help
    ;;
esac
