import React, { useState } from 'react';
import { ClipboardList, Download, ExternalLink, GraduationCap, Shield, Wallet } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const schemes = [
  {
    id: 1,
    icon: Wallet,
    title: 'Fertilizer Subsidy Program',
    category: 'Subsidies',
    description: '50% subsidy on organic and chemical fertilizers for registered farmers.',
    eligibility: 'Registered farmers with valid NIC and land ownership documents.',
    deadline: '2026-12-31',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 2,
    icon: Shield,
    title: 'Crop Insurance Scheme',
    category: 'Insurance',
    description: 'Protect your crops against natural disasters, pests, and disease outbreaks.',
    eligibility: 'Farmers cultivating minimum 1 acre of registered land.',
    deadline: '2026-09-30',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 3,
    icon: GraduationCap,
    title: 'Smart Farming Training',
    category: 'Training',
    description: 'Free training on AI-based crop monitoring and modern irrigation techniques.',
    eligibility: 'Open to all farmers aged 18–60.',
    deadline: '2026-08-15',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    icon: Wallet,
    title: 'Agricultural Loan — Low Interest',
    category: 'Loans',
    description: 'Loans up to Rs. 500,000 at 4% interest for equipment and seeds.',
    eligibility: 'Minimum 2 years farming experience, good credit history.',
    deadline: '2026-11-30',
    color: 'from-amber-500 to-orange-500',
  },
];

const faqs = [
  { q: 'How do I apply for fertilizer subsidy?', a: 'Register on the Department of Agriculture portal with your NIC and land documents.' },
  { q: 'Can I apply for multiple schemes?', a: 'Yes, you can apply for multiple schemes if you meet each eligibility criteria.' },
  { q: 'How long does approval take?', a: 'Most applications are processed within 14–21 working days.' },
];

const GovernmentSchemesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <PageHeader
        icon={ClipboardList}
        title="Government Schemes"
        subtitle="Subsidies, loans, insurance, and training programs for Sri Lankan farmers."
        centered={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {schemes.map((scheme) => {
          const Icon = scheme.icon;
          return (
            <div key={scheme.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${scheme.color}`} />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scheme.color} flex items-center justify-center text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-green-brand bg-emerald-50 px-2 py-0.5 rounded-full">
                      {scheme.category}
                    </span>
                    <h3 className="font-bold text-slate-800 mt-1">{scheme.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">{scheme.description}</p>
                <div className="space-y-2 mb-4 text-sm">
                  <p><span className="font-semibold text-slate-700">Eligibility:</span> <span className="text-slate-500">{scheme.eligibility}</span></p>
                  <p><span className="font-semibold text-slate-700">Deadline:</span> <span className="text-red-500 font-medium">{scheme.deadline}</span></p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-green text-xs py-2 px-4 flex-1">Apply Now</button>
                  <button type="button" className="btn-outline text-xs py-2 px-3">
                    <Download className="w-4 h-4" />
                  </button>
                  <button type="button" className="btn-outline text-xs py-2 px-3">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Application Status</h3>
          <div className="space-y-3">
            {[
              { name: 'Fertilizer Subsidy', status: 'Approved', color: 'text-emerald-600 bg-emerald-50' },
              { name: 'Crop Insurance', status: 'Pending', color: 'text-amber-600 bg-amber-50' },
              { name: 'Smart Farming Training', status: 'Under Review', color: 'text-blue-600 bg-blue-50' },
            ].map((app) => (
              <div key={app.name} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-700">{app.name}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${app.color}`}>{app.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">FAQs</h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {faq.q}
                </button>
                {openFaq === i && (
                  <p className="px-4 pb-3 text-sm text-slate-500">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemesPage;
