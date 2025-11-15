import React from 'react';

const wasteItems = [
    { id: 1, name: 'Nasi', amount: '1Kg', emoji: '🍚' }
];

export default function IncomingWasteCard() {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Incoming Waste</h3>
            <div className="space-y-3">
                {wasteItems.map(item => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                        <div className="flex items-center">
                            <span className="mr-3 text-2xl">{item.emoji}</span>
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </div>
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                            {item.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}