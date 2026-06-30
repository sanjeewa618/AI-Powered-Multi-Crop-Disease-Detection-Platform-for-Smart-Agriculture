import React, { useState } from 'react';
import { Download, History, Search, Trash2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const scanHistory = [
  { id: '1', crop: 'Tomato', disease: 'Early Blight', confidence: 94.2, date: '2026-06-30', status: 'Diseased' },
  { id: '2', crop: 'Rice', disease: 'Healthy', confidence: 98.1, date: '2026-06-29', status: 'Healthy' },
  { id: '3', crop: 'Beans', disease: 'Rust', confidence: 87.5, date: '2026-06-28', status: 'Diseased' },
  { id: '4', crop: 'Carrot', disease: 'Leaf Spot', confidence: 91.3, date: '2026-06-27', status: 'Diseased' },
  { id: '5', crop: 'Tomato', disease: 'Healthy', confidence: 97.0, date: '2026-06-25', status: 'Healthy' },
];

const HistoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = scanHistory
    .filter((s) => filter === 'All' || s.status === filter)
    .filter((s) => s.crop.toLowerCase().includes(search.toLowerCase()) || s.disease.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        icon={History}
        title="Scan History"
        subtitle="View, download, and manage all your previous crop disease scans."
        centered={false}
      />

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by crop or disease..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-green-brand"
          />
        </div>
        {['All', 'Healthy', 'Diseased'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`text-xs font-semibold px-4 py-2.5 rounded-xl ${
              filter === f ? 'bg-green-brand text-white' : 'bg-white text-slate-500 border border-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Image</th>
                <th className="text-left px-6 py-3 font-semibold">Crop</th>
                <th className="text-left px-6 py-3 font-semibold">Disease</th>
                <th className="text-left px-6 py-3 font-semibold">Confidence</th>
                <th className="text-left px-6 py-3 font-semibold">Date</th>
                <th className="text-left px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((scan) => (
                <tr key={scan.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <span className="text-green-brand text-xs font-bold">{scan.crop[0]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-medium text-slate-800">{scan.crop}</td>
                  <td className="px-6 py-3 text-slate-600">{scan.disease}</td>
                  <td className="px-6 py-3 font-semibold text-green-brand">{scan.confidence}%</td>
                  <td className="px-6 py-3 text-slate-500">{scan.date}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-green-brand">
                        <Download className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
