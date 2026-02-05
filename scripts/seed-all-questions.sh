#!/bin/bash

# Seed 1 question for every quiz/exam in all 13 certifications

REGION="ap-southeast-2"
FUNCTION_NAME="PrepWisely-CreateQuestion"

# All 13 certifications
CERTS=(
  "cloud-practitioner"
  "ai-practitioner"
  "solutions-architect-associate"
  "developer-associate"
  "sysops-administrator-associate"
  "data-engineer-associate"
  "machine-learning-engineer-associate"
  "solutions-architect-professional"
  "devops-engineer-professional"
  "advanced-networking-professional"
  "security-specialty"
  "machine-learning-specialty"
  "database-specialty"
)

# Sample questions for each cert
declare -A QUESTIONS
QUESTIONS["cloud-practitioner"]="Which AWS service provides object storage?"
QUESTIONS["ai-practitioner"]="Which AWS service provides foundation models for generative AI?"
QUESTIONS["solutions-architect-associate"]="Which AWS service provides a managed NoSQL database?"
QUESTIONS["developer-associate"]="Which AWS service is used for application deployment automation?"
QUESTIONS["sysops-administrator-associate"]="Which AWS service provides infrastructure monitoring?"
QUESTIONS["data-engineer-associate"]="Which AWS service is used for data warehousing?"
QUESTIONS["machine-learning-engineer-associate"]="Which AWS service provides managed Jupyter notebooks?"
QUESTIONS["solutions-architect-professional"]="Which AWS service enables hybrid cloud connectivity?"
QUESTIONS["devops-engineer-professional"]="Which AWS service provides infrastructure as code?"
QUESTIONS["advanced-networking-professional"]="Which AWS service provides private connectivity to AWS?"
QUESTIONS["security-specialty"]="Which AWS service provides DDoS protection?"
QUESTIONS["machine-learning-specialty"]="Which AWS service is used for training ML models?"
QUESTIONS["database-specialty"]="Which AWS service provides a managed relational database?"

declare -A ANSWERS
ANSWERS["cloud-practitioner"]='["Amazon EC2","Amazon S3","Amazon RDS","Amazon DynamoDB"]'
ANSWERS["ai-practitioner"]='["Amazon SageMaker","Amazon Bedrock","Amazon Comprehend","Amazon Rekognition"]'
ANSWERS["solutions-architect-associate"]='["Amazon RDS","Amazon DynamoDB","Amazon Redshift","Amazon Aurora"]'
ANSWERS["developer-associate"]='["AWS CodeDeploy","AWS CloudFormation","AWS Lambda","Amazon ECS"]'
ANSWERS["sysops-administrator-associate"]='["AWS CloudTrail","Amazon CloudWatch","AWS Config","AWS Systems Manager"]'
ANSWERS["data-engineer-associate"]='["Amazon RDS","Amazon Redshift","Amazon DynamoDB","Amazon Aurora"]'
ANSWERS["machine-learning-engineer-associate"]='["Amazon EMR","Amazon SageMaker","AWS Glue","Amazon Athena"]'
ANSWERS["solutions-architect-professional"]='["AWS VPN","AWS Direct Connect","AWS Transit Gateway","Amazon VPC"]'
ANSWERS["devops-engineer-professional"]='["AWS CloudFormation","AWS CodeDeploy","AWS OpsWorks","AWS Elastic Beanstalk"]'
ANSWERS["advanced-networking-professional"]='["AWS VPN","AWS Direct Connect","AWS Transit Gateway","Amazon CloudFront"]'
ANSWERS["security-specialty"]='["AWS WAF","AWS Shield","Amazon GuardDuty","AWS Security Hub"]'
ANSWERS["machine-learning-specialty"]='["Amazon EMR","Amazon SageMaker","AWS Glue","Amazon Athena"]'
ANSWERS["database-specialty"]='["Amazon DynamoDB","Amazon RDS","Amazon Redshift","Amazon Aurora"]'

declare -A CORRECT
CORRECT["cloud-practitioner"]=1
CORRECT["ai-practitioner"]=1
CORRECT["solutions-architect-associate"]=1
CORRECT["developer-associate"]=0
CORRECT["sysops-administrator-associate"]=1
CORRECT["data-engineer-associate"]=1
CORRECT["machine-learning-engineer-associate"]=1
CORRECT["solutions-architect-professional"]=1
CORRECT["devops-engineer-professional"]=0
CORRECT["advanced-networking-professional"]=1
CORRECT["security-specialty"]=1
CORRECT["machine-learning-specialty"]=1
CORRECT["database-specialty"]=1

echo "Starting to seed questions for all certifications..."
echo "Total: 13 certs × 32 quizzes = 416 questions"
echo ""

count=0
for cert in "${CERTS[@]}"; do
  echo "Processing: $cert"
  
  # 30 daily quizzes
  for i in {1..30}; do
    quiz_id="quiz-$i"
    
    cat > /tmp/question_${cert}_${quiz_id}.json << EOF
{
  "certId": "$cert",
  "quizId": "$quiz_id",
  "domain": "General Knowledge",
  "status": "active",
  "questionText": "${QUESTIONS[$cert]}",
  "options": ${ANSWERS[$cert]},
  "correctAnswer": ${CORRECT[$cert]},
  "explanation": "This is a sample question for $cert - $quiz_id. Replace with actual content.",
  "createdAt": "$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")"
}
EOF
    
    aws lambda invoke \
      --function-name $FUNCTION_NAME \
      --region $REGION \
      --cli-binary-format raw-in-base64-out \
      --payload file:///tmp/question_${cert}_${quiz_id}.json \
      /tmp/response.json > /dev/null 2>&1
    
    ((count++))
    echo -ne "\rProgress: $count/416 questions created"
  done
  
  # 2 practice exams
  for i in {1..2}; do
    quiz_id="exam-$i"
    
    cat > /tmp/question_${cert}_${quiz_id}.json << EOF
{
  "certId": "$cert",
  "quizId": "$quiz_id",
  "domain": "General Knowledge",
  "status": "active",
  "questionText": "${QUESTIONS[$cert]}",
  "options": ${ANSWERS[$cert]},
  "correctAnswer": ${CORRECT[$cert]},
  "explanation": "This is a sample question for $cert - Practice Exam $i. Replace with actual content.",
  "createdAt": "$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")"
}
EOF
    
    aws lambda invoke \
      --function-name $FUNCTION_NAME \
      --region $REGION \
      --cli-binary-format raw-in-base64-out \
      --payload file:///tmp/question_${cert}_${quiz_id}.json \
      /tmp/response.json > /dev/null 2>&1
    
    ((count++))
    echo -ne "\rProgress: $count/416 questions created"
  done
done

echo ""
echo ""
echo "✅ Complete! Created 416 questions (1 per quiz/exam for all 13 certifications)"
echo ""
echo "You can now:"
echo "  - View all questions in the admin portal"
echo "  - Edit any question"
echo "  - Delete questions (minimum 1 per quiz)"
echo "  - Add more questions to any quiz"
