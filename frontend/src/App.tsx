import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ImageUpload from './components/ImageUpload';
import ResultsPanel from './components/ResultsPanel';
import type { DiseaseResult } from './components/ResultsPanel';
import './index.css';

// ─── Mock disease database (simulates model output) ───────────────────────────
const mockDiseases: DiseaseResult[] = [
  {
    name: 'Tomato Early Blight',
    crop: 'Tomato',
    condition: 'Early Blight',
    confidence: 94.2,
    severity: 'Moderate',
    description:
      'Early blight is a fungal disease caused by Alternaria solani. It appears as dark brown spots with concentric rings on older leaves, eventually causing yellowing and defoliation.',
    treatments: [
      'Apply copper-based fungicide (Copper oxychloride 50% WP @ 2g/L)',
      'Remove affected leaves and destroy them immediately',
      'Use Mancozeb 75% WP fungicide every 7–10 days',
      'Spray chlorothalonil during early stages of infection',
    ],
    preventions: [
      'Use certified disease-resistant tomato varieties',
      'Rotate crops — avoid planting tomatoes in the same field for 2+ years',
      'Maintain proper plant spacing for good air circulation',
    ],
    localRemedies: [
      'Spray diluted neem oil solution (5ml/L) on affected leaves',
      'Apply wood ash at the base of plants to reduce fungal spread',
    ],
    costEffective: [
      'Make homemade copper sulfate solution (0.5%) as a low-cost fungicide',
      'Collect rainwater for irrigation instead of groundwater',
    ],
  },
];

// ─── App ──────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [activePage, setActivePage] = useState('crop-disease');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  const handleImageSelected = useCallback((file: File, preview: string) => {
    setPreviewUrl(preview);
    setResult(null);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!previewUrl) return;
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      // Force it to match the specific example in the image for demonstration
      setResult(mockDiseases[0]);
      setIsAnalyzing(false);
    }, 2000);
  }, [previewUrl]);

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  return (
    <div className="min-h-screen bg-theme-main text-text-dark font-sans flex flex-col">
      {/* ── Top Navbar ── */}
      <Navbar onSearch={handleSearch} />

      <div className="flex flex-1 pt-[72px]">
        {/* ── Sidebar ── */}
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {/* ── Main Content ── */}
        <main className="flex-1 ml-[240px] p-8">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            
            {/* ── Page Header ── */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-brand rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-green-brand/20">
                  📷
                </div>
                <h1 className="text-[32px] font-bold text-green-brand tracking-tight">AI Crop Disease Detection</h1>
              </div>
              <p className="text-slate-500 text-[15px] max-w-2xl mx-auto leading-relaxed">
                Upload a photo of your crop for instant AI-powered disease identification with personalized treatment recommendations
              </p>
            </div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
              {/* Left Column */}
              <div className="h-full">
                <ImageUpload
                  onImageSelected={handleImageSelected}
                  onAnalyze={handleAnalyze}
                  previewUrl={previewUrl}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              {/* Right Column */}
              <div className="h-full">
                <ResultsPanel result={result} isAnalyzing={isAnalyzing} />
              </div>
            </div>
            
          </div>
        </main>
      </div>

      {/* ── Floating Action Buttons ── */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3">
        <button className="w-14 h-14 bg-green-brand rounded-full shadow-xl shadow-green-brand/30 flex items-center justify-center text-white text-2xl hover:scale-105 transition-transform">
          🎙️
        </button>
        <button className="w-12 h-12 bg-[#222834] rounded-full shadow-lg flex items-center justify-center text-slate-300 text-xl hover:scale-105 transition-transform border border-slate-700/50">
          💬
        </button>
      </div>
    </div>
  );
};

export default App;
