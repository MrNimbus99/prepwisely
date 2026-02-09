import React from 'react'

export const NestedCertsLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer bracket - Blue */}
      <path 
        d="M 75 20 L 55 50 L 75 80" 
        stroke="url(#gradient1)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M 25 20 L 45 50 L 25 80" 
        stroke="url(#gradient1)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Inner bracket - Gold */}
      <path 
        d="M 62 30 L 50 50 L 62 70" 
        stroke="url(#gradient2)" 
        strokeWidth="7" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M 38 30 L 50 50 L 38 70" 
        stroke="url(#gradient2)" 
        strokeWidth="7" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Certificate badge */}
      <circle cx="75" cy="25" r="12" fill="url(#gradient2)"/>
      <path 
        d="M 70 25 L 73 28 L 80 21" 
        stroke="#3B82F6" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  )
}
