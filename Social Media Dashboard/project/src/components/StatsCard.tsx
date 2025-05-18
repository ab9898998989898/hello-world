import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'primary'
}) => {
  const isPositive = change && change > 0;
  const changeText = change ? `${isPositive ? '+' : ''}${change}%` : null;
  
  return (
    <div className="card card-hover animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-500/10`}>
          {icon}
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center ${isPositive ? 'text-success-500' : 'text-error-500'}`}>
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className="text-sm font-medium">{changeText}</span>
          </div>
        )}
      </div>
      
      <h3 className="stat-value">{value}</h3>
      <p className="stat-label">{title}</p>
    </div>
  );
};

export default StatsCard;