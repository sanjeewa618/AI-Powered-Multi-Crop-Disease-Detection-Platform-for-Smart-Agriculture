import React, { useState } from 'react';
import {
  AlertCircle,
  Check,
  CircleDollarSign,
  Download,
  Info,
  Leaf,
  Lightbulb,
  MapPin,
  Save,
  Search,
  Shield,
  Store,
  type LucideIcon,
} from 'lucide-react';
import type { DiseaseResult } from '../types/disease';

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

const tabs: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: 'treatment', label: 'Treatment', icon: Leaf },
  { key: 'prevention', label: 'Prevention', icon: Shield },
  { key: 'local', label: 'Local Remedies', icon: Lightbulb },
  { key: 'cost', label: 'Cost-Effective', icon: CircleDollarSign },
];

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, isAnalyzing }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('treatment');
  const [treatmentType, setTreatmentType] = useState<'chemical' | 'organic' | 'biological'>('organic');

  if (isAnalyzing) {
    return (
      <div className="bg-theme-card rounded-2xl p-8 h-full flex flex-col justify-center shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-slate-700 animate-pulse" />
          <div className="flex-1">
            <div className="h-5 bg-slate-700 rounded w-48 mb-2 animate-pulse" />
            <div className="h-3 bg-slate-700 rounded w-32 animate-pulse" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-2 bg-slate-700 rounded w-full animate-pulse" />
          <div className="h-2 bg-slate-700 rounded w-5/6 animate-pulse" />
          <div className="h-2 bg-slate-700 rounded w-4/6 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-theme-card rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center shadow-xl border border-slate-700/50">
        <Search className="w-16 h-16 mb-4 text-slate-500 opacity-50" strokeWidth={1.5} />
        <p className="text-slate-300 font-medium text-lg">Awaiting Image</p>
        <p className="text-slate-500 text-sm mt-2 max-w-xs">
          Analysis results and treatment plans will appear here after you upload and scan a leaf.
        </p>
      </div>
    );
  }

  const tabContent: Record<TabKey, string[]> = {
    treatment: result.treatmentTypes[treatmentType],
    prevention: result.preventions,
    local: result.localRemedies,
    cost: result.costEffective,
  };

  return (
    <div className="bg-theme-card rounded-2xl p-6 h-full flex flex-col gap-5 shadow-xl border border-slate-700/30 overflow-y-auto max-h-[800px]">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 text-orange-500 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-white font-bold text-xl leading-tight">{result.name}</h2>
          <p className="text-slate-400 text-sm">AI Analysis Complete · {result.crop}</p>
        </div>
      </div>

      {/* Confidence + Severity */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Confidence</span>
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg">{result.confidence.toFixed(1)}%</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${severityColors[result.severity]}`}>
              {result.severity}
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-brand h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
            style={{ width: `${result.confidence}%` }}
          >
            <span className="text-[10px] text-white font-bold">{result.confidence}%</span>
          </div>
        </div>
        {/* Severity scale */}
        <div className="flex gap-2 mt-2">
          {(['Low', 'Moderate', 'High'] as const).map((s) => (
            <span
              key={s}
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                result.severity === s ? severityColors[s] : 'bg-slate-700/50 text-slate-500'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-theme-cardInner rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-blue-400" />
          <span className="text-white font-semibold text-sm">Description</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{result.description}</p>
      </div>

      {/* Symptoms */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-2">Symptoms</h4>
        <ul className="space-y-1.5">
          {result.symptoms.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm text-slate-300">
              <Check className="w-4 h-4 text-green-brand flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Causes */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-2">Causes</h4>
        <div className="flex flex-wrap gap-2">
          {result.causes.map((c) => (
            <span key={c} className="text-xs bg-slate-700/60 text-slate-300 px-3 py-1 rounded-full">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Treatment type selector */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-2">Treatment</h4>
        <div className="flex gap-2 mb-3">
          {(['chemical', 'organic', 'biological'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTreatmentType(t)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-colors ${
                treatmentType === t
                  ? 'bg-green-brand text-white'
                  : 'bg-slate-700/60 text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-4 border-b border-slate-700/50 mb-4 overflow-x-auto">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`tab-btn whitespace-nowrap ${activeTab === tab.key ? 'active' : ''}`}
              >
                <TabIcon
                  className={`w-4 h-4 ${activeTab === tab.key ? 'text-green-brand' : 'opacity-60'}`}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {tabContent[activeTab].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-brand text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Estimated Cost */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-emerald-900/30 rounded-xl p-3 border border-emerald-700/30">
          <p className="text-xs text-emerald-400 mb-1">Organic</p>
          <p className="text-white font-bold">{result.estimatedCost.organic}</p>
        </div>
        <div className="bg-blue-900/30 rounded-xl p-3 border border-blue-700/30">
          <p className="text-xs text-blue-400 mb-1">Chemical</p>
          <p className="text-white font-bold">{result.estimatedCost.chemical}</p>
        </div>
      </div>

      {/* Nearby Shops */}
      <div>
        <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
          <Store className="w-4 h-4 text-green-brand" /> Nearby Agro Shops
        </h4>
        <ul className="space-y-1.5">
          {result.nearbyShops.map((shop) => (
            <li key={shop} className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {shop}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/50">
        <button type="button" className="btn-green text-xs py-2 px-4">
          <Download className="w-4 h-4" /> Download Report
        </button>
        <button type="button" className="btn-outline text-xs py-2 px-4 border-slate-600 text-slate-300 hover:text-green-brand">
          <Save className="w-4 h-4" /> Save Result
        </button>
      </div>
    </div>
  );
};

export default ResultsPanel;
