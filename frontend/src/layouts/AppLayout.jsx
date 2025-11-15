// src/layouts/AppLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/app_components/Sidebar'; 
import ScrollToTop from '../components/ScrollToTop';

const AppLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;