// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="bg-gray-100 text-gray-500 text-center text-sm p-3 mt-8">
    &copy; {new Date().getFullYear()} SubTrack. All rights reserved.
  </footer>
);

export default Footer;
