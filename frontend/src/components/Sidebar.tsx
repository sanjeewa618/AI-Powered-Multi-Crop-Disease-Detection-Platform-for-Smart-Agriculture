import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart2,
  Bell,
  Bot,
  Camera,
  ClipboardList,
  History,
  Home,
  Settings,
  TrendingUp,
  User,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: string;
  badgeColor?: string;
}

const mainNav: NavItem[] = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: BarChart2, label: 'Dashboard', path: '/dashboard', badge: 'New', badgeColor: 'bg-amber-500 text-white' },
  { icon: Camera, label: 'Crop Disease', path: '/crop-disease' },
  { icon: TrendingUp, label: 'Market Analysis', path: '/market' },
  { icon: ClipboardList, label: 'Gov Schemes', path: '/gov' },
  { icon: Users, label: 'Community', path: '/community', badge: 'Beta', badgeColor: 'bg-amber-500 text-white' },
  { icon: Bot, label: 'AI Assistant', path: '/ai-assistant' },
];

const accountNav: NavItem[] = [
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: History, label: 'History', path: '/history' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
      isActive
        ? 'bg-green-brand text-white shadow-md shadow-green-brand/20'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
    }`;

  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-[240px] bg-theme-sidebar flex flex-col z-40 shadow-xl">
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              <Icon className="w-5 h-5 opacity-90 flex-shrink-0" strokeWidth={2} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-700/50">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">Account</p>
          {accountNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                <Icon className="w-5 h-5 opacity-90 flex-shrink-0" strokeWidth={2} />
                <span className="flex-1 text-left">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="m-4 p-4 rounded-2xl bg-gradient-to-br from-blue-600 via-teal-500 to-green-500 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <Zap className="w-5 h-5" fill="currentColor" strokeWidth={0} />
          <div className="font-bold text-sm">AI Assistant</div>
        </div>
        <p className="text-white/90 text-[11px] leading-relaxed mb-4 relative z-10 font-medium">
          Get instant help with voice commands in your local language
        </p>
        <button
          type="button"
          onClick={() => navigate('/ai-assistant')}
          className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs font-semibold py-2.5 rounded-lg transition-colors relative z-10 backdrop-blur-sm"
        >
          Try Voice Commands
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
