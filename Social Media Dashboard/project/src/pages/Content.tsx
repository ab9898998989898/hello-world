import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, PlusCircle, Filter, ArrowUpDown } from 'lucide-react';

// Sample data for content performance
const performanceData = [
  { day: 'Mon', posts: 3, engagement: 250, reach: 1200 },
  { day: 'Tue', posts: 2, engagement: 320, reach: 1400 },
  { day: 'Wed', posts: 4, engagement: 380, reach: 1600 },
  { day: 'Thu', posts: 3, engagement: 420, reach: 1800 },
  { day: 'Fri', posts: 5, engagement: 520, reach: 2200 },
  { day: 'Sat', posts: 2, engagement: 380, reach: 1700 },
  { day: 'Sun', posts: 1, engagement: 250, reach: 1100 },
];

// Sample data for content types
const contentTypes = [
  { type: 'Image Posts', count: 53, engagement: 6.8 },
  { type: 'Video Content', count: 28, engagement: 8.2 },
  { type: 'Text Updates', count: 42, engagement: 3.5 },
  { type: 'Link Shares', count: 35, engagement: 4.2 },
  { type: 'Polls/Questions', count: 12, engagement: 7.4 },
];

// Sample data for recent content
const recentContent = [
  {
    id: 1,
    title: "New Product Announcement",
    platform: "Twitter",
    date: "Apr 15, 2025",
    engagement: 542,
    performance: "high",
  },
  {
    id: 2,
    title: "Behind the Scenes at Company Event",
    platform: "Instagram",
    date: "Apr 12, 2025",
    engagement: 873,
    performance: "high",
  },
  {
    id: 3,
    title: "Industry Insights Report 2025",
    platform: "LinkedIn",
    date: "Apr 10, 2025",
    engagement: 321,
    performance: "medium",
  },
  {
    id: 4,
    title: "Customer Testimonial Video",
    platform: "Facebook",
    date: "Apr 8, 2025",
    engagement: 245,
    performance: "medium",
  },
  {
    id: 5,
    title: "Weekly Tips and Advice",
    platform: "Twitter",
    date: "Apr 5, 2025",
    engagement: 187,
    performance: "low",
  },
];

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

const Content: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl">Content Performance</h1>
          <p className="text-dark-400">Track your content engagement and optimize your strategy.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn btn-outline">
            <Calendar size={16} />
            Last 7 Days
          </button>
          <button className="btn btn-primary">
            <PlusCircle size={16} />
            Create Content
          </button>
        </div>
      </div>
      
      <div className="card h-[350px]">
        <h3 className="text-lg font-semibold mb-4">Content Performance</h3>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            data={performanceData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
            <XAxis 
              dataKey="day" 
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
            <Line
              type="monotone"
              dataKey="engagement"
              name="Engagement"
              stroke="#3b62f6"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="reach"
              name="Reach"
              stroke="#14b8a6"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Content Type Performance</h3>
          <div className="space-y-6">
            {contentTypes.map((type, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{type.type}</span>
                  <span className="text-sm bg-dark-800 px-2 py-1 rounded">
                    {type.count} posts
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-dark-800 rounded-full h-2 flex-1">
                    <div
                      className={`h-2 rounded-full ${
                        index % 3 === 0 ? 'bg-primary-600' : 
                        index % 3 === 1 ? 'bg-secondary-600' : 'bg-accent-600'
                      }`}
                      style={{ width: `${(type.engagement / 10) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium">{type.engagement}%</span>
                  </div>
                </div>
                <p className="text-xs text-dark-400">Engagement rate</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Content</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-dark-800 rounded-lg">
                <Filter size={16} className="text-dark-400" />
              </button>
              <button className="p-2 hover:bg-dark-800 rounded-lg">
                <ArrowUpDown size={16} className="text-dark-400" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {recentContent.map(content => (
              <div key={content.id} className="p-3 border border-dark-800 rounded-lg hover:border-dark-700 transition-all">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{content.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-dark-800 px-2 py-0.5 rounded">{content.platform}</span>
                      <span className="text-xs text-dark-400">{content.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{content.engagement}</p>
                    <p className="text-xs text-dark-400">Engagements</p>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center">
                  <div className="w-full bg-dark-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        content.performance === 'high' ? 'bg-success-500' :
                        content.performance === 'medium' ? 'bg-warning-500' : 'bg-error-500'
                      }`}
                      style={{ 
                        width: content.performance === 'high' ? '80%' : 
                               content.performance === 'medium' ? '50%' : '30%' 
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-dark-400">
                    {content.performance === 'high' ? 'High' :
                     content.performance === 'medium' ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-sm text-primary-400 hover:text-primary-300">
              View all content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;