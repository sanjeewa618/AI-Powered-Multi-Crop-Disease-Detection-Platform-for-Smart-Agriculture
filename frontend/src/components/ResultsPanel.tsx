import React, { useState } from 'react';

export interface DiseaseResult {
  name: string;
  crop: string;
  condition: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  description: string;
  treatments: string[];
  preventions: string[];
  localRemedies: string[];
  costEffective: string[];
}

interface ResultsPanelProps {
  result: DiseaseResult | null;
  isAnalyzing: boolean;
}

const severityColors: Record<string, string> = {
  Low: 'bg-green-900/40 text-green-400',
  Moderate: 'bg-orange-900/40 text-orange-400',
  High: 'bg-red-900/40 text-red-400',
  Critical: 'bg-red-900/60 text-red-500',
};

type TabKey = 'treatment' | 'prevention' | 'local' | 'cost';

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'treatment', label: 'Treatment', icon: '🌿' },
  { key: 'prevention', label: 'Prevention', icon: '🛡️' },
  { key: 'local', label: 'Local Remedies', icon: '💡' },
  { key: 'cost', label: 'Cost-Effective', icon: '💲' },
];

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, isAnalyzing }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('treatment');

  /* ── Analyzing state ── */
  if (isAnalyzing) {
    return (
      <div className="bg-theme-card rounded-2xl p-8 h-full flex flex-col justify-center shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-slate-700 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-5 bg-slate-700 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-3 bg-slate-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-2 bg-slate-700 rounded w-full animate-pulse"></div>
          <div className="h-2 bg-slate-700 rounded w-5/6 animate-pulse"></div>
          <div className="h-2 bg-slate-700 rounded w-4/6 animate-pulse"></div>
        </div>
      </div>
    );
  }

  /* ── Empty state ── */
  if (!result) {
    return (
      <div className="bg-theme-card rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center shadow-xl border border-slate-700/50">
         <div className="text-5xl mb-4 opacity-50 grayscale">🔍</div>
         <p className="text-slate-300 font-medium text-lg">Awaiting Image</p>
         <p className="text-slate-500 text-sm mt-2 max-w-xs">Analysis results and treatment plans will appear here after you upload and scan a leaf.</p>
      </div>
    );
  }

  /* ── Results ── */
  const tabContent: Record<TabKey, string[]> = {
    treatment: result.treatments,
    prevention: result.preventions,
    local: result.localRemedies,
    cost: result.costEffective,
  };

  return (
    <div className="bg-theme-card rounded-2xl p-8 h-full flex flex-col gap-6 shadow-xl relative overflow-hidden border border-slate-700/30">
      
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 text-orange-500 flex items-center justify-center text-xl font-bold flex-shrink-0 mt-1">
          !
        </div>
        <div>
          <h2 className="text-white font-bold text-2xl leading-tight mb-1">{result.name}</h2>
          <p className="text-slate-400 text-sm">AI Analysis Complete</p>
        </div>
      </div>

      {/* Confidence Bar */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Confidence</span>
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">{result.confidence.toFixed(1)}%</span>
            <span className="text-slate-400">Severity</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${severityColors[result.severity]}`}>
              {result.severity}
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-green-brand h-full rounded-full transition-all duration-1000"
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
      </div>

      {/* Description Box */}
      <div className="bg-theme-cardInner rounded-xl p-5 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full border border-blue-400 text-blue-400 flex items-center justify-center text-xs font-bold">i</div>
          <span className="text-white font-semibold">Description</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          {result.description}
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-2">
        <div className="flex gap-6 border-b border-slate-700/50 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            >
              <span className={activeTab === tab.key ? 'text-green-brand' : 'opacity-60'}>{tab.icon}</span> 
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {tabContent[activeTab].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-green-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-green-brand/20">
                {i + 1}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed pt-0.5">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
