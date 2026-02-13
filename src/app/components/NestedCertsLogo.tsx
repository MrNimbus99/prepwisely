import React from 'react'

export const NestedCertsLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <img 
      src="/favicon.png" 
      alt="NestedCerts Logo" 
      className={className}
    />
  )
}
