import React from 'react';

export const PinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 17v5" />
    <path d="M9 17h6" />
    <path d="M16 10a4 4 0 0 0-8 0c0 2 2 4 4 4s4-2 4-4" />
    <path d="m9 2 3 3 3-3" />
  </svg>
);