import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Globe,
  LogIn,
  Search,
  Sparkles,
  Sprout,
  Sun,
  UserPlus,
} from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#181D27] border-b border-slate-800/60 flex items-center px-6 gap-6 shadow-sm">
      <Link to="/home" className="flex items-center gap-3 min-w-[240px]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center shadow-lg">
          <Sprout className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-bold text-lg leading-none mb-1 tracking-wide bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            KrushiMitra AI
          </div>
          <div className="text-slate-400 text-xs leading-none">Smart Agriculture Companion</div>
        </div>
        <div className="ml-2 px-3 py-1 rounded-full bg-[#112423] border border-emerald-800/60 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-500" />
          <span className="text-emerald-500 text-xs font-semibold tracking-wide">AI-Powered</span>
        </div>
      </Link>

      <div className="flex-1 max-w-3xl mx-auto pl-8">
        <div className="relative flex items-center w-full bg-[#272D3A] rounded-xl h-11 border border-transparent focus-within:border-slate-600 transition-colors">
          <Search className="absolute left-4 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Ask AI about crops, diseases, prices..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(searchValue)}
            className="w-full bg-transparent pl-12 pr-12 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onSearch(searchValue)}
            className="absolute right-1.5 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 hover:opacity-90 flex items-center justify-center text-white transition-opacity shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button
          type="button"
          aria-label="Toggle theme"
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700/80 text-amber-400 hover:bg-slate-800 transition-colors"
        >
          <Sun className="w-[18px] h-[18px]" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-700/80 text-slate-200 hover:bg-slate-800 text-sm font-medium transition-colors"
        >
          <Globe className="w-4 h-4 text-emerald-500" />
          <span>English</span>
        </button>

        <Link
          to="/notifications"
          aria-label="Notifications"
          className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700/80 text-emerald-500 hover:bg-slate-800 transition-colors"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#181D27]" />
        </Link>

        <Link
          to="/signin"
          className="flex items-center gap-2 text-emerald-500 border border-emerald-500/40 hover:bg-emerald-500/10 font-medium px-5 h-10 rounded-lg text-sm transition-colors ml-1"
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </Link>

        <Link
          to="/signup"
          className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:opacity-90 text-white font-medium px-6 h-10 rounded-lg text-sm transition-opacity flex items-center gap-2 shadow-md"
        >
          <UserPlus className="w-4 h-4" />
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
