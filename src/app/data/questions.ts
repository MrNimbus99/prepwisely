// Sample questions for each certification (1 question each to start)
export const sampleQuestions = {
  'cloud-practitioner': [
    {
      id: 'clp-001',
      question: 'Which AWS service provides a fully managed NoSQL database?',
      options: [
        'Amazon RDS',
        'Amazon DynamoDB', 
        'Amazon Redshift',
        'Amazon ElastiCache',
        'Amazon Aurora'
      ],
      correctAnswer: 1,
      explanation: 'Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. Unlike Amazon RDS which is for relational databases, DynamoDB is specifically designed for NoSQL workloads.',
      domain: 'Technology',
      difficulty: 'Easy' as const,
      certification: 'cloud-practitioner'
    }
  ],
  'solutions-architect-associate': [
    {
      id: 'saa-001',
      question: 'A company needs to store frequently accessed data with high durability and availability. The data size is expected to grow to several terabytes. Which storage solution should be recommended?',
      options: [
        'Amazon EBS with General Purpose SSD',
        'Amazon S3 Standard',
        'Amazon EFS',
        'Amazon S3 Glacier',
        'Instance Store'
      ],
      correctAnswer: 1,
      explanation: 'Amazon S3 Standard is designed for frequently accessed data and provides 99.999999999% (11 9s) durability and 99.99% availability. It can scale to store virtually unlimited amounts of data, making it ideal for this use case.',
      domain: 'Design High-Performing Architectures',
      difficulty: 'Medium' as const,
      certification: 'solutions-architect-associate'
    }
  ],
  'developer-associate': [
    {
      id: 'dva-001',
      question: 'Which AWS service should a developer use to decouple application components and ensure reliable message delivery?',
      options: [
        'Amazon SNS',
        'Amazon SQS',
        'Amazon Kinesis',
        'AWS Lambda',
        'Amazon EventBridge'
      ],
      correctAnswer: 1,
      explanation: 'Amazon SQS (Simple Queue Service) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. It provides reliable message delivery with features like dead letter queues and message visibility timeout.',
      domain: 'Development with AWS Services',
      difficulty: 'Easy' as const,
      certification: 'developer-associate'
    }
  ],
  'sysops-administrator-associate': [
    {
      id: 'soa-001',
      question: 'An application running on EC2 instances is experiencing high CPU utilization. Which AWS service can automatically scale the number of instances based on demand?',
      options: [
        'AWS CloudFormation',
        'Amazon CloudWatch',
        'AWS Auto Scaling',
        'AWS Systems Manager',
        'AWS Config'
      ],
      correctAnswer: 2,
      explanation: 'AWS Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. It can scale EC2 instances up or down based on demand using CloudWatch metrics like CPU utilization.',
      domain: 'Automation & Optimization',
      difficulty: 'Medium' as const,
      certification: 'sysops-administrator-associate'
    }
  ],
  'solutions-architect-professional': [
    {
      id: 'sap-001',
      question: 'A large enterprise needs to migrate a complex multi-tier application to AWS while maintaining strict compliance requirements and minimizing downtime. Which migration strategy would be most appropriate?',
      options: [
        'Rehost (Lift and Shift)',
        'Replatform (Lift, Tinker, and Shift)',
        'Refactor/Re-architect',
        'Retire',
        'Retain'
      ],
      correctAnswer: 1,
      explanation: 'Replatforming involves making a few cloud optimizations to achieve tangible benefits without changing the core architecture. This approach allows for compliance requirements to be maintained while gaining some cloud benefits and minimizing the complexity and risk associated with a full refactor.',
      domain: 'Accelerate Workload Migration and Modernization',
      difficulty: 'Hard' as const,
      certification: 'solutions-architect-professional'
    }
  ],
  'devops-engineer-professional': [
    {
      id: 'dop-001',
      question: 'Which AWS service combination would best implement a blue-green deployment strategy for a containerized application?',
      options: [
        'AWS CodeDeploy with EC2 instances',
        'Amazon ECS with Application Load Balancer',
        'AWS Lambda with API Gateway',
        'Amazon EKS with Network Load Balancer',
        'AWS Fargate with CloudFront'
      ],
      correctAnswer: 1,
      explanation: 'Amazon ECS with Application Load Balancer provides the best combination for blue-green deployments. ECS can manage two identical production environments (blue and green), and ALB can route traffic between them, allowing for zero-downtime deployments with easy rollback capabilities.',
      domain: 'SDLC Automation',
      difficulty: 'Hard' as const,
      certification: 'devops-engineer-professional'
    }
  ],
  'security-specialty': [
    {
      id: 'scs-001',
      question: 'A company wants to encrypt data at rest in Amazon S3 using customer-managed keys. Which service should be used?',
      options: [
        'AWS CloudHSM',
        'AWS KMS',
        'AWS Certificate Manager',
        'AWS Secrets Manager',
        'Amazon Macie'
      ],
      correctAnswer: 1,
      explanation: 'AWS KMS (Key Management Service) is the appropriate service for managing customer-managed keys for S3 encryption. It provides centralized key management and integrates seamlessly with S3 for server-side encryption with customer-managed keys (SSE-KMS).',
      domain: 'Data Protection in Transit and at Rest',
      difficulty: 'Medium' as const,
      certification: 'security-specialty'
    }
  ],
  'machine-learning-specialty': [
    {
      id: 'mls-001',
      question: 'Which AWS service is best suited for real-time inference of machine learning models with automatic scaling?',
      options: [
        'Amazon SageMaker Batch Transform',
        'Amazon SageMaker Endpoints',
        'AWS Lambda',
        'Amazon EC2',
        'Amazon ECS'
      ],
      correctAnswer: 1,
      explanation: 'Amazon SageMaker Endpoints provide real-time inference capabilities with automatic scaling based on traffic. They offer low-latency predictions and can automatically scale up or down based on the incoming request volume, making them ideal for production ML inference workloads.',
      domain: 'Machine Learning Implementation and Operations',
      difficulty: 'Medium' as const,
      certification: 'machine-learning-specialty'
    }
  ],
  'database-specialty': [
    {
      id: 'dbs-001',
      question: 'A company needs a database solution that can handle both OLTP and OLAP workloads with minimal operational overhead. Which AWS service would be most appropriate?',
      options: [
        'Amazon RDS',
        'Amazon DynamoDB',
        'Amazon Aurora',
        'Amazon Redshift',
        'Amazon DocumentDB'
      ],
      correctAnswer: 2,
      explanation: 'Amazon Aurora can handle both OLTP (Online Transaction Processing) and OLAP (Online Analytical Processing) workloads. Aurora supports both transactional workloads and analytical queries, and with Aurora Serverless, it provides minimal operational overhead with automatic scaling.',
      domain: 'Workload-Specific Database Design',
      difficulty: 'Hard' as const,
      certification: 'database-specialty'
    }
  ],
  'data-analytics-specialty': [
    {
      id: 'das-001',
      question: 'Which AWS service is best for processing streaming data in real-time with the ability to run SQL queries?',
      options: [
        'Amazon Kinesis Data Streams',
        'Amazon Kinesis Data Analytics',
        'Amazon Kinesis Data Firehose',
        'AWS Glue',
        'Amazon EMR'
      ],
      correctAnswer: 1,
      explanation: 'Amazon Kinesis Data Analytics allows you to process streaming data in real-time using SQL queries. It can analyze streaming data from Kinesis Data Streams or Kinesis Data Firehose using standard SQL, making it ideal for real-time analytics on streaming data.',
      domain: 'Processing',
      difficulty: 'Medium' as const,
      certification: 'data-analytics-specialty'
    }
  ],
  'network-specialty': [
    {
      id: 'ans-001',
      question: 'A company needs to connect multiple VPCs across different AWS regions while maintaining private connectivity. Which solution would be most cost-effective and scalable?',
      options: [
        'VPC Peering',
        'AWS Transit Gateway',
        'AWS Direct Connect',
        'VPN Connections',
        'AWS PrivateLink'
      ],
      correctAnswer: 1,
      explanation: 'AWS Transit Gateway is the most cost-effective and scalable solution for connecting multiple VPCs across regions. It acts as a hub that controls how traffic is routed among all connected networks, supporting inter-region peering and providing a single point of management.',
      domain: 'Network Design',
      difficulty: 'Hard' as const,
      certification: 'network-specialty'
    }
  ],
  'sap-on-aws-specialty': [
    {
      id: 'pas-001',
      question: 'Which EC2 instance type is specifically optimized for SAP HANA workloads?',
      options: [
        'M5 instances',
        'C5 instances',
        'R5 instances',
        'X1e instances',
        'I3 instances'
      ],
      correctAnswer: 3,
      explanation: 'X1e instances are specifically designed for high-performance databases and in-memory applications like SAP HANA. They provide high memory-to-vCPU ratios and are certified by SAP for running SAP HANA workloads on AWS.',
      domain: 'SAP on AWS Planning and Design',
      difficulty: 'Medium' as const,
      certification: 'sap-on-aws-specialty'
    }
  ]
}
