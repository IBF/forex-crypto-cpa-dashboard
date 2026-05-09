import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { generateTrendData } from '../data';

interface FunnelProps {
  clicks: number;
  leads: number;
  ftds: number;
  deposits: number;
}

export const PerformanceFunnel: React.FC<FunnelProps> = ({ clicks, leads, ftds, deposits }) => {
  const leadRate = clicks > 0 ? (leads / clicks) * 100 : 0;
  const ftdRate = leads > 0 ? (ftds / leads) * 100 : 0;
  
  const formatNum = (val: number) => val.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const formatPerc = (val: number) => val.toFixed(1) + '%';

  return (
    <div className="glass-panel p-5 rounded-xl flex flex-col h-full">
      <h4 className="text-lg font-semibold tracking-tight mb-8">Performance Funnel</h4>
      
      <div className="flex-1 flex flex-col gap-5 justify-center">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold tracking-widest text-content-muted mb-1">
            <span>CLICKS</span>
            <span>{formatNum(clicks)}</span>
          </div>
          <div className="h-10 w-full bg-white/[0.02] rounded-lg overflow-hidden border border-surface-border">
            <div className="h-full w-full bg-[#03DAC6]/20 border-r-2 border-[#03DAC6] neon-border-crypto shadow-[0_0_15px_rgba(3,218,198,0.2)]"></div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold tracking-widest text-content-muted mb-1 px-[10%]">
            <span>LEADS</span>
            <span>{formatNum(leads)} <span className="text-[10px] font-normal">({formatPerc(leadRate)})</span></span>
          </div>
          <div className="h-10 w-[80%] bg-white/[0.02] rounded-lg overflow-hidden border border-surface-border mx-auto">
            <div className="h-full w-full bg-[#3ce36a]/20 border-r-2 border-[#3ce36a] shadow-[0_0_15px_rgba(60,227,106,0.2)]"></div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold tracking-widest text-content-muted mb-1 px-[20%]">
            <span>FTD</span>
            <span>{formatNum(ftds)} <span className="text-[10px] font-normal">({formatPerc(ftdRate)})</span></span>
          </div>
          <div className="h-10 w-[60%] bg-white/[0.02] rounded-lg overflow-hidden border border-surface-border mx-auto">
            <div className="h-full w-full bg-[#BB86FC]/20 border-r-2 border-[#BB86FC] neon-border-crypto shadow-[0_0_15px_rgba(187,134,252,0.2)]"></div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold tracking-widest text-content-muted mb-1 px-[30%]">
            <span>DEPOSIT</span>
            <span>${formatNum(deposits)}</span>
          </div>
          <div className="h-10 w-[40%] bg-white/[0.02] rounded-lg overflow-hidden border border-surface-border mx-auto">
            <div className="h-full w-full bg-[#00C853]/20 border-r-2 border-[#00C853] neon-border-forex shadow-[0_0_15px_rgba(0,200,83,0.2)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfitTrendChart: React.FC<{ days: number }> = ({ days }) => {
  const data = React.useMemo(() => generateTrendData(days), [days]);

  return (
    <div className="glass-panel p-5 rounded-xl h-full flex flex-col min-h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold tracking-tight">Revenue vs Spend Trends</h4>
        <span className="text-sm text-forex flex items-center gap-1 font-medium">
          <TrendingUp size={16} /> +12.4% vs prev
        </span>
      </div>
      <div className="flex-1 w-full min-h-0 relative -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BB86FC" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#BB86FC" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#03DAC6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#03DAC6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#978D9D' }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#978D9D' }}
              tickFormatter={(val) => `$${(val / 1000)}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111417', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px' }}
              itemStyle={{ fontSize: '14px', fontWeight: 600 }}
              labelStyle={{ color: '#978D9D', marginBottom: '8px' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#BB86FC" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="spend" name="Spend" stroke="#03DAC6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
