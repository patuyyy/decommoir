// src/layouts/PublicLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeNavbar from '../components/home_components/HomeNavbar'; // Sesuaikan path jika perlu
import ScrollToTop from '../components/ScrollToTop';

const PublicLayout = () => {
  return (
    <>
      <ScrollToTop />
      <HomeNavbar />
      <main>
        {/* Halaman (HomePage, LoginPage, dll) akan di-render di sini */}
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;