import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const genderData = [
  { name: 'Female', value: 58 },
  { name: 'Male', value: 40 },
  { name: 'Other', value: 2 }
];

const ageData = [
  { name: '18-24', value: 15 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 30 },
  { name: '45-54', value: 12 },
  { name: '55+', value: 8 }
];

const GENDER_COLORS = ['#7e3af2', '#3b62f6', '#14b8a6'];
const AGE_COLORS = ['#14b8a6', '#3b62f6', '#7e3af2', '#f59e0b', '#ef4444'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-900 p-3 border border-dark-700 rounded-lg shadow-lg">
        <p className="text-dark-200 text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm font-bold" style={{ color: payload[0].color }}>
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const AudienceOverview: React.FC = () => {
  return (
    <div className="card h-full">
      <h3 className="text-lg font-semibold mb-4">Audience Demographics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-center mb-2">Gender</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-center mb-2">Age</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-dark-800 rounded-lg">
          <p className="text-sm text-dark-300 mb-1">Top Country</p>
          <p className="font-medium">United States</p>
        </div>
        <div className="p-3 bg-dark-800 rounded-lg">
          <p className="text-sm text-dark-300 mb-1">Top City</p>
          <p className="font-medium">New York</p>
        </div>
        <div className="p-3 bg-dark-800 rounded-lg">
          <p className="text-sm text-dark-300 mb-1">Language</p>
          <p className="font-medium">English</p>
        </div>
        <div className="p-3 bg-dark-800 rounded-lg">
          <p className="text-sm text-dark-300 mb-1">Active Times</p>
          <p className="font-medium">6PM - 9PM</p>
        </div>
      </div>
    </div>
  );
};

export default AudienceOverview;