// src/components/layout/MainLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">{children}</main>
    </div>
    <Footer />
  </div>
);

export default MainLayout;
