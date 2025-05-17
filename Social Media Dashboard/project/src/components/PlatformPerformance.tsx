import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Twitter', followers: 8540, engagement: 5.2, posts: 125 },
  { name: 'Instagram', followers: 12400, engagement: 6.8, posts: 87 },
  { name: 'Facebook', followers: 18200, engagement: 3.1, posts: 65 },
  { name: 'LinkedIn', followers: 5300, engagement: 4.5, posts: 42 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-900 p-3 border border-dark-700 rounded-lg shadow-lg">
        <p className="text-dark-200 text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}{entry.name === 'Engagement Rate' ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PlatformPerformance: React.FC = () => {
  return (
    <div className="card h-[350px]">
      <h3 className="text-lg font-semibold mb-4">Platform Performance</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#8494a8' }} 
            tickLine={{ stroke: '#4a5568' }}
            axisLine={{ stroke: '#4a5568' }} 
          />
          <YAxis 
            yAxisId="left"
            tick={{ fill: '#8494a8' }} 
            tickLine={{ stroke: '#4a5568' }}
            axisLine={{ stroke: '#4a5568' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            domain={[0, 10]}
            tick={{ fill: '#8494a8' }} 
            tickLine={{ stroke: '#4a5568' }}
            axisLine={{ stroke: '#4a5568' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            iconType="circle" 
            wrapperStyle={{ paddingTop: '10px' }} 
          />
          <Bar
            yAxisId="left"
            dataKey="followers"
            name="Followers"
            fill="#3b62f6"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="engagement"
            name="Engagement Rate"
            fill="#14b8a6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlatformPerformance;