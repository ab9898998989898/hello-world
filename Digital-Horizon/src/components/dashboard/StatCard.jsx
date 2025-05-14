
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatCard = ({ title, value, change, icon, changeType }) => {
  const IconComponent = icon;
  const changeColor = changeType === 'positive' ? 'text-green-400' : 'text-red-400';
  return (
    <Card className="glass-card stat-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-sky-200">{title}</CardTitle>
        <IconComponent className="h-5 w-5 text-sky-400" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value}</div>
        {change && (
          <p className={`text-xs ${changeColor} mt-1`}>
            {change} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
