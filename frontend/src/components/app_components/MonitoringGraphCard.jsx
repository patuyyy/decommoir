import React from 'react';
import { LuInfo, LuExpand } from 'react-icons/lu';

export default function MonitoringGraphCard() {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                    Grafik Monitoring 7 Hari Terakhir
                </h3>
                <div className="flex space-x-3 text-gray-500">
                    <button className="hover:text-gray-700">
                        <LuInfo />
                    </button>
                    <button className="hover:text-gray-700">
                        <LuExpand />
                    </button>
                </div>
            </div>

            {/* Placeholder untuk Grafik */}
            <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                Chart/Grafik akan tampil di sini
            </div>
        </div>
    );
}