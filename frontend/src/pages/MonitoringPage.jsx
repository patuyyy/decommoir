import React from 'react';

import { FaThermometerEmpty, FaFlask, FaTrashAlt, FaRegUserCircle, FaBell } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";

import StatCard from '../components/app_components/StatCard';
import IncomingWasteCard from '../components/app_components/IncomingWasteCard';
import MaggotStatusCard from '../components/app_components/MaggotStatusCard';
import MonitoringGraphCard from '../components/app_components/MonitoringGraphCard';

const stats = [
    {
        id: 1,
        icon: <FaThermometerEmpty />,
        label: 'Temp.',
        value: '28',
        unit: '°C',
        optimal: 'Optimal: 25 - 30 °C'
    },
    {
        id: 2,
        icon: <FaDroplet />,
        label: 'Humidity',
        value: '65',
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

export default function MonitoringPage() {
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
                <MonitoringGraphCard />

            </div>
        </div>
    );
}