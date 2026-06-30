import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Mic, Send, Volume2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'si', label: 'සිංහල' },
  { code: 'ta', label: 'தமிழ்' },
];

const AIAssistantPage: React.FC = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'Hello! I am KrushiMitra AI. Ask me about crop diseases, fertilizers, weather, market prices, or government schemes.' },
  ]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('en');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const query = (location.state as { query?: string })?.query;
    if (query) sendMessage(query);
  }, [location.state]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          text: getAIResponse(text),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const getAIResponse = (text: string): string => {
    const t = text.toLowerCase();
    if (t.includes('blight')) return 'Tomato Early Blight is caused by Alternaria solani. Apply copper-based fungicide and remove infected leaves. Upload a photo for precise diagnosis.';
    if (t.includes('price') || t.includes('market')) return 'Current tomato price at Dambulla: Rs. 280/kg (+15%). Beans: Rs. 450/kg. Check Market Analysis for full trends.';
    if (t.includes('fertilizer')) return 'For Yala season rice, apply Urea (50kg/acre) at 3 weeks and 6 weeks after transplanting. Use organic compost for better soil health.';
    if (t.includes('scheme') || t.includes('government')) return 'Active schemes: Fertilizer Subsidy (50% off), Crop Insurance, Smart Farming Training. Visit Government Schemes page to apply.';
    if (t.includes('weather')) return 'Today: 28°C, humidity 78%, rain expected evening. High humidity increases fungal disease risk — inspect crops regularly.';
    return 'I can help with diseases, fertilizers, weather, market prices, and government schemes. Try uploading a crop image for AI diagnosis!';
  };

  return (
    <div>
      <PageHeader
        icon={Bot}
        title="AI Assistant"
        subtitle="Chat in English, Sinhala, or Tamil. Ask about diseases, fertilizers, weather, prices, and more."
        centered={false}
      />

      <div className="max-w-3xl mx-auto">
        {/* Language + Voice */}
        <div className="flex items-center gap-3 mb-4">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                lang === l.code ? 'bg-green-brand text-white' : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button type="button" className="ml-auto btn-outline text-xs py-2 px-3">
            <Mic className="w-4 h-4" /> Voice Input
          </button>
        </div>

        {/* Chat */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100 bg-slate-50">
            <div className="w-8 h-8 bg-green-brand rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">KrushiMitra AI</p>
              <p className="text-xs text-green-brand">Online — Ready to help</p>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-green-brand flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-green-brand text-white rounded-br-sm'
                      : 'bg-slate-100 text-slate-700 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                  {msg.role === 'ai' && (
                    <button type="button" className="block mt-1 text-green-brand hover:text-green-600">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Bot className="w-4 h-4" /> Typing...
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 border-t border-slate-100 flex gap-2 overflow-x-auto">
            {['What causes tomato blight?', 'Market prices today', 'Fertilizer for rice', 'Government schemes'].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendMessage(q)}
                className="text-[11px] text-slate-500 border border-slate-200 rounded-full px-3 py-1 whitespace-nowrap hover:border-green-brand hover:text-green-brand"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-slate-100 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about diseases, fertilizers, weather..."
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-brand"
            />
            <button type="button" onClick={() => sendMessage(input)} className="btn-green py-2.5 px-4">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
