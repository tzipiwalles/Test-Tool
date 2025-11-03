import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
  <defs>
    <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
    </linearGradient>
  </defs>
  
  {/* V shaped road - left side */}
  <path d="M 50 40 L 100 140" 
        fill="none" 
        stroke="url(#roadGrad)" 
        strokeWidth="35" 
        strokeLinecap="round"
        strokeLinejoin="round"/>
  
  {/* V shaped road - right side */}
  <path d="M 100 140 L 150 40" 
        fill="none" 
        stroke="url(#roadGrad)" 
        strokeWidth="35" 
        strokeLinecap="round"
        strokeLinejoin="round"/>
  
  {/* Center dashed line - left side of V */}
  <path d="M 62 50 L 100 125" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="4" 
        strokeDasharray="12,10"
        strokeLinecap="round"/>
  
  {/* Center dashed line - right side of V */}
  <path d="M 100 125 L 138 50" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="4" 
        strokeDasharray="12,10"
        strokeLinecap="round"/>
</svg>
);