import React from 'react';
import { Activity, AlertTriangle, BarChart3, ShieldCheck, Users } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';

const AdminDashboardPage: React.FC = () => (
  <div>
    <PageHeader
      icon={ShieldCheck}
      title="Admin Dashboard"
      subtitle="Monitor system health, farmer reports, and disease trends across the platform."
      centered={false}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Users} label="Registered Farmers" value={1240} trend="+12 this week" />
      <StatCard icon={AlertTriangle} label="Active Alerts" value={18} color="text-amber-500" />
      <StatCard icon={BarChart3} label="Detection Volume" value={532} color="text-blue-500" />
      <StatCard icon={Activity} label="System Status" value="Stable" color="text-emerald-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Regional Disease Reports</h3>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>• Western Province: 24 reported cases</li>
          <li>• Central Province: 12 reported cases</li>
          <li>• Southern Province: 9 reported cases</li>
        </ul>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Platform Insights</h3>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>• Average detection confidence increased by 3.4%</li>
          <li>• New disease model retraining is scheduled this week</li>
          <li>• Farmer feedback indicates faster treatment guidance</li>
        </ul>
      </div>
    </div>
  </div>
);

export default AdminDashboardPage;
