import React from 'react';

export default function MaggotStatusCard() {
    const progress = 75;

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Maggot Status</h3>
            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Total Weight</span>
                    <span className="font-medium text-gray-800">15 Kg</span>
                </div>
                <div className="flex justify-between">
                    <span>Time till Harvest</span>
                    <span className="font-medium text-gray-800">3 days left</span>
                </div>
            </div>

            <div className="mt-4">
                <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="mt-1 text-right text-xs text-gray-500">
                    {progress}% towards harvest time
                </p>
            </div>
        </div>
    );
}