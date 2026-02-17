import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">
        &copy; {year} Sajdah. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

