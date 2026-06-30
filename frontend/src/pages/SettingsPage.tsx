import React, { useState } from 'react';
import { Bell, Globe, Moon, Settings, Trash2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    disease: true,
    weather: true,
    market: true,
    government: false,
  });
  const [language, setLanguage] = useState('en');

  return (
    <div>
      <PageHeader
        icon={Settings}
        title="Settings"
        subtitle="Customize language, theme, notifications, and account preferences."
        centered={false}
      />

      <div className="max-w-2xl space-y-6">
        {/* Language */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-green-brand" />
            <h3 className="font-bold text-slate-800">Language</h3>
          </div>
          <div className="flex gap-2">
            {[
              { code: 'en', label: 'English' },
              { code: 'si', label: 'සිංහල' },
              { code: 'ta', label: 'தமிழ்' },
            ].map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                className={`text-sm font-semibold px-4 py-2 rounded-xl ${
                  language === l.code ? 'bg-green-brand text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-green-brand" />
              <div>
                <h3 className="font-bold text-slate-800">Dark Mode</h3>
                <p className="text-sm text-slate-500">Switch to dark theme</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-green-brand' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-green-brand" />
            <h3 className="font-bold text-slate-800">Notification Settings</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-700 capitalize">{key} Alerts</span>
                <button
                  type="button"
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !enabled }))}
                  className={`w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-green-brand' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Password */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Change Password</h3>
          <div className="space-y-3">
            <input type="password" placeholder="Current password" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-brand" />
            <input type="password" placeholder="New password" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-brand" />
            <button type="button" className="btn-green text-sm py-2 px-6">Update Password</button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
          <div className="flex items-center gap-3 mb-2">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-red-800">Delete Account</h3>
          </div>
          <p className="text-sm text-red-600 mb-3">This action is permanent and cannot be undone.</p>
          <button type="button" className="text-sm font-semibold text-red-600 border border-red-300 px-4 py-2 rounded-xl hover:bg-red-100">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
