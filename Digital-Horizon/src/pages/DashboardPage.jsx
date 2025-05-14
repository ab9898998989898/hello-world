
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Briefcase, DollarSign, TrendingUp, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/dashboard/StatCard';
import CampaignPerformanceChart from '@/components/charts/CampaignPerformanceChart';
import TrafficSourceDistributionChart from '@/components/charts/TrafficSourceDistributionChart';
import ConversionRateChart from '@/components/charts/ConversionRateChart';
import { recentCampaigns } from '@/lib/mock-data';

const DashboardPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="p-6 space-y-6"
  >
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-sky-100">Marketing Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Select defaultValue="last30days">
          <SelectTrigger className="w-[180px] glass-card text-sky-200 border-sky-700">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-sky-700 text-sky-200">
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="last90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="glass-card text-sky-200 border-sky-700 hover:bg-sky-700/50">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Clicks" value="78.2K" change="+12.5%" icon={TrendingUp} changeType="positive" />
      <StatCard title="Total Impressions" value="1.2M" change="+8.2%" icon={Briefcase} changeType="positive" />
      <StatCard title="Conversion Rate" value="3.4%" change="-0.5%" icon={DollarSign} changeType="negative" />
      <StatCard title="Total Spend" value="$12,580" change="+5.1%" icon={BarChart2} changeType="positive" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 glass-card">
        <CardHeader>
          <CardTitle className="text-xl text-sky-100">Campaign Performance</CardTitle>
          <CardDescription className="text-sky-400">Monthly breakdown of key platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <CampaignPerformanceChart />
          </div>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl text-sky-100">Traffic Sources</CardTitle>
          <CardDescription className="text-sky-400">Distribution of website visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <TrafficSourceDistributionChart />
          </div>
        </CardContent>
      </Card>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="text-xl text-sky-100">Weekly Conversions</CardTitle>
                <CardDescription className="text-sky-400">Trend of conversions over the past week</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="chart-container">
                    <ConversionRateChart />
                </div>
            </CardContent>
        </Card>
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="text-xl text-sky-100">Recent Campaigns</CardTitle>
                <CardDescription className="text-sky-400">Overview of latest marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {recentCampaigns.slice(0,4).map((campaign) => (
                        <li key={campaign.id} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-md">
                            <div>
                                <p className="font-semibold text-sky-100">{campaign.name}</p>
                                <p className="text-xs text-sky-400">{campaign.platform}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                campaign.status === 'Active' ? 'bg-green-500/20 text-green-300' : 
                                campaign.status === 'Paused' ? 'bg-yellow-500/20 text-yellow-300' : 
                                'bg-red-500/20 text-red-300'
                            }`}>
                                {campaign.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </div>
  </motion.div>
);

export default DashboardPage;
