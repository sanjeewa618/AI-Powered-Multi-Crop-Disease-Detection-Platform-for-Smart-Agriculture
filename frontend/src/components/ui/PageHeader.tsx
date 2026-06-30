import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon: Icon, title, subtitle, centered = true }) => (
  <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
    <div className={`flex items-center gap-4 mb-4 ${centered ? 'justify-center' : ''}`}>
      <div className="w-12 h-12 bg-green-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-brand/20">
        <Icon className="w-6 h-6" strokeWidth={2} />
      </div>
      <h1 className="text-[32px] font-bold text-green-brand tracking-tight">{title}</h1>
    </div>
    {subtitle && (
      <p className={`text-slate-500 text-[15px] leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default PageHeader;
