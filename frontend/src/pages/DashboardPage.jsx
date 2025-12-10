import { FaRegUserCircle, FaBell, FaInfo, FaExpand } from "react-icons/fa";
import { useRef } from "react";
import DeviceCard from '../components/app_components/DeviceCard';
import { getDevices, getLatestIotData } from '../actions/iot.actions';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const id = useParams().id;
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [devicesRes, sensorRes] = await Promise.all([
          getDevices(),
          getLatestIotData()
        ]);

        const rawDevices = devicesRes.data;
        const sensorData = sensorRes;

        const formatTime = (isoString) => {
           if (!isoString) return "Offlinex`";
           return new Date(isoString).toLocaleTimeString('id-ID', {
               hour12: false, hour: '2-digit', minute: '2-digit'
           });
        };

        const mergedDevices = rawDevices.map(device => {
          const deviceIdStr = String(device.id);
          const tempObj = sensorData.temperature.find(t => String(t.device_id) === deviceIdStr);
          const humObj = sensorData.humidity.find(h => String(h.device_id) === deviceIdStr);
          const airObj = sensorData.airQuality?.find(a => String(a.device_id) === deviceIdStr);
          const disObj = sensorData.distance?.find(d => String(d.device_id) === deviceIdStr);
          const lastUpdateRaw = tempObj?.time || humObj?.time || airObj?.time || disObj?.time;

          return {
            ...device,
            temp: tempObj ? tempObj.value : 0,
            humidity: humObj ? humObj.value : 0,
            airQ: airObj ? airObj.value : 0,
            distance: disObj ? (((30 - disObj.value)/30)*100).toFixed(2) : 0,
            lastUpdate: formatTime(lastUpdateRaw)
          };
        });

        setDevices(mergedDevices);

      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-lg text-gray-600">Welcome, {user ? user.name : "Guest"}!</p>
        </div>
        <div className="flex items-center space-x-5">
          <button className="text-2xl mt-1 text-gray-500 hover:text-gray-700">
            <FaBell />
          </button>
          <button onClick={() => navigate('/profile')} className="flex items-center space-x-2 text-3xl text-gray-500 hover:text-gray-700">
            <span className='text-lg'>{user ? user.name : "Guest"}</span>
            <FaRegUserCircle />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {devices.length > 0 ? (
          devices.map((device) => (
            <div 
            key={device.id}
            onClick={() => navigate(`/monitoring/${device.id}`)}
            className="cursor-pointer transform transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            <DeviceCard key={device.id} device={device} />
          </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-2 text-center py-10">
            Loading devices data...
          </p>
        )}
      </div>
    </div>
  );
};
