// AWS Certification Badge mapping
export const CERT_BADGES: Record<string, string> = {
  // Foundational
  'CLF-C02': '/badges/aws-clf-badge-transparent-500x500.png',
  'AIF-C01': '/badges/aws_ai_practitioner_foundational_badge_500x500_v2.png',
  
  // Associate
  'SAA-C03': '/badges/saa-badge-transparent-500.png',
  'DVA-C02': '/badges/aws-developer-associate-badge-500x500.png',
  'SOA-C03': '/badges/aws-cloudops-engineer-badge-500.png',
  'DEA-C01': '/badges/dea-badge-500.png',
  'MLA-C01': '/badges/mla-badge-500-transparent.png',
  
  // Professional
  'SAP-C02': '/badges/sap-badge-transparent-500.png',
  'DOP-C02': '/badges/dop-badge-500-transparent.png',
  'AIP-C01': '/badges/aws_generative_ai_developer_pro_badge_500x500_v2.png',
  
  // Specialty
  'SCS-C03': '/badges/aws-security-specialty-badge-500x500.png',
  'MLS-C01': '/badges/mls-badge-500.png',
  'ANS-C01': '/badges/aws-advanced-networking-badge-500.png'
}

// Fallback badge component for when image fails to load
export const getBadgeUrl = (certCode: string): string => {
  return CERT_BADGES[certCode] || '/badges/aws-clf-badge-transparent-500x500.png'
}
