import React from 'react';
import { Heart, MessageCircle, RefreshCw, ExternalLink } from 'lucide-react';

const posts = [
  {
    id: 1,
    platform: 'twitter',
    content: "Just launched our new product line! Check it out at our website. #NewLaunch #Excited",
    stats: { likes: 542, comments: 128, shares: 87 },
    date: '2 days ago',
    image: 'https://images.pexels.com/photos/7693212/pexels-photo-7693212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    platform: 'instagram',
    content: "Behind the scenes at our monthly team meeting. Always inspiring to connect with the amazing people that make our company great!",
    stats: { likes: 873, comments: 56, shares: 23 },
    date: '4 days ago',
    image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    platform: 'facebook',
    content: "We're thrilled to announce we've been nominated for 'Best Innovation' award this year! Thank you to our amazing customers and team.",
    stats: { likes: 1254, comments: 234, shares: 187 },
    date: '1 week ago',
    image: null
  },
];

const TopPosts: React.FC = () => {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Performing Posts</h3>
        <button className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>
      
      <div className="space-y-4">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="p-3 border border-dark-800 rounded-lg hover:border-dark-700 transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full platform-${post.platform} flex items-center justify-center`}>
                {post.platform === 'twitter' && <span className="text-xl">𝕏</span>}
                {post.platform === 'instagram' && <span className="text-xl">📸</span>}
                {post.platform === 'facebook' && <span className="text-xl">f</span>}
              </div>
              <div>
                <p className="font-medium capitalize">{post.platform}</p>
                <p className="text-xs text-dark-400">{post.date}</p>
              </div>
              <a href="#" className="ml-auto text-dark-400 hover:text-dark-200">
                <ExternalLink size={16} />
              </a>
            </div>
            
            <p className="text-sm mb-3">{post.content}</p>
            
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center gap-4 text-dark-400">
              <div className="flex items-center gap-1 text-sm">
                <Heart size={14} className="text-error-500" />
                <span>{post.stats.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <MessageCircle size={14} />
                <span>{post.stats.comments.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <RefreshCw size={14} />
                <span>{post.stats.shares.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;