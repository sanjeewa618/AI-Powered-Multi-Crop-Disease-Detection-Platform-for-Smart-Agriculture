import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Building2,
  Camera,
  Leaf,
  Newspaper,
  TrendingUp,
  Users,
  Wheat,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import FeatureCard from '../components/ui/FeatureCard';

const HomePage: React.FC = () => (
  <div>
    <PageHeader
      icon={Leaf}
      title="Welcome to AI Crop Disease Detection Platform"
      subtitle="Detect crop diseases instantly, get personalized treatments, track market prices, and access government support — all powered by AI for Sri Lankan farmers."
    />

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <StatCard icon={Users} label="Total Farmers" value="12,450" trend="+8%" />
      <StatCard icon={Leaf} label="Diseases Supported" value="38" color="text-blue-500" />
      <StatCard icon={Camera} label="Accuracy" value="96.2%" color="text-purple-500" />
      <StatCard icon={TrendingUp} label="Scans Today" value="284" trend="+12%" />
    </div>

    <h2 className="text-xl font-bold text-slate-800 mb-4">Main Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
      <FeatureCard
        icon={Camera}
        title="Disease Detection"
        description="Upload crop images for instant AI-powered disease identification with treatment recommendations."
        to="/crop-disease"
      />
      <FeatureCard
        icon={TrendingUp}
        title="Market Analysis"
        description="Real-time vegetable and rice prices from Dambulla, Pettah, and nearby markets."
        to="/market"
      />
      <FeatureCard
        icon={Building2}
        title="Government Support"
        description="Subsidies, loans, insurance, and training programs for Sri Lankan farmers."
        to="/gov"
      />
      <FeatureCard
        icon={Users}
        title="Community"
        description="Connect with fellow farmers, ask questions, and share crop knowledge."
        to="/community"
      />
      <FeatureCard
        icon={Bot}
        title="AI Assistant"
        description="Chat in English, Sinhala, or Tamil about diseases, fertilizers, and weather."
        to="/ai-assistant"
      />
      <FeatureCard
        icon={Wheat}
        title="Dashboard"
        description="Track your scans, crop health statistics, and recent disease reports."
        to="/dashboard"
      />
    </div>

    <h2 className="text-xl font-bold text-slate-800 mb-4">Recent News & Alerts</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { title: 'Monsoon Alert: Increased Fungal Risk', type: 'Weather', time: '2 hours ago' },
        { title: 'Tomato Prices Rise 15% in Dambulla', type: 'Market', time: '5 hours ago' },
        { title: 'Fall Armyworm Detected in Kurunegala', type: 'Pest Alert', time: '1 day ago' },
      ].map((news) => (
        <div key={news.title} className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Newspaper className="w-4 h-4 text-green-brand" />
            <span className="text-xs font-semibold text-green-brand bg-emerald-50 px-2 py-0.5 rounded-full">
              {news.type}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 text-sm mb-1">{news.title}</h3>
          <p className="text-xs text-slate-400">{news.time}</p>
        </div>
      ))}
    </div>

    <div className="mt-10 text-center">
      <Link to="/crop-disease" className="btn-green inline-flex px-8 py-3">
        <Camera className="w-5 h-5" /> Start Disease Scan
      </Link>
    </div>
  </div>
);

export default HomePage;
