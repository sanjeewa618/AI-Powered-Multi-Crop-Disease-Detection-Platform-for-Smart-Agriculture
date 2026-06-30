import React from 'react';
import { Bell, CloudRain, TrendingUp, AlertTriangle, Building2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const notifications = [
  {
    id: 1,
    type: 'Disease Alert',
    icon: AlertTriangle,
    color: 'text-red-500 bg-red-50',
    title: 'Fall Armyworm detected in Kurunegala',
    message: 'Inspect your maize and rice crops immediately. Apply recommended pesticide.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'Weather Alert',
    icon: CloudRain,
    color: 'text-blue-500 bg-blue-50',
    title: 'Heavy rain expected tonight',
    message: 'Secure harvested crops. Avoid spraying pesticides before rain.',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'Market Price',
    icon: TrendingUp,
    color: 'text-green-brand bg-emerald-50',
    title: 'Tomato price increased 15%',
    message: 'Dambulla market: Rs. 280/kg. Consider selling within 2 days.',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 4,
    type: 'Government Update',
    icon: Building2,
    color: 'text-purple-500 bg-purple-50',
    title: 'Fertilizer subsidy application approved',
    message: 'Your application for the 2026 fertilizer subsidy has been approved.',
    time: '2 days ago',
    unread: false,
  },
];

const NotificationsPage: React.FC = () => (
  <div>
    <PageHeader
      icon={Bell}
      title="Notifications"
      subtitle="Disease alerts, weather updates, market prices, and government scheme notifications."
      centered={false}
    />

    <div className="space-y-3 max-w-3xl">
      {notifications.map((n) => {
        const Icon = n.icon;
        return (
          <div
            key={n.id}
            className={`bg-white rounded-2xl p-5 border shadow-sm flex gap-4 ${
              n.unread ? 'border-green-brand/30 bg-emerald-50/30' : 'border-slate-200/80'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-400">{n.type}</span>
                {n.unread && <span className="w-2 h-2 bg-green-brand rounded-full" />}
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{n.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{n.message}</p>
              <p className="text-xs text-slate-400 mt-2">{n.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default NotificationsPage;
