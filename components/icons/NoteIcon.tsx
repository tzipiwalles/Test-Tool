import React from 'react';

export const NoteIcon: React.FC<React.SVGProps<SVGSVGElement> & { filled?: boolean }> = ({ filled, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 17.5a2.5 2.5 0 0 1-5 0V9a2.5 2.5 0 0 1 5 0v8.5Z" />
    <path d="M12 17.5a2.5 2.5 0 0 1-5 0V9a2.5 2.5 0 0 1 5 0v8.5Z" />
    <path d="M16 17.5a2.5 2.5 0 0 1-5 0V9a2.5 2.5 0 0 1 5 0v8.5Z" />
    <path d="M20 17.5a2.5 2.5 0 0 1-5 0V9a2.5 2.5 0 0 1 5 0v8.5Z" />
    <path d="M4 19h16" />
    <path d="M2 6h20" />
    <path d="M10 6v1" />
    <path d="M6 6v1" />
    <path d="M14 6v1" />
    <path d="M18 6v1" />
  </svg>
);
