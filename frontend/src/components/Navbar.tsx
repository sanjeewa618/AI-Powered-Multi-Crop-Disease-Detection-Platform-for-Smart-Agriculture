import React from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#181D27] border-b border-slate-800/60 flex items-center px-6 gap-6 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-[240px]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center text-xl shadow-lg">
          🌱
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-emerald-500 font-bold text-lg leading-none mb-1 tracking-wide">KrushiMitra AI</div>
          <div className="text-slate-400 text-xs leading-none">Smart Agriculture Companion</div>
        </div>
        <div className="ml-2 px-3 py-1 rounded-full bg-[#112423] border border-emerald-800/60 flex items-center gap-1.5">
          <span className="text-emerald-500 text-xs font-semibold tracking-wide">ⓘ AI-Powered</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-3xl mx-auto pl-8">
        <div className="relative flex items-center w-full bg-[#272D3A] rounded-xl h-11 border border-transparent focus-within:border-slate-600 transition-colors">
          <span className="absolute left-4 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Ask AI about crops, diseases, prices..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(searchValue)}
            className="w-full bg-transparent pl-12 pr-12 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none"
          />
          <button className="absolute right-1.5 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 hover:opacity-90 flex items-center justify-center text-white transition-opacity shadow-sm">
            ⚡
          </button>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700/80 text-amber-400 hover:bg-slate-800 transition-colors">
          ☀️
        </button>

        <button className="flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-700/80 text-slate-200 hover:bg-slate-800 text-sm font-medium transition-colors">
          🌐 <span>English</span>
        </button>

        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700/80 text-emerald-500 hover:bg-slate-800 transition-colors">
          🔔
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#181D27]"></span>
        </button>

        <button className="flex items-center gap-2 text-emerald-500 border border-emerald-500/40 hover:bg-emerald-500/10 font-medium px-5 h-10 rounded-lg text-sm transition-colors ml-1">
          → Sign In
        </button>

        <button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:opacity-90 text-white font-medium px-6 h-10 rounded-lg text-sm transition-opacity flex items-center gap-2 shadow-md">
          👤 Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
