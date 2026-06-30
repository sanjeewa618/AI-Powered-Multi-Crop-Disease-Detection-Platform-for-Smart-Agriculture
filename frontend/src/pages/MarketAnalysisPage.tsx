import React, { useState } from 'react';
import {
  CloudRain,
  MapPin,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Droplets,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';

const crops = [
  { name: 'Rice', price: 'Rs. 120/kg', change: '+3%', up: true },
  { name: 'Tomato', price: 'Rs. 280/kg', change: '+15%', up: true },
  { name: 'Beans', price: 'Rs. 450/kg', change: '-5%', up: false },
  { name: 'Carrot', price: 'Rs. 180/kg', change: '+2%', up: true },
];

const MarketAnalysisPage: React.FC = () => {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  return (
    <div>
      <PageHeader
        icon={TrendingUp}
        title="Market Analysis"
        subtitle="Real-time crop prices, trends, and selling suggestions for Sri Lankan markets."
        centered={false}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {crops.map((c) => (
          <StatCard
            key={c.name}
            icon={c.up ? TrendingUp : TrendingDown}
            label={c.name}
            value={c.price}
            trend={c.change}
            color={c.up ? 'text-green-brand' : 'text-red-500'}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Price Trend */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Price Trend — Tomato</h3>
            <div className="flex gap-1">
              {(['weekly', 'monthly', 'yearly'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`text-xs px-3 py-1 rounded-full capitalize font-semibold ${
                    period === p ? 'bg-green-brand text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-36">
            {[180, 200, 190, 220, 240, 260, 280].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gradient-to-t from-green-brand to-emerald-300 rounded-t-md" style={{ height: `${v / 3}px` }} />
                <span className="text-[10px] text-slate-400">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">AI Price Prediction</h3>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-sm font-semibold text-emerald-800">Next Week — Tomato</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">Rs. 310/kg</p>
              <p className="text-xs text-emerald-600 mt-1">Expected +10.7% increase</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 rounded-xl text-center">
                <TrendingUp className="w-5 h-5 text-green-brand mx-auto mb-1" />
                <p className="text-xs text-slate-500">High Demand</p>
                <p className="font-bold text-sm text-slate-800">Beans, Carrot</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl text-center">
                <TrendingDown className="w-5 h-5 text-red-500 mx-auto mb-1" />
                <p className="text-xs text-slate-500">Low Demand</p>
                <p className="font-bold text-sm text-slate-800">Cabbage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Nearby Markets */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Nearby Markets</h3>
          {['Dambulla Economic Centre', 'Pettah Market', 'Narahenpita Economic Centre'].map((m) => (
            <div key={m} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
              <MapPin className="w-4 h-4 text-green-brand" />
              <span className="text-sm text-slate-700">{m}</span>
            </div>
          ))}
        </div>

        {/* Selling Suggestions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Selling Suggestions</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-semibold text-green-800">Sell Today — Beans</p>
              <p className="text-xs text-slate-500 mt-1">Price at peak, high demand in Colombo</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="text-sm font-semibold text-amber-800">Wait 3 Days — Tomato</p>
              <p className="text-xs text-slate-500 mt-1">Expected price increase of Rs. 30/kg</p>
            </div>
          </div>
        </div>

        {/* Weather Effect */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Weather Effect</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CloudRain className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Rain</p>
                <p className="text-xs text-slate-500">Heavy rain expected — may affect transport</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Temperature</p>
                <p className="text-xs text-slate-500">28°C — favorable for vegetable growth</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-teal-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Humidity</p>
                <p className="text-xs text-slate-500">78% — increased fungal disease risk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisPage;
