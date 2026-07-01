import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sprout, UserPlus } from 'lucide-react';
import { registerUser } from '../lib/api';

const provinces = ['Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];
const crops = ['Rice', 'Tomato', 'Tea', 'Coconut', 'Vegetables', 'Fruits', 'Spices'];

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [language, setLanguage] = useState('en');
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', username: '', password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await registerUser({
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        username: form.username,
        password: form.password,
        role: 'farmer',
      });
      localStorage.setItem('auth_token', result.access_token);
      localStorage.setItem('user_role', result.role);
      localStorage.setItem('user_email', result.email);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-theme-main">
      <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-white text-center max-w-md">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Sprout className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Join KrushiMitra AI</h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Create your farmer account and get AI-powered crop disease detection, treatment guidance, and smart farming insights.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { val: '38+', label: 'Diseases' },
              { val: '96%', label: 'Accuracy' },
              { val: '12K+', label: 'Farmers' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{s.val}</p>
                <p className="text-xs text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-screen bg-theme-main">
        <div className="w-full max-w-2xl mx-auto py-8 px-4 sm:px-8 flex flex-col justify-start">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-green-brand rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-green-brand">KrushiMitra AI</span>
          </div>

          <div className="text-center lg:text-left mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-brand mb-3">Welcome to KrushiMitra AI</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-700">Create Your Account</h2>
            
            <p className="text-slate-500 mt-2 text-base">Create your farmer account and start exploring smart agriculture tools.</p>
          </div>

          <form className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] p-6 sm:p-8 space-y-6" onSubmit={handleSubmit}>
            <section className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-green-brand" />
                <h3 className="font-semibold text-slate-800">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Sunil Perera" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="farmer@example.com" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+94 77 123 4567" className="form-input" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIC (Optional)</label>
                  <input type="text" placeholder="19XXXXXXXXXV" className="form-input" />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-semibold text-slate-800">Account Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
                  <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="sunil_farmer" className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min. 8 characters" className="form-input pr-12" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Confirm password" className="form-input pr-12" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <h3 className="font-semibold text-slate-800">Farmer Information</h3>
              </div>
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

            <section className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                <h3 className="font-semibold text-slate-800">Preferred Language</h3>
              </div>
              <div className="flex flex-wrap gap-2">
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

            <label className="flex items-start gap-3 cursor-pointer rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
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

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            <button
              type="submit"
              disabled={!accepted || isSubmitting}
              className={`btn-green w-full py-3 text-base ${!accepted ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <UserPlus className="w-5 h-5" /> {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-green-brand font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
