import React from 'react';

import { FaThermometerEmpty, FaFlask, FaTrashAlt, FaRegUserCircle, FaBell } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";

import StatCard from '../components/app_components/StatCard';
import IncomingWasteCard from '../components/app_components/IncomingWasteCard';
import MaggotStatusCard from '../components/app_components/MaggotStatusCard';
import MonitoringGraphCard from '../components/app_components/MonitoringGraphCard';
import MonitoringGraphCard1 from '../components/app_components/MonitoringGraphCard1';

import { getLatest50IotData } from '../actions/iot.actions';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';

const calculateAverage = (data) => {
    if (!data || data.length === 0) return 0;
    const total = data.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
    return (total / data.length).toFixed(1);
};

export default function MonitoringPage() {
    const id = useParams();
    const [temp, setTemp] = useState([]);
    const [hum, setHum] = useState([]);
    const [airQ, setAirQ] = useState([]);
    const [distance, setDistance] = useState([]);
    const latestTemp = useMemo(() => {
        if (!temp || temp.length === 0) return 0;
        return Number(temp[temp.length - 1].value).toFixed(1);
    }, [temp]);
    const latestHum = useMemo(() => {
        if (!hum || hum.length === 0) return 0;
        return Number(hum[hum.length - 1].value).toFixed(1);
    }, [hum]);
    const latestAirQ = useMemo(() => {
        if (!airQ || airQ.length === 0) return 0;
        return Number(airQ[airQ.length - 1].value).toFixed(1);
    }, [airQ]);
    const latestDistance = useMemo(() => {
        if (!distance || distance.length === 0) return 0;
        return Number(distance[distance.length - 1].value).toFixed(1);
    }, [distance]);

    const ws = useRef(null);

    const convertToPercentage = (rawDistance) => {
        const maxHeight = 30;
        const currentDist = Number(rawDistance);

        const validDist = Math.min(Math.max(currentDist, 0), maxHeight);
        const percentage = ((maxHeight - validDist) / maxHeight) * 100;

        return percentage.toFixed(0);
    };

    const stats = [
        {
            id: 1,
            icon: <FaThermometerEmpty />,
            label: 'Temp.',
            value: latestTemp,
            unit: '°C',
            optimal: 'Optimal: 25 - 30 °C'
        },
        {
            id: 2,
            icon: <FaDroplet />,
            label: 'Humidity',
            value: latestHum,
            unit: '%',
            optimal: 'Optimal: 60 - 70 %'
        },
        {
            id: 3,
            icon: <FaFlask />,
            label: 'Air Quality',
            value: latestAirQ,
            unit: 'ppm',
            optimal: 'Optimal: 350 - 400 ppm'
        },
        {
            id: 4,
            icon: <FaTrashAlt />,
            label: 'Trash Capacity',
            value: latestDistance,
            unit: '%',
            optimal: ' '
        }
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLatest50IotData(id.id);

                const formatData = (dataArray, isDistance = false) => {
                    if (!dataArray) return []; 

                    return dataArray.map(item => {
                        const dateObj = new Date(item.time);
                        return {
                            ...item,
                            value: isDistance ? convertToPercentage(item.value) : item.value, 
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
                setAirQ(formatData(data.airQuality));

                setDistance(formatData(data.distance, true)); 

            } catch (err) {
                console.log(err);
            }
        };

        if (id.id) fetchData(); 
    }, [id.id]); 

    useEffect(() => {
        ws.current = new WebSocket(import.meta.env.VITE_WS_URL);

        ws.current.onopen = () => {
            console.log("WS Connected");
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

            let finalValue = data.value;

            if (data.type === 'v8') {
                finalValue = convertToPercentage(data.value);
            }

            const newPoint = {
                value: finalValue,
                time: timeString
            };
            console.log(newPoint);

            if (data.type === 'v1') {
                setTemp(prev => [...prev.slice(-49), newPoint]);
            } else if (data.type === 'v2') {
                setHum(prev => [...prev.slice(-49), newPoint]);
            } else if (data.type === 'v5') {
                setAirQ(prev => [...prev.slice(-49), newPoint]);
            } else if (data.type === 'v8') {
                setDistance(prev => [...prev.slice(-49), newPoint]);
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
                    <button onClick={() => navigate('/profile')} className="text-3xl text-gray-500 hover:text-gray-700">
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
                <MonitoringGraphCard data1={temp} data2={hum} data3={distance} label1="Temperature" label2="Humidity" label3="Trash Capacity" />
                <MonitoringGraphCard1 data1={airQ} label1="Air Quality" />

            </div>

        </div>
    );
}