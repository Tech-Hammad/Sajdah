import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
        Loading prayer times...
      </p>
    </div>
  );
};

export default LoadingSpinner;
