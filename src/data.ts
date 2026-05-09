export type CampaignType = 'Crypto' | 'Forex';

export interface CampaignData {
  id: string;
  name: string;
  logo: string;
  type: CampaignType;
  trafficSource: string;
  geos: string[];
  baseStats: {
    clicks: number;
    leads: number;
    ftds: number;      // First Time Depositors
    deposits: number;  // Initial deposit volume ($)
    recDeposits: number; // Recurrent deposit volume ($)
    spend: number;     // Ad Spend ($)
    revenue: number;   // Revenue generated ($)
  };
}

export const CAMPAIGNS: CampaignData[] = [
  {
    id: 'binance-ww',
    name: 'Binance',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.binance.com&size=128',
    type: 'Crypto',
    trafficSource: 'Search Ads',
    geos: ['US', 'UK', 'DE', 'AU'],
    baseStats: { clicks: 12450, leads: 820, ftds: 82, deposits: 42000, recDeposits: 14000, spend: 8500, revenue: 16400 }
  },
  {
    id: 'stake-casino',
    name: 'Stake.com',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://stake.com&size=128',
    type: 'Crypto',
    trafficSource: 'Social Media',
    geos: ['BR', 'JP', 'UK', 'CA'],
    baseStats: { clicks: 25300, leads: 1420, ftds: 145, deposits: 24500, recDeposits: 32000, spend: 12200, revenue: 21500 }
  },
  {
    id: 'bybit-eu',
    name: 'Bybit',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bybit.com&size=128',
    type: 'Crypto',
    trafficSource: 'Native Ads',
    geos: ['DE', 'FR', 'IT', 'ES'],
    baseStats: { clicks: 8400, leads: 310, ftds: 41, deposits: 28000, recDeposits: 5200, spend: 4100, revenue: 9800 }
  },
  {
    id: 'okx-asia',
    name: 'OKX',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.okx.com&size=128',
    type: 'Crypto',
    trafficSource: 'SEO / Organic',
    geos: ['JP', 'KR', 'SG', 'AE'],
    baseStats: { clicks: 4200, leads: 480, ftds: 65, deposits: 36000, recDeposits: 18000, spend: 1200, revenue: 15400 }
  },
  {
    id: 'bitget-global',
    name: 'Bitget',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bitget.com&size=128',
    type: 'Crypto',
    trafficSource: 'Push Notifications',
    geos: ['BR', 'MX', 'IN', 'ID'],
    baseStats: { clicks: 45000, leads: 1800, ftds: 110, deposits: 18000, recDeposits: 6000, spend: 9500, revenue: 11200 }
  },
  {
    id: 'xm-forex',
    name: 'XM Forex',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.xm.com&size=128',
    type: 'Forex',
    trafficSource: 'Email Marketing',
    geos: ['UK', 'ZA', 'NG', 'MY'],
    baseStats: { clicks: 9500, leads: 740, ftds: 85, deposits: 48000, recDeposits: 22000, spend: 4500, revenue: 18600 }
  },
  {
    id: 'icmarkets-pro',
    name: 'IC Markets',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.icmarkets.com&size=128',
    type: 'Forex',
    trafficSource: 'Search Ads',
    geos: ['AU', 'UK', 'DE', 'AE'],
    baseStats: { clicks: 6200, leads: 420, ftds: 58, deposits: 65000, recDeposits: 45000, spend: 7800, revenue: 22500 }
  },
  {
    id: 'pepperstone-uk',
    name: 'Pepperstone',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://pepperstone.com&size=128',
    type: 'Forex',
    trafficSource: 'Search Ads',
    geos: ['UK', 'AU'],
    baseStats: { clicks: 3800, leads: 290, ftds: 35, deposits: 42000, recDeposits: 18000, spend: 5200, revenue: 11800 }
  },
  {
    id: 'fbs-latam',
    name: 'FBS',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://fbs.com&size=128',
    type: 'Forex',
    trafficSource: 'Social Media',
    geos: ['BR', 'MX', 'CO', 'CL'],
    baseStats: { clicks: 18000, leads: 950, ftds: 105, deposits: 24000, recDeposits: 9000, spend: 6400, revenue: 13500 }
  },
  {
    id: 'deriv-africa',
    name: 'Deriv',
    logo: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://deriv.com&size=128',
    type: 'Forex',
    trafficSource: 'Native Ads',
    geos: ['ZA', 'NG', 'KE'],
    baseStats: { clicks: 22000, leads: 1100, ftds: 130, deposits: 15000, recDeposits: 4000, spend: 5800, revenue: 9500 }
  }
];

export const ALL_GEOS = Array.from(new Set(CAMPAIGNS.flatMap(c => c.geos))).sort();

// Fake timeline data for the trend chart
export const generateTrendData = (days: number, volatility: number = 0.2) => {
  const data = [];
  let currentSpend = 1500;
  let currentRevenue = 3200;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    currentSpend = currentSpend * (1 + (Math.random() * volatility * 2 - volatility));
    currentRevenue = currentRevenue * (1 + (Math.random() * volatility * 2 - volatility));

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      spend: Math.max(0, Math.round(currentSpend)),
      revenue: Math.max(0, Math.round(currentRevenue))
    });
  }
  return data;
};
