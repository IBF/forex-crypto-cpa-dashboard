import React, { useState, useMemo } from 'react';
import { CAMPAIGNS, ALL_GEOS, CampaignData } from './data';
import { KPICard } from './components/KPICards';
import { CampaignTable } from './components/CampaignTable';
import { PerformanceFunnel, ProfitTrendChart } from './components/Charts';
import { Terminal, Globe, User } from 'lucide-react';
import { cn } from './lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

type DateRange = 'Today' | 'Yesterday' | 'Week' | 'Month';
type Vertical = 'All' | 'Crypto' | 'Forex';

export default function App() {
  const [dateRange, setDateRange] = useState<DateRange>('Week');
  const [geoFilter, setGeoFilter] = useState<string>('ALL');
  const [verticalFilter, setVerticalFilter] = useState<Vertical>('All');

  const multiplier = useMemo(() => {
    switch (dateRange) {
      case 'Today': return 0.12;
      case 'Yesterday': return 0.15;
      case 'Week': return 1;
      case 'Month': return 4.2;
    }
  }, [dateRange]);

  const filteredCampaigns = useMemo(() => {
    return CAMPAIGNS.filter(c => {
      const matchGeo = geoFilter === 'ALL' || c.geos.includes(geoFilter);
      const matchVert = verticalFilter === 'All' || c.type === verticalFilter;
      return matchGeo && matchVert;
    });
  }, [geoFilter, verticalFilter]);

  const totals = useMemo(() => {
    return filteredCampaigns.reduce((acc, curr) => {
      acc.spend += curr.baseStats.spend * multiplier;
      acc.clicks += curr.baseStats.clicks * multiplier;
      acc.leads += curr.baseStats.leads * multiplier;
      acc.ftds += curr.baseStats.ftds * multiplier;
      acc.deposits += curr.baseStats.deposits * multiplier;
      acc.recDeposits += curr.baseStats.recDeposits * multiplier;
      acc.revenue += curr.baseStats.revenue * multiplier;
      return acc;
    }, {
      spend: 0, clicks: 0, leads: 0, ftds: 0, deposits: 0, recDeposits: 0, revenue: 0
    });
  }, [filteredCampaigns, multiplier]);

  const profit = totals.revenue - totals.spend;
  const roi = totals.spend > 0 ? (profit / totals.spend) * 100 : 0;
  const avgCpa = 600;

  const formatCurrency = (v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  const formatNum = (v: number) => v.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const cryptoCount = filteredCampaigns.filter(c => c.type === 'Crypto').length;
  const forexCount = filteredCampaigns.filter(c => c.type === 'Forex').length;
  const totalCount = filteredCampaigns.length || 1;
  const geoPieData = useMemo(() => {
     return [
       { name: 'Crypto', value: cryptoCount, color: '#BB86FC' },
       { name: 'Forex', value: forexCount, color: '#00C853' }
     ];
  }, [cryptoCount, forexCount]);

  return (
    <div className="min-h-screen pb-20 md:pb-0 z-0 relative">
      {/* Background glow effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-crypto/5 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-forex/5 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-surface-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Terminal className="text-crypto w-8 h-8" />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-crypto to-forex bg-clip-text text-transparent">
              ADEXEC MM4
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <span className="text-xs font-bold tracking-widest text-crypto cursor-pointer">DASHBOARD</span>
              <span className="text-xs font-bold tracking-widest text-content-muted hover:text-content transition-colors cursor-pointer">CAMPAIGNS</span>
              <span className="text-xs font-bold tracking-widest text-content-muted hover:text-content transition-colors cursor-pointer">OFFERS</span>
            </nav>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-content hidden sm:block">Santaguida Giuseppe F.</span>
              <div className="w-9 h-9 rounded-full bg-surface border border-surface-border flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-sm">
                <User className="text-content-muted w-5 h-5 group-hover:text-content transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 space-y-6">
        
        {/* Filters */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-1 bg-surface-hover/50 p-1 rounded-lg border border-surface-border">
            {(['Today', 'Yesterday', 'Week', 'Month'] as DateRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-4 py-1.5 rounded text-sm font-medium transition-all duration-200",
                  dateRange === range 
                    ? "bg-surface-border text-white shadow-sm" 
                    : "text-content-muted hover:text-content hover:bg-white/[0.02]"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
              <select 
                value={geoFilter}
                onChange={(e) => setGeoFilter(e.target.value)}
                className="w-full lg:w-40 appearance-none bg-surface-hover/50 border border-surface-border rounded-lg py-2 pl-9 pr-4 text-sm font-medium text-content focus:outline-none focus:border-content-muted cursor-pointer"
              >
                <option value="ALL">All GEOs</option>
                {ALL_GEOS.map(geo => <option key={geo} value={geo}>{geo}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-1 bg-surface-hover/50 border border-surface-border p-1 rounded-lg flex-1 lg:flex-none">
              <button onClick={() => setVerticalFilter('All')} className={cn("px-4 py-1.5 rounded text-sm font-medium transition-colors", verticalFilter === 'All' ? "bg-surface-border text-white" : "text-content-muted")}>All</button>
              <button onClick={() => setVerticalFilter('Crypto')} className={cn("px-4 py-1.5 rounded text-sm font-medium transition-colors", verticalFilter === 'Crypto' ? "bg-crypto/20 text-crypto border border-crypto/30" : "text-content-muted")}>Crypto</button>
              <button onClick={() => setVerticalFilter('Forex')} className={cn("px-4 py-1.5 rounded text-sm font-medium transition-colors", verticalFilter === 'Forex' ? "bg-forex/20 text-forex border border-forex/30" : "text-content-muted")}>Forex</button>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <KPICard title="Spend" value={formatNum(totals.spend)} prefix="$" colorClass="text-content" />
          <KPICard title="Clicks" value={formatNum(totals.clicks)} colorClass="text-content" />
          <KPICard title="Leads" value={formatNum(totals.leads)} colorClass="text-content" />
          <KPICard title="FTDs" value={formatNum(totals.ftds)} trend={12.4} colorClass="text-crypto neon-text-crypto" />
          <KPICard title="Deposits" value={formatNum(totals.deposits)} prefix="$" trend={5.2} colorClass="text-[#03DAC6]" />
          
          <KPICard title="Rec. Deposits" value={formatNum(totals.recDeposits)} prefix="$" colorClass="text-content-muted" />
          <KPICard title="Revenue" value={formatNum(totals.revenue)} prefix="$" colorClass="text-content" />
          <KPICard title="Profit" value={formatNum(profit)} prefix="$" trend={15.4} colorClass="text-forex neon-text-forex" />
          <KPICard title="ROI" value={roi.toFixed(1)} suffix="%" colorClass={roi > 0 ? "text-forex" : "text-red-400"} />
          <KPICard title="Avg CPA" value={formatNum(avgCpa)} prefix="$" colorClass="text-[#03DAC6]" />
        </section>

        {/* Charts & Funnel */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <ProfitTrendChart days={dateRange === 'Week' ? 7 : dateRange === 'Month' ? 30 : 14} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <PerformanceFunnel 
              clicks={totals.clicks} 
              leads={totals.leads} 
              ftds={totals.ftds} 
              deposits={totals.deposits} 
            />
          </div>
        </div>

        {/* Tables & Deep Dive */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9">
            <CampaignTable campaigns={filteredCampaigns} multiplier={multiplier} />
          </div>
          {/* Vertical Distribution Pie properties */}
          <div className="col-span-12 lg:col-span-3 glass-panel p-5 rounded-xl flex flex-col min-h-[400px]">
             <h4 className="text-lg font-semibold tracking-tight mb-4">Vertical Split</h4>
             <div className="flex-1 relative w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={geoPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {geoPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#111417', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px' }}
                      itemStyle={{ color: '#E1E2E7' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold tracking-widest text-content-muted">TOTAL</span>
                  <span className="text-xl font-mono text-content">{totalCount}</span>
                </div>
             </div>
             
             <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center px-4 py-2 bg-surface hover:bg-surface-hover border border-surface-border rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-crypto shadow-[0_0_8px_rgba(187,134,252,0.6)]" />
                    <span className="text-sm font-medium">Crypto</span>
                  </div>
                  <span className="font-mono text-sm">{Math.round((cryptoCount/totalCount)*100)}%</span>
                </div>
                <div className="flex justify-between items-center px-4 py-2 bg-surface hover:bg-surface-hover border border-surface-border rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-forex shadow-[0_0_8px_rgba(0,200,83,0.6)]" />
                    <span className="text-sm font-medium">Forex</span>
                  </div>
                  <span className="font-mono text-sm">{Math.round((forexCount/totalCount)*100)}%</span>
                </div>
             </div>
          </div>
        </div>

      </main>
    </div>
  );
}

