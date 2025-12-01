import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'indigo', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    indigo: 'text-indigo-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${colorClasses[color]}`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;