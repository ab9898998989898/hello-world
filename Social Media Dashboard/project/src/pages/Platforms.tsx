import React from 'react';
import { Share2, ExternalLink, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

const platforms = [
  {
    id: 1,
    name: 'Twitter',
    icon: '𝕏',
    className: 'platform-twitter',
    connected: true,
    metrics: {
      followers: 8540,
      posts: 125,
      engagementRate: 5.2,
      reachRate: 12.4,
      trend: 'up'
    }
  },
  {
    id: 2,
    name: 'Instagram',
    icon: '📸',
    className: 'platform-instagram',
    connected: true,
    metrics: {
      followers: 12400,
      posts: 87,
      engagementRate: 6.8,
      reachRate: 18.3,
      trend: 'up'
    }
  },
  {
    id: 3,
    name: 'Facebook',
    icon: 'f',
    className: 'platform-facebook',
    connected: true,
    metrics: {
      followers: 18200,
      posts: 65,
      engagementRate: 3.1,
      reachRate: 8.7,
      trend: 'down'
    }
  },
  {
    id: 4,
    name: 'LinkedIn',
    icon: 'in',
    className: 'platform-linkedin',
    connected: true,
    metrics: {
      followers: 5300,
      posts: 42,
      engagementRate: 4.5,
      reachRate: 10.2,
      trend: 'up'
    }
  },
  {
    id: 5,
    name: 'Pinterest',
    icon: 'P',
    className: 'bg-gradient-to-br from-red-600 to-red-700',
    connected: false,
    metrics: null
  },
  {
    id: 6,
    name: 'TikTok',
    icon: 'T',
    className: 'bg-gradient-to-br from-black to-dark-900 border border-teal-300',
    connected: false,
    metrics: null
  },
];

const Platforms: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl">Social Platforms</h1>
          <p className="text-dark-400">Manage your connected platforms and monitor their performance.</p>
        </div>
        
        <button className="btn btn-primary">
          <Share2 size={16} />
          Connect Platform
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {platforms.map(platform => (
          <div key={platform.id} className="card card-hover">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold ${platform.className}`}>
                  {platform.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{platform.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`inline-block w-2 h-2 rounded-full ${platform.connected ? 'bg-success-500' : 'bg-dark-500'}`}></span>
                    <span className="text-xs ml-1 text-dark-400">{platform.connected ? 'Connected' : 'Not Connected'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                {platform.connected && (
                  <a href="#" className="p-2 hover:bg-dark-800 rounded-lg" aria-label="View profile">
                    <ExternalLink size={16} className="text-dark-400" />
                  </a>
                )}
                <button className="p-2 hover:bg-dark-800 rounded-lg" aria-label="More options">
                  <MoreHorizontal size={16} className="text-dark-400" />
                </button>
              </div>
            </div>
            
            {platform.connected ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-800 p-3 rounded-lg">
                    <p className="text-xs text-dark-400 mb-1">Followers</p>
                    <p className="font-semibold">{platform.metrics?.followers.toLocaleString()}</p>
                  </div>
                  <div className="bg-dark-800 p-3 rounded-lg">
                    <p className="text-xs text-dark-400 mb-1">Posts</p>
                    <p className="font-semibold">{platform.metrics?.posts}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                  <div>
                    <p className="text-xs text-dark-400 mb-1">Engagement Rate</p>
                    <p className="font-semibold">{platform.metrics?.engagementRate}%</p>
                  </div>
                  <div className={platform.metrics?.trend === 'up' ? 'text-success-500' : 'text-error-500'}>
                    {platform.metrics?.trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="text-sm text-primary-400 hover:text-primary-300">
                    View detailed analytics
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <button className="btn btn-outline w-full">
                  Connect Account
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platforms;