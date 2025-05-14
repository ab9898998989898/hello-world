
import React from 'react';
import { Line } from 'react-chartjs-2';
import { conversionData } from '@/lib/mock-data';

const ConversionRateChart = () => {
    const data = {
        labels: conversionData.map(d => d.day),
        datasets: [
            {
                label: 'Conversions',
                data: conversionData.map(d => d.conversions),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3,
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Weekly Conversions', color: '#e0e0e0', font: { size: 16 } },
        },
        scales: {
            x: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255,255,255,0.1)' } },
            y: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        },
    };
    return <Line data={data} options={options} />;
};

export default ConversionRateChart;
