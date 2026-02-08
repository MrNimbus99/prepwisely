// AWS Certification Badge mapping
export const CERT_BADGES: Record<string, string> = {
  // Foundational
  'CLF-C02': '/badges/CLF-C02.svg',
  'AIF-C01': '/badges/AIF-C01.svg',
  
  // Associate
  'SAA-C03': '/badges/SAA-C03.svg',
  'DVA-C02': '/badges/DVA-C02.svg',
  'SOA-C03': '/badges/SOA-C03.svg',
  'DEA-C01': '/badges/DEA-C01.svg',
  'MLA-C01': '/badges/MLA-C01.svg',
  
  // Professional
  'SAP-C02': '/badges/SAP-C02.svg',
  'DOP-C02': '/badges/DOP-C02.svg',
  'AIP-C01': '/badges/AIP-C01.svg',
  
  // Specialty
  'SCS-C03': '/badges/SCS-C03.svg',
  'MLS-C01': '/badges/MLS-C01.svg',
  'ANS-C01': '/badges/ANS-C01.svg'
}

// Fallback badge component for when image fails to load
export const getBadgeUrl = (certCode: string): string => {
  return CERT_BADGES[certCode] || '/badges/CLF-C02.svg'
}
