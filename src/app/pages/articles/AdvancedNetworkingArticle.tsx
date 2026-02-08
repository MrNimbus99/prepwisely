import React from 'react'
import { NavigationProps } from '../../types'
import CertificationArticle from './CertificationArticle'

const AdvancedNetworkingArticle: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <CertificationArticle
      onNavigate={onNavigate}
      certId="aws-certified-advanced-networking-specialty-ans-c01"
      certName="AWS Certified Advanced Networking – Specialty"
      certCode="ANS-C01"
      level="Specialty"
      quizCount={30}
      questionsPerQuiz={20}
      domains={[
        'Network Design (30%)',
        'Network Implementation (26%)',
        'Network Management and Operation (20%)',
        'Network Security, Compliance, and Governance (24%)'
      ]}
      domainTasks={[
        {
          domain: 'Network Design (30%)',
          tasks: [
            'Design edge network services (CloudFront, Global Accelerator)',
            'Design DNS solutions (Route 53 public/private zones, resolvers)',
            'Design load balancing solutions (ALB, NLB, GWLB)',
            'Define logging and monitoring requirements',
            'Design hybrid connectivity (Direct Connect, VPN)',
            'Design multi-account and multi-Region connectivity (Transit Gateway, peering, PrivateLink)'
          ]
        },
        {
          domain: 'Network Implementation (26%)',
          tasks: [
            'Implement hybrid connectivity with routing protocols (BGP)',
            'Implement multi-account connectivity patterns',
            'Implement complex DNS architectures (forwarding, DNSSEC)',
            'Automate network infrastructure (CloudFormation, CDK)',
            'Configure VPC networking and security controls'
          ]
        },
        {
          domain: 'Network Management and Operation (20%)',
          tasks: [
            'Maintain routing and connectivity (BGP, route tables)',
            'Monitor and analyze network traffic (Flow Logs, Traffic Mirroring)',
            'Troubleshoot connectivity issues (Reachability Analyzer)',
            'Optimize network performance and costs',
            'Implement multicast and jumbo frames'
          ]
        },
        {
          domain: 'Network Security, Compliance, and Governance (24%)',
          tasks: [
            'Implement network security features (WAF, Shield, Network Firewall)',
            'Validate and audit using monitoring services',
            'Implement data confidentiality (IPsec, TLS, VPN over Direct Connect)',
            'Secure inbound and outbound traffic flows',
            'Implement compliance architectures'
          ]
        }
      ]}
    />
  )
}

export default AdvancedNetworkingArticle
