import React, { useState } from 'react';
import { Heart, MessageCircle, Send, ThumbsUp, Users } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const categories = ['All', 'Rice', 'Vegetables', 'Tea', 'Fruits', 'Flowers'];

const posts = [
  {
    id: 1,
    author: 'Sunil Perera',
    role: 'Farmer · Kurunegala',
    category: 'Vegetables',
    time: '2 hours ago',
    question: 'My tomato plants have brown spots on lower leaves. Is this early blight?',
    likes: 12,
    comments: 5,
    expert: true,
  },
  {
    id: 2,
    author: 'Kamala Fernando',
    role: 'Farmer · Kandy',
    category: 'Rice',
    time: '5 hours ago',
    question: 'Best time to apply fertilizer for Yala season rice cultivation?',
    likes: 8,
    comments: 3,
    expert: false,
  },
  {
    id: 3,
    author: 'Dr. Nimal Silva',
    role: 'Agricultural Officer',
    category: 'Tea',
    time: '1 day ago',
    question: 'Red spider mite alert in Nuwara Eliya region — use neem-based spray immediately.',
    likes: 45,
    comments: 12,
    expert: true,
  },
];

const CommunityPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [newPost, setNewPost] = useState('');

  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div>
      <PageHeader
        icon={Users}
        title="Farmer Community"
        subtitle="Ask questions, share knowledge, and connect with fellow farmers and agricultural experts."
        centered={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* New Post */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Ask a question or share your experience..."
              className="w-full border border-slate-200 rounded-xl p-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-green-brand resize-none h-24"
            />
            <div className="flex justify-between items-center mt-3">
              <button type="button" className="text-xs text-slate-500 hover:text-green-brand font-medium">
                + Upload Image
              </button>
              <button type="button" className="btn-green text-xs py-2 px-4">
                <Send className="w-4 h-4" /> Post Question
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  activeCategory === cat
                    ? 'bg-green-brand text-white'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-green-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts */}
          {filtered.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {post.author[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 text-sm">{post.author}</span>
                    {post.expert && (
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Expert</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{post.role} · {post.time}</p>
                </div>
                <span className="ml-auto text-xs bg-emerald-50 text-green-brand px-2 py-0.5 rounded-full font-semibold">
                  {post.category}
                </span>
              </div>
              <p className="text-sm text-slate-700 mb-4">{post.question}</p>
              <div className="flex items-center gap-4 text-slate-400">
                <button type="button" className="flex items-center gap-1 text-xs hover:text-green-brand">
                  <ThumbsUp className="w-4 h-4" /> {post.likes}
                </button>
                <button type="button" className="flex items-center gap-1 text-xs hover:text-green-brand">
                  <MessageCircle className="w-4 h-4" /> {post.comments}
                </button>
                <button type="button" className="flex items-center gap-1 text-xs hover:text-red-400 ml-auto">
                  <Heart className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3">Trending Discussions</h3>
            {['Tomato blight treatment', 'Yala season fertilizer', 'Neem spray recipe'].map((t) => (
              <p key={t} className="text-sm text-slate-600 py-2 border-b border-slate-100 last:border-0 hover:text-green-brand cursor-pointer">
                #{t.replace(/\s/g, '')}
              </p>
            ))}
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-2">Agricultural Experts</h3>
            <p className="text-xs text-white/80 mb-3">Get verified answers from officers and specialists.</p>
            {['Dr. Nimal Silva', 'Ms. Priya Jayawardena'].map((e) => (
              <div key={e} className="flex items-center gap-2 py-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                  {e[0]}
                </div>
                <span className="text-sm">{e}</span>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">Announcements</h3>
            <p className="text-xs text-amber-700">Fall Armyworm alert in Kurunegala district. Inspect crops daily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
