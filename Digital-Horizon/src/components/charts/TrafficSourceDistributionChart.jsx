
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { trafficSourceData } from '@/lib/mock-data';

const TrafficSourceDistributionChart = () => {
  const data = {
    labels: trafficSourceData.map(d => d.source),
    datasets: [{
      data: trafficSourceData.map(d => d.value),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(107, 114, 128, 0.8)',
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(107, 114, 128, 1)',
      ],
      borderWidth: 1,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: '#e0e0e0'} },
      title: { display: true, text: 'Traffic Source Distribution', color: '#e0e0e0', font: { size: 16 } },
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default TrafficSourceDistributionChart;
