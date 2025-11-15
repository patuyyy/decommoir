import React from 'react';

const DeviceCard = ({ device }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                {device.name}
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Temperature</span>
                    <span className="font-medium text-gray-800">: {device.temp}</span>
                </div>
                <div className="flex justify-between">
                    <span>Humidity</span>
                    <span className="font-medium text-gray-800">: {device.humidity}</span>
                </div>
                <div className="flex justify-between">
                    <span>pH content</span>
                    <span className="font-medium text-gray-800">: {device.ph}</span>
                </div>
                <div className="flex justify-between">
                    <span>Total processed waste</span>
                    <span className="font-medium text-gray-800">: {device.waste}</span>
                </div>
            </div>

            <div className="mt-6">
                <p className="mb-1 text-sm text-gray-600">Time till Harvest</p>
                <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: `${device.progress}%` }}
                    ></div>
                </div>
                <p className="mt-1 text-right text-xs text-gray-500">
                    {device.progress}% towards harvest time
                </p>
            </div>
        </div>
    );
};

export default DeviceCard;