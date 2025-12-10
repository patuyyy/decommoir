import React from 'react';
import { LuInfo, LuExpand } from 'react-icons/lu';
import { Line } from "react-chartjs-2";
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

export default function MonitoringGraphCard({
    data1 = [],
    data2 = [],
    data3 = [],
    data4 = [],
    label1 = "Data 1",
    label2 = "Data 2",
    label3 = "Data 3",
    label4 = "Data 4"
}) {

    const formatChartData = () => {
        const sourceData = data1.length >= data2.length ? data1 : data2;
        const labels = sourceData.map(d => d.time);

        return {
            labels: labels,
            datasets: [
                {
                    label: label1,
                    data: labels.map((_, i) => data1[i]?.value ?? null),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 2,
                    tension: 0.3,
                    spanGaps: true 
                },
                {
                    label: label2,
                    data: labels.map((_, i) => data2[i]?.value ?? null),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderWidth: 2,
                    tension: 0.3,
                    spanGaps: true
                },
                {
                    label: label3,
                    data: labels.map((_, i) => data3[i]?.value ?? null),
                    borderColor: 'rgba(0, 255, 8, 1)',
                    backgroundColor: 'rgba(0, 255, 8, 0.5)',
                    borderWidth: 2,
                    tension: 0.3,
                    spanGaps: true
                },
                {
                    label: label4,
                    data: labels.map((_, i) => data4[i]?.value ?? null),
                    borderColor: 'rgba(255, 255, 0, 1)',
                    backgroundColor: 'rgba(255, 255, 0, 0.5)',
                    borderWidth: 2,
                    tension: 0.3,
                    spanGaps: true
                }
            ]
        };
    };

    const options = {
        responsive: true,
        animation: { duration: 0 },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                    Grafik Monitoring Gabungan
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

            <div style={{ padding: 20 }}>
                {/* Hapus key={length} agar tidak re-mount paksa */}
                <Line data={formatChartData()} options={options} />
            </div>
        </div>
    );
}