#!/bin/bash

# Create SVG badges for each certification with AWS colors

create_badge() {
  local code=$1
  local color=$2
  local level=$3
  
  cat > "${code}.svg" << SVGEOF
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${code}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="95" fill="url(#grad-${code})" stroke="#fff" stroke-width="3"/>
  <text x="100" y="85" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">AWS</text>
  <text x="100" y="105" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">${level}</text>
  <text x="100" y="125" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">${code}</text>
</svg>
SVGEOF
}

# Foundational - Green
create_badge "CLF-C02" "#00A1C9" "Foundational"
create_badge "AIF-C01" "#00A1C9" "Foundational"

# Associate - Orange
create_badge "SAA-C03" "#FF9900" "Associate"
create_badge "DVA-C02" "#FF9900" "Associate"
create_badge "SOA-C03" "#FF9900" "Associate"
create_badge "DEA-C01" "#FF9900" "Associate"
create_badge "MLA-C01" "#FF9900" "Associate"

# Professional - Blue
create_badge "SAP-C02" "#146EB4" "Professional"
create_badge "DOP-C02" "#146EB4" "Professional"
create_badge "AIP-C01" "#146EB4" "Professional"

# Specialty - Purple
create_badge "SCS-C03" "#7D3C98" "Specialty"
create_badge "MLS-C01" "#7D3C98" "Specialty"
create_badge "ANS-C01" "#7D3C98" "Specialty"

echo "SVG badges created!"
