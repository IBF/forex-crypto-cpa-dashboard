import React from 'react';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  colorClass?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, prefix = '', suffix = '', trend, colorClass = 'text-content' }) => {
  const isPositive = trend && trend >= 0;

  return (
    <div className="glass-panel p-4 sm:p-5 rounded-xl flex flex-col justify-between glass-panel-hover">
      <p className="text-xs font-bold tracking-wider text-content-muted uppercase mb-2 sm:mb-3 text-nowrap truncate">{title}</p>
      <div className="flex flex-wrap items-center sm:items-end justify-between gap-x-2 gap-y-1 mt-auto">
        <h3 className={cn("text-xl sm:text-2xl font-mono tracking-tight font-medium truncate shrink", colorClass)}>
          {prefix}{value}{suffix}
        </h3>
        {trend !== undefined && (
          <div className={cn("hidden sm:flex items-center text-xs font-medium whitespace-nowrap shrink-0", isPositive ? "text-forex" : "text-red-400")}>
            {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
};
