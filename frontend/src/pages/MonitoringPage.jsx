import React from 'react';

import { FaThermometerEmpty, FaFlask, FaTrashAlt, FaRegUserCircle, FaBell } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";

import StatCard from '../components/app_components/StatCard';
import IncomingWasteCard from '../components/app_components/IncomingWasteCard';
import MaggotStatusCard from '../components/app_components/MaggotStatusCard';
import MonitoringGraphCard from '../components/app_components/MonitoringGraphCard';

import { getLatestIotData } from '../actions/iot.actions';
import { useEffect, useState, useRef, useMemo } from 'react';

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

const calculateAverage = (data) => {
    if (!data || data.length === 0) return 0;
    const total = data.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
    return (total / data.length).toFixed(1);
};


export default function MonitoringPage() {
    const [temp, setTemp] = useState([]);
    const [hum, setHum] = useState([]);
    const avgTemp = useMemo(() => calculateAverage(temp), [temp]);
    const avgHum = useMemo(() => calculateAverage(hum), [hum]);

    const stats = [
        {
            id: 1,
            icon: <FaThermometerEmpty />,
            label: 'Temp.',
            value: avgTemp,
            unit: '°C',
            optimal: 'Optimal: 25 - 30 °C'
        },
        {
            id: 2,
            icon: <FaDroplet />,
            label: 'Humidity',
            value: avgHum,
            unit: '%',
            optimal: 'Optimal: 60 - 70 %'
        },
        {
            id: 3,
            icon: <FaFlask />,
            label: 'Amonia',
            value: '12',
            unit: 'ppm',
            optimal: 'Optimal: <20 ppm'
        },
        {
            id: 4,
            icon: <FaTrashAlt />,
            label: 'Waste processed',
            value: '10',
            unit: 'Kg',
            optimal: ' '
        }
    ];

    const [connectionStatus, setConnectionStatus] = useState("Disconnected");

    const ws = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLatestIotData();

                const formatData = (dataArray) => {
                    return dataArray.map(item => {
                        const dateObj = new Date(item.time);
                        return {
                            ...item,
                            time: dateObj.toLocaleTimeString('id-ID', {
                                hour12: false,
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })
                        };
                    });
                };
                
                setTemp(formatData(data.temperature));
                setHum(formatData(data.humidity));

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        ws.current = new WebSocket("ws://127.0.0.1:3000/ws");
        setConnectionStatus("Connecting...");

        ws.current.onopen = () => {
            console.log("WS Connected");
            setConnectionStatus("Connected");
        };

        ws.current.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            const dateObj = new Date(data.timestamp);

            const timeString = dateObj.toLocaleTimeString('id-ID', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            const newPoint = {
                value: data.value,
                time: timeString
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

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">

                {stats.map(stat => (
                    <StatCard
                        key={stat.id}
                        icon={stat.icon}
                        label={stat.label}
                        value={stat.value}
                        unit={stat.unit}
                        optimal={stat.optimal}
                    />
                ))}

                <IncomingWasteCard />
                <MaggotStatusCard />
                <MonitoringGraphCard data1={temp} data2={hum} label1="Temperature" label2="Humidity" />

            </div>

        </div>
    );
}