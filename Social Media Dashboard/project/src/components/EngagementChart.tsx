import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format, subDays } from 'date-fns';

// Generate sample data for the past 14 days
const generateData = () => {
  const data = [];
  for (let i = 14; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, 'MMM dd'),
      likes: Math.floor(Math.random() * 500) + 100,
      comments: Math.floor(Math.random() * 200) + 50,
      shares: Math.floor(Math.random() * 100) + 20,
    });
  }
  return data;
};

const data = generateData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-900 p-3 border border-dark-700 rounded-lg shadow-lg">
        <p className="text-dark-200 text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const EngagementChart: React.FC = () => {
  return (
    <div className="card h-[350px]">
      <h3 className="text-lg font-semibold mb-4">Engagement Overview</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b62f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b62f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7e3af2" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7e3af2" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#8494a8' }} 
            tickLine={{ stroke: '#4a5568' }}
            axisLine={{ stroke: '#4a5568' }} 
          />
          <YAxis 
            tick={{ fill: '#8494a8' }} 
            tickLine={{ stroke: '#4a5568' }}
            axisLine={{ stroke: '#4a5568' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            iconType="circle" 
            wrapperStyle={{ paddingTop: '10px' }} 
          />
          <Area
            type="monotone"
            dataKey="likes"
            name="Likes"
            stroke="#3b62f6"
            fill="url(#colorLikes)"
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="comments"
            name="Comments"
            stroke="#7e3af2"
            fill="url(#colorComments)"
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="shares"
            name="Shares"
            stroke="#14b8a6"
            fill="url(#colorShares)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;