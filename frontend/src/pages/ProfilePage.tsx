import React from 'react';
import { Camera, Edit, Leaf, MapPin, User } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import { ROLE_LABELS } from '../types/roles';
import type { UserRole } from '../types/roles';

const ProfilePage: React.FC = () => {
  const role: UserRole = 'farmer';

  return (
    <div>
      <PageHeader
        icon={User}
        title="My Profile"
        subtitle="Manage your farmer profile and view your activity statistics."
        centered={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              SP
            </div>
            <h2 className="font-bold text-xl text-slate-800">Sunil Perera</h2>
            <p className="text-sm text-green-brand font-semibold mt-1">{ROLE_LABELS[role]}</p>
            <button type="button" className="btn-outline text-xs py-2 px-4 mt-4 mx-auto">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'District', value: 'Kurunegala' },
                { label: 'Province', value: 'North Western' },
                { label: 'Main Crop', value: 'Tomato, Rice' },
                { label: 'Farm Size', value: '3.5 acres' },
                { label: 'Experience', value: '12 years' },
                { label: 'Language', value: 'Sinhala, English' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-green-brand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-xs">{item.label}</p>
                    <p className="font-semibold text-slate-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Camera} label="Total Scans" value={47} />
            <StatCard icon={Leaf} label="Diseases Found" value={15} color="text-red-500" />
            <StatCard icon={User} label="Reports Saved" value={32} color="text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
