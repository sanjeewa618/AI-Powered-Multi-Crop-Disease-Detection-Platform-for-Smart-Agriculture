import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  Camera,
  CheckCircle,
  FileText,
  Mic,
  TrendingUp,
  Upload,
  XCircle,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';

const recentScans = [
  { crop: 'Tomato', disease: 'Early Blight', confidence: 94.2, date: '2026-06-30', status: 'Diseased' },
  { crop: 'Rice', disease: 'Healthy', confidence: 98.1, date: '2026-06-29', status: 'Healthy' },
  { crop: 'Beans', disease: 'Rust', confidence: 87.5, date: '2026-06-28', status: 'Diseased' },
  { crop: 'Carrot', disease: 'Leaf Spot', confidence: 91.3, date: '2026-06-27', status: 'Diseased' },
];

const DashboardPage: React.FC = () => (
  <div>
    <PageHeader
      icon={BarChart2}
      title="Farmer Dashboard"
      subtitle="Overview of your crop scans, disease statistics, and quick actions."
      centered={false}
    />

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Camera} label="Total Scans" value={47} trend="+3 this week" />
      <StatCard icon={CheckCircle} label="Healthy Crops" value={32} color="text-emerald-500" />
      <StatCard icon={XCircle} label="Diseased Crops" value={15} color="text-red-500" />
      <StatCard icon={TrendingUp} label="Accuracy" value="96.2%" color="text-blue-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Disease Frequency Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Disease Frequency</h3>
        <div className="space-y-3">
          {[
            { name: 'Early Blight', pct: 35 },
            { name: 'Leaf Rust', pct: 25 },
            { name: 'Powdery Mildew', pct: 20 },
            { name: 'Others', pct: 20 },
          ].map((d) => (
            <div key={d.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">{d.name}</span>
                <span className="font-semibold text-slate-800">{d.pct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-brand rounded-full" style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Scans */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Monthly Scans</h3>
        <div className="flex items-end gap-2 h-32">
          {[12, 18, 15, 22, 19, 25, 28].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-green-brand/80 rounded-t-md" style={{ height: `${v * 3}px` }} />
              <span className="text-[10px] text-slate-400">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Crop Distribution */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Crop Distribution</h3>
        <div className="space-y-3">
          {[
            { crop: 'Tomato', pct: 30, color: 'bg-red-400' },
            { crop: 'Rice', pct: 28, color: 'bg-amber-400' },
            { crop: 'Beans', pct: 22, color: 'bg-green-400' },
            { crop: 'Carrot', pct: 20, color: 'bg-orange-400' },
          ].map((c) => (
            <div key={c.crop} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${c.color}`} />
              <span className="text-sm text-slate-600 flex-1">{c.crop}</span>
              <span className="text-sm font-semibold">{c.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="flex flex-wrap gap-3 mb-8">
      <Link to="/crop-disease" className="btn-green">
        <Upload className="w-4 h-4" /> Upload Image
      </Link>
      <Link to="/ai-assistant" className="btn-purple">
        <Mic className="w-4 h-4" /> Voice Scan
      </Link>
      <Link to="/history" className="btn-outline">
        <FileText className="w-4 h-4" /> View Reports
      </Link>
      <Link to="/market" className="btn-outline">
        <TrendingUp className="w-4 h-4" /> Market Prices
      </Link>
    </div>

    {/* Recent Scans Table */}
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800">Recent Scans</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">Crop</th>
              <th className="text-left px-6 py-3 font-semibold">Disease</th>
              <th className="text-left px-6 py-3 font-semibold">Confidence</th>
              <th className="text-left px-6 py-3 font-semibold">Date</th>
              <th className="text-left px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentScans.map((scan) => (
              <tr key={scan.date + scan.crop} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-800">{scan.crop}</td>
                <td className="px-6 py-3 text-slate-600">{scan.disease}</td>
                <td className="px-6 py-3 font-semibold text-green-brand">{scan.confidence}%</td>
                <td className="px-6 py-3 text-slate-500">{scan.date}</td>
                <td className="px-6 py-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      scan.status === 'Healthy'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {scan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DashboardPage;
