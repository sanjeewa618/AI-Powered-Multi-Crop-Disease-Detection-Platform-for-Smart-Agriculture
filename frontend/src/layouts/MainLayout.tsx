import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, Mic } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showFab = !['/ai-assistant', '/signin', '/signup'].includes(location.pathname);

  const handleSearch = (query: string) => {
    if (query.trim()) navigate('/ai-assistant', { state: { query } });
  };

  return (
    <div className="min-h-screen bg-theme-main text-text-dark font-sans flex flex-col">
      <Navbar onSearch={handleSearch} />
      <div className="flex flex-1 pt-[72px]">
        <Sidebar />
        <main className="flex-1 ml-[240px] p-8 min-h-[calc(100vh-72px)]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      {showFab && (
        <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-30">
          <button
            type="button"
            aria-label="Voice commands"
            onClick={() => navigate('/ai-assistant')}
            className="w-14 h-14 bg-green-brand rounded-full shadow-xl shadow-green-brand/30 flex items-center justify-center text-white hover:scale-105 transition-transform"
          >
            <Mic className="w-6 h-6" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Open chat"
            onClick={() => navigate('/ai-assistant')}
            className="w-12 h-12 bg-[#222834] rounded-full shadow-lg flex items-center justify-center text-slate-300 hover:scale-105 transition-transform border border-slate-700/50"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
