import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, CheckCircle, FileText, Mic, TrendingUp, Upload, XCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';

const recentScans = [
  { crop: 'Tomato', disease: 'Early Blight', confidence: 94.2, date: '2026-06-30', status: 'Diseased' },
  { crop: 'Rice', disease: 'Healthy', confidence: 98.1, date: '2026-06-29', status: 'Healthy' },
  { crop: 'Beans', disease: 'Rust', confidence: 87.5, date: '2026-06-28', status: 'Diseased' },
];

const FarmerDashboardPage: React.FC = () => (
  <div>
    <PageHeader
      icon={Camera}
      title="Farmer Dashboard"
      subtitle="Track your farm scans, review disease results, and take action faster."
      centered={false}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Camera} label="Total Scans" value={14} trend="Live today" />
      <StatCard icon={CheckCircle} label="Healthy Crops" value={8} color="text-emerald-500" />
      <StatCard icon={XCircle} label="Diseased Crops" value={6} color="text-red-500" />
      <StatCard icon={TrendingUp} label="Accuracy" value="96.2%" color="text-blue-500" />
    </div>

    <div className="flex flex-wrap gap-3 mb-8">
      <Link to="/crop-disease" className="btn-green">
        <Upload className="w-4 h-4" /> New Scan
      </Link>
      <Link to="/ai-assistant" className="btn-purple">
        <Mic className="w-4 h-4" /> Voice Assistant
      </Link>
      <Link to="/history" className="btn-outline">
        <FileText className="w-4 h-4" /> Reports
      </Link>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Recent Crop Checks</h3>
        <div className="space-y-3">
          {recentScans.map((scan) => (
            <div key={scan.date + scan.crop} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
              <div>
                <p className="font-semibold text-slate-800">{scan.crop}</p>
                <p className="text-sm text-slate-500">{scan.disease}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scan.status === 'Healthy' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {scan.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Recommended Actions</h3>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>• Spray copper-based fungicide for tomato blight.</li>
          <li>• Check irrigation timing to reduce fungal spread.</li>
          <li>• Review the latest weather alert before the next spray.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default FarmerDashboardPage;
