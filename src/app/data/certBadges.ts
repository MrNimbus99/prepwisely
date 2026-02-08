// AWS Certification Badge mapping
export const CERT_BADGES: Record<string, string> = {
  // Foundational
  'CLF-C02': '/badges/aws-clf-badge-transparent.png',
  'AIF-C01': '/badges/aws_ai_practitioner_foundational_badge_transparent_cropped.png',
  
  // Associate
  'SAA-C03': '/badges/saa-badge-transparent-500x500.png',
  'DVA-C02': '/badges/aws-developer-associate-badge-transparent.png',
  'SOA-C03': '/badges/aws-cloudops-engineer-badge-transparent.png',
  'DEA-C01': '/badges/dea-badge-transparent.png',
  'MLA-C01': '/badges/mla-badge-transparent.png',
  
  // Professional
  'SAP-C02': '/badges/saa-badge-transparent-500x500.png', // Using SAA as placeholder
  'DOP-C02': '/badges/aws-developer-associate-badge-transparent.png', // Using DVA as placeholder
  'AIP-C01': '/badges/aws_generative_ai_developer_pro_badge_transparent.png',
  
  // Specialty
  'SCS-C03': '/badges/aws-security-specialty-badge-transparent.png',
  'MLS-C01': '/badges/mls-badge-transparent.png',
  'ANS-C01': '/badges/aws-advanced-networking-badge-transparent.png'
}

// Fallback badge component for when image fails to load
export const getBadgeUrl = (certCode: string): string => {
  return CERT_BADGES[certCode] || '/badges/aws-clf-badge-transparent.png'
}
