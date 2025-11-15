import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../assets/404.png';
import astro404 from '../assets/404astro.svg';

export default function Page404() {
  return (
    <div 
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-8 text-white"
      style={{ backgroundColor: '#393E8F' }}
    >
      
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-between gap-16 lg:flex-row">
        
        <div className="relative w-full max-w-xl text-center lg:text-left">
          
          <img 
            src={notfound} 
            alt="404"
            className="pointer-events-none absolute -top-1/2 left-0 w-full opacity-100"
          />

          <div className="relative z-10">
            <p className="text-4xl font-medium text-center">Maaf!</p>
            <h1 className="my-3 text-5xl text-center">Halaman Tidak Ditemukan</h1>
            <p className="mb-8 text-base text-gray-200 text-center">
              Maaf atas ketidaknyamanan ini! Silakan kunjungi halaman utama kami
              untuk menuju ke tempat yang Anda tuju.
            </p>
            <div className="flex justify-center">
              <Link
                to="/"
                className="rounded-lg text-center justify-center items-center bg-white bg-opacity-20 px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-opacity-30"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg">
          <img 
            src={astro404} 
            alt="Astronaut Illustration"
            className="h-auto w-full"
          />
        </div>

      </div>
    </div>
  );
}