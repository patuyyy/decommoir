import React from 'react';

export default function StatCard({ icon, label, value, unit, optimal }) {
    return (
        <div className="flex items-center rounded-xl bg-white p-5 shadow-sm">
            <div className="mr-4 rounded-full bg-blue-100 p-3 text-2xl text-blue-600">
                {icon}
            </div>
            <div>
                <span className="text-sm text-gray-500">{label}</span>
                <p className="text-2xl font-bold text-gray-800">
                    {value}
                    <span className="ml-1 text-lg font-normal">{unit}</span>
                </p>
                <span className="text-xs text-gray-400">{optimal}</span>
            </div>
        </div>
    );
}