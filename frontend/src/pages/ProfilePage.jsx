import React, { useEffect, useState } from 'react';
import { IoPencil, IoClose } from "react-icons/io5"; // Menambah icon Close
import { CiCamera, CiLogout } from "react-icons/ci";
import placeholderImg from './../assets/placeholder.png';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { updatePhoto } from '../actions/auth.actions';

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // --- State Existing ---
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    photo_url: null,
    role: "",
    school_id: "",
    username: ""
  });

  // --- State Baru untuk Modal & Upload ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  // --- Helper: Ambil Cookie ---
  const getAuthToken = () => {
    const name = "auth_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  // --- Handler: Buka Modal ---
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedFile(null);
    setPreview(null);
  };

  // --- Handler: Pilih File ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file tambahan (opsional, karena input accept sudah ada)
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert("Only .png, .jpg, and .jpeg formats are allowed!");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Membuat preview lokal
    }
  };

  // --- Handler: Upload ke Backend ---
  const handleUploadPhoto = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const token = getAuthToken(); // Ambil token dari cookie
      
      // Panggil API (Parameter: File, Token)
      const response = await updatePhoto(selectedFile, token);

      // Asumsi backend mengembalikan URL baru atau user object baru
      // Update state lokal agar UI berubah langsung
      const newPhotoUrl = response?.photo_url || preview; 
      
      const updatedUser = { ...user, photo_url: newPhotoUrl };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setIsModalOpen(false); // Tutup modal
      alert("Profile picture updated successfully!");

    } catch (error) {
      console.error("Failed to upload photo:", error);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-8 md:p-16 font-sans">

      <div className="relative max-w-screen-lg mx-auto bg-white shadow-md rounded-lg p-8">
        
        {/* Tombol Edit User Data */}
        <button className="absolute top-0 right-0 bg-[#35469C] hover:bg-blue-800 text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors m-7">
          <IoPencil size={16} />
          <span>Edit</span>
        </button>

        {/* Tombol Logout */}
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

            {/* Icon Kamera (Tombol Trigger Modal) */}
            <button 
              onClick={handleOpenModal}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-transform hover:scale-105"
            >
              <CiCamera size={24} className="text-black" />
            </button>
          </div>

          {/* Informasi Nama & Sekolah */}
          <div className="mt-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {user.name || "Nama Pengguna"}
            </h1>

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
          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center">
            <span className="font-bold text-gray-900">Username:</span>
            <span className="text-gray-900 italic font-medium">
              {user.username}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] items-center">
            <span className="font-bold text-gray-900">Email:</span>
            <span className="text-gray-900 font-normal">
              {user.email}
            </span>
          </div>
        </div>
      </div>

      {/* --- MODAL UPLOAD --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Change Profile Photo</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <IoClose size={24} />
              </button>
            </div>

            {/* Content Modal */}
            <div className="flex flex-col items-center gap-4">
              
              {/* Area Preview */}
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <CiCamera size={40} className="text-gray-400" />
                )}
              </div>

              {/* Input File */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image (.png, .jpg, .jpeg)
                </label>
                <input 
                  type="file" 
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full mt-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUploadPhoto}
                  disabled={!selectedFile || isUploading}
                  className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition flex justify-center items-center
                    ${(!selectedFile || isUploading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#35469C] hover:bg-blue-800'}`}
                >
                  {isUploading ? "Uploading..." : "Change"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}