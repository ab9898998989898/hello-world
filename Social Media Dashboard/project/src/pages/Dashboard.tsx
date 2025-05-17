import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/StatsCard';
import EngagementChart from '../components/EngagementChart';
import PlatformPerformance from '../components/PlatformPerformance';
import TopPosts from '../components/TopPosts';
import AudienceOverview from '../components/AudienceOverview';
import { Users, Heart, BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl">Analytics Dashboard</h1>
          <p className="text-dark-400">Welcome back! Here's what's happening with your social media.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn btn-outline">
            <Calendar size={16} />
            Last 30 Days
          </button>
          <button className="btn btn-primary">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatsCard 
            title="Total Followers" 
            value="45,241" 
            change={5.2} 
            icon={<Users size={20} className="text-primary-500" />} 
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatsCard 
            title="Total Engagement" 
            value="12,850" 
            change={3.1} 
            icon={<Heart size={20} className="text-secondary-500" />} 
            color="secondary"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatsCard 
            title="Total Posts" 
            value="319" 
            change={-2.3} 
            icon={<BarChart3 size={20} className="text-accent-500" />} 
            color="accent"
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatsCard 
            title="Conversion Rate" 
            value="3.8%" 
            change={1.4} 
            icon={<TrendingUp size={20} className="text-success-500" />} 
            color="success"
          />
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart />
        <PlatformPerformance />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPosts />
        <AudienceOverview />
      </div>
    </div>
  );
};

export default Dashboard;