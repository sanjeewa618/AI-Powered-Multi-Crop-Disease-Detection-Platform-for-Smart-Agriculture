import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Sprout, UserPlus } from 'lucide-react';

const provinces = ['Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];
const crops = ['Rice', 'Tomato', 'Tea', 'Coconut', 'Vegetables', 'Fruits', 'Spices'];

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-theme-main py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Create Farmer Account</h1>
          <p className="text-slate-500 mt-2">Join KrushiMitra AI — Smart Agriculture for Sri Lanka</p>
        </div>

        <form className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Personal Information */}
          <section>
            <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input type="text" placeholder="Sunil Perera" className="form-input" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                <input type="email" placeholder="farmer@example.com" className="form-input" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                <input type="tel" placeholder="+94 77 123 4567" className="form-input" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIC (Optional)</label>
                <input type="text" placeholder="19XXXXXXXXXV" className="form-input" />
              </div>
            </div>
          </section>

          {/* Account Information */}
          <section>
            <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
                <input type="text" placeholder="sunil_farmer" className="form-input" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" className="form-input pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                <input type="password" placeholder="Confirm password" className="form-input" />
              </div>
            </div>
          </section>

          {/* Farmer Information */}
          <section>
            <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Farmer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Province</label>
                <select className="form-input">
                  <option value="">Select province</option>
                  {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">District</label>
                <input type="text" placeholder="Kurunegala" className="form-input" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Village</label>
                <input type="text" placeholder="Mawathagama" className="form-input" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Main Crop</label>
                <select className="form-input">
                  <option value="">Select crop</option>
                  {crops.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Farm Size (acres)</label>
                <input type="number" placeholder="3.5" className="form-input" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Years of Experience</label>
                <input type="number" placeholder="10" className="form-input" />
              </div>
            </div>
          </section>

          {/* Language */}
          <section>
            <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Preferred Language</h2>
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
                  className={`text-sm font-semibold px-5 py-2 rounded-xl ${
                    language === l.code ? 'bg-green-brand text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </section>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 rounded border-slate-300 text-green-brand focus:ring-green-brand"
            />
            <span className="text-sm text-slate-600">
              I agree to the Terms of Service and Privacy Policy. I understand my data will be used for AI crop analysis.
            </span>
          </label>

          <Link
            to="/home"
            className={`btn-green w-full py-3 text-base ${!accepted ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <UserPlus className="w-5 h-5" /> Register
          </Link>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-green-brand font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
