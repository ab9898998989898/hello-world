import React from 'react';
import { Users, Globe, Clock, Briefcase } from 'lucide-react';
import AudienceOverview from '../components/AudienceOverview';

const locations = [
  { country: 'United States', count: 24563, percentage: 54.3 },
  { country: 'United Kingdom', count: 6821, percentage: 15.1 },
  { country: 'Canada', count: 4532, percentage: 10.0 },
  { country: 'Australia', count: 3271, percentage: 7.2 },
  { country: 'Germany', count: 2854, percentage: 6.3 },
  { country: 'Others', count: 3200, percentage: 7.1 },
];

const interests = [
  { name: 'Technology', percentage: 68 },
  { name: 'Business', percentage: 54 },
  { name: 'Marketing', percentage: 47 },
  { name: 'Entrepreneurship', percentage: 42 },
  { name: 'Design', percentage: 35 },
  { name: 'Finance', percentage: 29 },
];

const Audience: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl">Audience Insights</h1>
        <p className="text-dark-400">Understand who your followers are and what they care about.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary-500/10">
              <Users size={20} className="text-primary-500" />
            </div>
            <h3 className="font-medium">Total Audience</h3>
          </div>
          <p className="text-2xl font-bold">45,241</p>
          <p className="text-xs text-dark-400 mt-1">Across all platforms</p>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-secondary-500/10">
              <Globe size={20} className="text-secondary-500" />
            </div>
            <h3 className="font-medium">Top Location</h3>
          </div>
          <p className="text-2xl font-bold">United States</p>
          <p className="text-xs text-dark-400 mt-1">54.3% of your audience</p>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent-500/10">
              <Clock size={20} className="text-accent-500" />
            </div>
            <h3 className="font-medium">Active Hours</h3>
          </div>
          <p className="text-2xl font-bold">6PM - 9PM</p>
          <p className="text-xs text-dark-400 mt-1">Eastern Standard Time</p>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-success-500/10">
              <Briefcase size={20} className="text-success-500" />
            </div>
            <h3 className="font-medium">Top Industry</h3>
          </div>
          <p className="text-2xl font-bold">Technology</p>
          <p className="text-xs text-dark-400 mt-1">68% of your audience</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
          <div className="space-y-4">
            {locations.map((location, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{location.country}</span>
                  <span className="text-sm text-dark-400">{location.percentage}%</span>
                </div>
                <div className="w-full bg-dark-800 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${location.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-dark-400">{location.count.toLocaleString()} followers</p>
              </div>
            ))}
          </div>
        </div>
        
        <AudienceOverview />
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Audience Interests</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{interest.name}</span>
                <span className="text-sm text-dark-400">{interest.percentage}%</span>
              </div>
              <div className="w-full bg-dark-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${index % 3 === 0 ? 'bg-primary-600' : index % 3 === 1 ? 'bg-secondary-600' : 'bg-accent-600'}`}
                  style={{ width: `${interest.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Audience;