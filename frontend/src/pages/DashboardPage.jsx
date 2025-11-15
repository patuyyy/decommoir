import React from 'react';
import { FaRegUserCircle, FaBell, FaInfo, FaExpand } from "react-icons/fa";
import DeviceCard from '../components/home_components/DeviceCard';

const dummyDevices = [
  {
    id: 1,
    name: 'Device SD Kasih Ananda',
    temp: '30 C',
    humidity: '30 %',
    ph: '30 ppm',
    waste: '30 Kg',
    progress: 75,
  },
  {
    id: 2,
    name: 'Device SD Kasih Ananda',
    temp: '30 C',
    humidity: '30 %',
    ph: '30 ppm',
    waste: '30 Kg',
    progress: 75,
  },
  {
    id: 3,
    name: 'Device SD Kasih Ananda',
    temp: '30 C',
    humidity: '30 %',
    ph: '30 ppm',
    waste: '30 Kg',
    progress: 75,
  },
  {
    id: 4,
    name: 'Device SD Kasih Ananda',
    temp: '30 C',
    humidity: '30 %',
    ph: '30 ppm',
    waste: '30 Kg',
    progress: 75,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 bg-gray-100 p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-5">
          <button className="text-2xl text-gray-500 hover:text-gray-700">
            <FaBell />
          </button>
          <button className="text-3xl text-gray-500 hover:text-gray-700">
            <FaRegUserCircle />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {dummyDevices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Grafik Monitoring 7 Hari Terakhir
          </h3>
          <div className="flex space-x-3 text-gray-500">
            <button className="hover:text-gray-700">
              <FaInfo />
            </button>
            <button className="hover:text-gray-700">
              <FaExpand />
            </button>
          </div>
        </div>
        
        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
          Chart/Grafik akan tampil di sini
        </div>
      </div>
    </div>
  );
};
