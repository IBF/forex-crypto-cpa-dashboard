import React, { useState } from 'react';
import { CampaignData } from '../data';
import { cn } from '../lib/utils';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface CampaignTableProps {
  campaigns: CampaignData[];
  multiplier: number;
  geoFilter: string;
}

type SortKey = keyof CampaignData['baseStats'] | 'name' | 'type';

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, multiplier, geoFilter }) => {
  const [sortKey, setSortKey] = useState<SortKey>('revenue');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    let valA, valB;
    if (sortKey === 'name' || sortKey === 'type') {
      valA = a[sortKey];
      valB = b[sortKey];
      return sortAsc ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    } else {
      valA = a.baseStats[sortKey as keyof CampaignData['baseStats']] * multiplier;
      valB = b.baseStats[sortKey as keyof CampaignData['baseStats']] * multiplier;
      return sortAsc ? valA - valB : valB - valA;
    }
  });

  const formatCurrency = (val: number) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  const formatNumber = (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return <ChevronUp className="w-3 h-3 text-content-muted opacity-0 group-hover:opacity-50" />;
    return sortAsc ? <ChevronUp className="w-3 h-3 text-primary" /> : <ChevronDown className="w-3 h-3 text-primary" />;
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden glass-panel-hover flex flex-col">
      <div className="p-5 flex justify-between items-center border-b border-surface-border bg-surface/50">
        <h4 className="text-lg font-semibold tracking-tight">Top Performing Campaigns</h4>
        <button className="text-sm text-crypto hover:text-crypto-glow transition-colors flex items-center gap-1 font-medium">
          View All Reports <ExternalLink size={14} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-[#1A1D21]/50 text-xs font-bold tracking-wider text-content-muted border-b border-surface-border">
            <tr>
              <th className="px-5 py-4 cursor-pointer group hover:text-content transition-colors" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">CAMPAIGN <SortIcon columnKey="name" /></div>
              </th>
              <th className="px-5 py-4 text-left font-bold tracking-wider text-content-muted">
                DATE
              </th>
              <th className="px-5 py-4 cursor-pointer group hover:text-content transition-colors" onClick={() => handleSort('type')}>
                <div className="flex items-center gap-1">TYPE <SortIcon columnKey="type" /></div>
              </th>
              <th className="px-5 py-4 text-right cursor-pointer group hover:text-content transition-colors" onClick={() => handleSort('clicks')}>
                <div className="flex items-center justify-end gap-1"><SortIcon columnKey="clicks" /> CLICKS</div>
              </th>
              <th className="px-5 py-4 text-right cursor-pointer group hover:text-content transition-colors" onClick={() => handleSort('leads')}>
                 <div className="flex items-center justify-end gap-1"><SortIcon columnKey="leads" /> LEADS</div>
              </th>
              <th className="px-5 py-4 text-right cursor-pointer group hover:text-content transition-colors" onClick={() => handleSort('ftds')}>
                <div className="flex items-center justify-end gap-1"><SortIcon columnKey="ftds" /> FTDS</div>
              </th>
              <th className="px-5 py-4 text-right cursor-pointer group hover:text-content transition-colors" onClick={() => handleSort('deposits')}>
                <div className="flex items-center justify-end gap-1"><SortIcon columnKey="deposits" /> DEPOSITS</div>
              </th>
              <th className="px-5 py-4 text-right cursor-pointer group hover:text-content transition-colors" onClick={() => handleSort('spend')}>
                <div className="flex items-center justify-end gap-1"><SortIcon columnKey="spend" /> SPEND</div>
              </th>
              <th className="px-5 py-4 text-right cursor-pointer group hover:text-content transition-colors" onClick={() => handleSort('revenue')}>
                <div className="flex items-center justify-end gap-1"><SortIcon columnKey="revenue" /> REVENUE</div>
              </th>
              <th className="px-5 py-4 text-right cursor-pointer group hover:text-content transition-colors">
                PROFIT
              </th>
              <th className="px-5 py-4 text-right cursor-pointer group hover:text-content transition-colors">
                ROI
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border text-sm">
            {sortedCampaigns.map((c) => {
              const stats = {
                clicks: c.baseStats.clicks * multiplier,
                leads: c.baseStats.leads * multiplier,
                ftds: c.baseStats.ftds * multiplier,
                deposits: c.baseStats.deposits * multiplier,
                spend: c.baseStats.spend * multiplier,
                revenue: c.baseStats.revenue * multiplier,
              };
              const profit = stats.revenue - stats.spend;
              const roi = stats.spend > 0 ? (profit / stats.spend) * 100 : 0;
              
              const isCrypto = c.type === 'Crypto';

              return (
                <tr key={c.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface/50 border border-surface-border flex items-center justify-center p-1 shadow-inner overflow-hidden">
                        <img 
                          src={c.logo} 
                          alt={c.name} 
                          className="w-full h-full object-contain rounded-md block bg-transparent" 
                          onError={(e) => { 
                            e.currentTarget.onerror = null; 
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=1A1D21&color=E1E2E7`; 
                          }} 
                        />
                      </div>
                      <div className="flex flex-col gap-1 justify-center">
                        <span className="font-semibold leading-none">{c.name}</span>
                        <div className="flex flex-wrap gap-1">
                          {c.geos.map(geo => (
                            <span 
                              key={geo} 
                              className={cn(
                                "text-[9px] px-1 py-0.5 rounded-sm tracking-widest font-mono border",
                                geoFilter === geo || geoFilter === 'ALL' 
                                  ? "bg-surface-border/50 text-content border-surface-border" 
                                  : "text-content-muted border-transparent opacity-50"
                              )}
                            >
                              {geo}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-left font-mono text-content-muted text-xs">
                    {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border",
                      isCrypto 
                        ? "bg-[#BB86FC]/10 text-[#BB86FC] border-[#BB86FC]/20" 
                        : "bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isCrypto ? "bg-[#BB86FC]" : "bg-[#00C853]")}></span>
                      {c.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-content-muted">{formatNumber(stats.clicks)}</td>
                  <td className="px-5 py-4 text-right font-mono text-content-muted">{formatNumber(stats.leads)}</td>
                  <td className="px-5 py-4 text-right font-mono text-content">{formatNumber(stats.ftds)}</td>
                  <td className="px-5 py-4 text-right font-mono text-content">{formatCurrency(stats.deposits)}</td>
                  <td className="px-5 py-4 text-right font-mono text-content-muted">{formatCurrency(stats.spend)}</td>
                  <td className="px-5 py-4 text-right font-mono text-content">{formatCurrency(stats.revenue)}</td>
                  <td className={cn("px-5 py-4 text-right font-mono font-medium", profit >= 0 ? "text-forex neon-text-forex" : "text-red-400")}>
                    {profit >= 0 ? '+' : ''}{formatCurrency(profit)}
                  </td>
                  <td className={cn("px-5 py-4 text-right font-mono font-medium", roi >= 0 ? "text-forex" : "text-red-400")}>
                    {roi >= 0 ? '+' : ''}{roi.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {sortedCampaigns.length === 0 && (
          <div className="p-8 text-center text-content-muted italic">
            No campaigns found matching the current filters.
          </div>
        )}
      </div>
    </div>
  );
};
