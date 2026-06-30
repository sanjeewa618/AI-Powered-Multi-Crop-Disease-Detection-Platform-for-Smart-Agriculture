import React from 'react';

interface NavItem {
  icon: string;
  label: string;
  id: string;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  { icon: '🏠', label: 'Home', id: 'home' },
  { icon: '📊', label: 'Dashboard', id: 'dashboard', badge: 'New', badgeColor: 'bg-amber-500 text-white' },
  { icon: '📷', label: 'Crop Disease', id: 'crop-disease' },
  { icon: '📈', label: 'Market Analysis', id: 'market' },
  { icon: '📋', label: 'Gov Schemes', id: 'gov' },
  { icon: '👥', label: 'Community', id: 'community', badge: 'Beta', badgeColor: 'bg-amber-500 text-white' },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-[240px] bg-theme-sidebar flex flex-col z-40 shadow-xl">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
              activePage === item.id
                ? 'bg-green-brand text-white shadow-md shadow-green-brand/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="text-lg opacity-90">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* AI Assistant Panel */}
      <div className="m-4 p-4 rounded-2xl bg-gradient-to-br from-blue-600 via-teal-500 to-green-500 text-white shadow-lg relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <div className="text-xl">⚡</div>
          <div className="font-bold text-sm">AI Assistant</div>
        </div>
        <p className="text-white/90 text-[11px] leading-relaxed mb-4 relative z-10 font-medium">
          Get instant help with voice commands in your local language
        </p>
        <button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs font-semibold py-2.5 rounded-lg transition-colors relative z-10 backdrop-blur-sm">
          Try Voice Commands
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
