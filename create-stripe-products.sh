#!/bin/bash

# Get Stripe secret key
SECRET_KEY=$(aws secretsmanager get-secret-value --secret-id stripe/test --region ap-southeast-2 --query SecretString --output text | jq -r '.STRIPE_SECRET_KEY')

echo "Creating Stripe products with correct pricing..."
echo ""

# Individual Certs - $10 each (except first one free)
echo "Creating individual certification products ($10 each)..."

CERTS=(
  "cloud-practitioner:AWS Certified Cloud Practitioner (CLF-C02):0"
  "ai-practitioner:AWS Certified AI Practitioner (AIF-C01):1000"
  "solutions-architect-associate:AWS Certified Solutions Architect Associate (SAA-C03):1000"
  "developer-associate:AWS Certified Developer Associate (DVA-C02):1000"
  "cloudops-engineer-associate:AWS Certified CloudOps Engineer Associate (SOA-C03):1000"
  "data-engineer-associate:AWS Certified Data Engineer Associate (DEA-C01):1000"
  "machine-learning-engineer-associate:AWS Certified Machine Learning Engineer Associate (MLA-C01):1000"
  "solutions-architect-professional:AWS Certified Solutions Architect Professional (SAP-C02):1000"
  "devops-engineer-professional:AWS Certified DevOps Engineer Professional (DOP-C02):1000"
  "generative-ai-developer-professional:AWS Certified Generative AI Developer Professional (AIP-C01):1000"
  "advanced-networking-specialty:AWS Certified Advanced Networking Specialty (ANS-C01):1000"
  "security-specialty:AWS Certified Security Specialty (SCS-C03):1000"
  "machine-learning-specialty:AWS Certified Machine Learning Specialty (MLS-C01):1000"
)

for cert in "${CERTS[@]}"; do
  IFS=':' read -r id name price <<< "$cert"
  
  # Create product
  PRODUCT_ID=$(curl -s -X POST https://api.stripe.com/v1/products \
    -u "$SECRET_KEY:" \
    -d "name=$name" \
    -d "description=Practice exams and study materials" | jq -r '.id')
  
  # Create price
  PRICE_ID=$(curl -s -X POST https://api.stripe.com/v1/prices \
    -u "$SECRET_KEY:" \
    -d "product=$PRODUCT_ID" \
    -d "unit_amount=$price" \
    -d "currency=aud" | jq -r '.id')
  
  echo "  '$id': '$PRICE_ID',"
done

echo ""
echo "Creating bundle products..."

# Bundle 1: Associate Bundle - $45
PRODUCT_ID=$(curl -s -X POST https://api.stripe.com/v1/products \
  -u "$SECRET_KEY:" \
  -d "name=Associate Bundle" \
  -d "description=All Associate level certifications" | jq -r '.id')

PRICE_ID=$(curl -s -X POST https://api.stripe.com/v1/prices \
  -u "$SECRET_KEY:" \
  -d "product=$PRODUCT_ID" \
  -d "unit_amount=4500" \
  -d "currency=aud" | jq -r '.id')

echo "  ASSOCIATE_BUNDLE: '$PRICE_ID',"

# Bundle 2: Professional Bundle - $25
PRODUCT_ID=$(curl -s -X POST https://api.stripe.com/v1/products \
  -u "$SECRET_KEY:" \
  -d "name=Professional Bundle" \
  -d "description=All Professional level certifications" | jq -r '.id')

PRICE_ID=$(curl -s -X POST https://api.stripe.com/v1/prices \
  -u "$SECRET_KEY:" \
  -d "product=$PRODUCT_ID" \
  -d "unit_amount=2500" \
  -d "currency=aud" | jq -r '.id')

echo "  PROFESSIONAL_BUNDLE: '$PRICE_ID',"

# Bundle 3: Specialty Bundle - $25
PRODUCT_ID=$(curl -s -X POST https://api.stripe.com/v1/products \
  -u "$SECRET_KEY:" \
  -d "name=Specialty Bundle" \
  -d "description=All Specialty level certifications" | jq -r '.id')

PRICE_ID=$(curl -s -X POST https://api.stripe.com/v1/prices \
  -u "$SECRET_KEY:" \
  -d "product=$PRODUCT_ID" \
  -d "unit_amount=2500" \
  -d "currency=aud" | jq -r '.id')

echo "  SPECIALTY_BUNDLE: '$PRICE_ID',"

echo ""
echo "Done! Update the PRICE_IDS in stripe.ts with the above values."
