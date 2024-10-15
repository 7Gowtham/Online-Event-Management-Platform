import React from 'react';
import backgroundImage from '../assets/bg-image.png';

const Layout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(90%)'
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
