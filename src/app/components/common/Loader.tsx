'use client';

import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  fullPage?: boolean;
  text?: string;
}

export default function Loader({ 
  size = 'medium',
  fullPage = false,
  text = 'Loading...'
}: LoaderProps) {
  // Set the size of the spinner based on the size prop
  const spinnerSize = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }[size];
  
  const containerClasses = fullPage 
    ? 'fixed inset-0 flex items-center justify-center bg-[var(--color-background)] bg-opacity-80 z-50' 
    : 'flex flex-col items-center justify-center p-6';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <div className={`${spinnerSize} border-4 border-[var(--color-secondary)] border-t-[var(--color-primary)] rounded-full animate-spin`}></div>
        {text && (
          <p className="mt-4 text-[var(--color-text)] font-medium">{text}</p>
        )}
      </div>
    </div>
  );
}