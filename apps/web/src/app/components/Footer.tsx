import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-row items-center justify-center mb-4">
          {/* DataMesh Logo or Name */}
          <span className="text-2xl font-semibold">DataMesh</span>
        </div>

        {/* Copyright Info */}
        <div className="mt-4 text-center text-gray-400">
          © {new Date().getFullYear()} DataMesh. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
