
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { campaignData } from '@/lib/mock-data';

const CampaignPerformanceChart = () => {
  const data = {
    labels: campaignData.map(d => d.month),
    datasets: [
      {
        label: 'Facebook',
        data: campaignData.map(d => d.facebook),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: 'Instagram',
        data: campaignData.map(d => d.instagram),
        backgroundColor: 'rgba(236, 72, 153, 0.7)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: 'Google Ads',
        data: campaignData.map(d => d.google),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#e0e0e0'} },
      title: { display: true, text: 'Campaign Performance by Platform', color: '#e0e0e0', font: { size: 16 } },
    },
    scales: {
      x: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255,255,255,0.1)' } },
    },
  };
  return <Bar data={data} options={options} />;
};

export default CampaignPerformanceChart;
