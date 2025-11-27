import React from 'react';

const Loader = ({ size = 'medium', color = 'blue' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    white: 'text-white'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-4 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
    </div>
  );
};

export default Loader;