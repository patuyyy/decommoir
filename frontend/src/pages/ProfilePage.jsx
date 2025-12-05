import React, { useEffect, useState } from 'react';
import { IoPencil } from "react-icons/io5";
import { CiCamera } from "react-icons/ci";
import placeholderImg from './../assets/placeholder.png';
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    photo_url: null,
    role: "",
    school_id: "",
    username: ""
  });

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUser(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
        logout();
        localStorage.removeItem("user");
        navigate("/login"); 
    };

  return (
    <div className="w-full min-h-screen bg-white p-8 md:p-16 font-sans">
      
      <div className="relative max-w-screen-lg mx-auto bg-white shadow-md rounded-lg p-8">
        <button className="absolute top-0 right-0 bg-[#35469C] hover:bg-blue-800 text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors m-7">
          <IoPencil size={16} />
          <span>Edit</span>
        </button>

        <button onClick={handleLogout} className="absolute bottom-0 right-0 bg-[#A63737] hover:bg-[#8B2E2E] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors m-7">
          <CiLogout size={16} />
          <span>Log Out</span>
        </button>

        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative">
            {/* Gambar Utama */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={user.photo_url || placeholderImg} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = placeholderImg }} 
              />
            </div>
            
            {/* Icon Kamera (Overlay) */}
            <div className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50">
              <CiCamera size={24} className="text-black" />
            </div>
          </div>

          {/* Informasi Nama & Sekolah */}
          <div className="mt-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {user.name || "Nama Pengguna"}
            </h1>
            
            {/* Note: Karena data JSON hanya punya school_id, 
                di sini saya hardcode nama sekolah sesuai desain untuk visualisasi. 
                Nanti bisa diganti logic fetch nama sekolah by ID */}
            <p className="text-gray-900 font-medium text-base mb-1">
              SMAN 5 Bekasi
            </p>
            
            <p className="text-gray-500 italic capitalize">
              {user.role || "Guest"}
            </p>
          </div>
        </div>

        {/* Section Detail User (Bawah) */}
        <div className="mt-10 space-y-4 max-w-lg">
          
          {/* Username Row */}
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center">
            <span className="font-bold text-gray-900">Username:</span>
            <span className="text-gray-900 italic font-medium">
              {user.username}
            </span>
          </div>
          
          {/* Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center">
            <span className="font-bold text-gray-900">Email:</span>
            <span className="text-gray-900 font-normal">
              {user.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}