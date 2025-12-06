import React from 'react';
import { FaRegUserCircle, FaBell, FaInfo, FaExpand } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import DeviceCard from '../components/app_components/DeviceCard';
import { useNavigate } from 'react-router-dom';
import { getLatestIotData } from '../actions/iot.actions';

import {
  Line,
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

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
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [temp, setTemp] = useState([]);
  const [hum, setHum] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  const ws = useRef(null);

  const formatChartData = (arr) => {
    return {
      labels: arr.map(d => d.time),
      datasets: [
        {
          label: "Value",
          data: arr.map(d => d.value),
          borderWidth: 2,
          fill: false
        }
      ]
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatestIotData();
        setTemp(data.temperature);
        setHum(data.humidity);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Use 127.0.0.1 to avoid localhost resolution issues
    ws.current = new WebSocket("ws://127.0.0.1:3000/ws");
    setConnectionStatus("Connecting...");

    ws.current.onopen = () => {
      console.log("WS Connected");
      setConnectionStatus("Connected");
    };
    ws.current.onerror = (err) => {
      console.log("WS Error:", err);
      setConnectionStatus("Error");
    };
    ws.current.onclose = () => {
      console.log("WS Disconnected");
      setConnectionStatus("Disconnected");
    };

    ws.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      const newPoint = {
        value: data.value,
        time: new Date(data.timestamp).toLocaleTimeString()
      };

      if (data.type === 'v1') {
        setTemp(prev => [...prev.slice(-49), newPoint]);
      } else if (data.type === 'v2') {
        setHum(prev => [...prev.slice(-49), newPoint]);
      }
    };

    return () => ws.current?.close();
  }, []);

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-lg text-gray-600">Welcome, {user ? user.name : "Guest"}!</p>
          <p className={`text-sm ${connectionStatus === 'Connected' ? 'text-green-600' : 'text-red-600'}`}>
            WS Status: {connectionStatus}
          </p>
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

        <div style={{ padding: 20 }}>
          {/* <h2>Temperature</h2>
            <Line data={formatChartData(temp)} /> */}

          <h2 style={{ marginTop: 40 }}>Humidity</h2>
          <Line data={formatChartData(hum)} key={hum.length} />
        </div>
      </div>
    </div>
  );
};
