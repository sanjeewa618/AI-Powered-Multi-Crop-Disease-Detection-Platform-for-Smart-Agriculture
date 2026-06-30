import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'ai',
    text: '👋 Hello! I\'m your AI crop disease assistant. You can ask me about any plant disease, treatment methods, or upload a leaf image below for instant AI diagnosis!',
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'ai',
    text: '🌿 Try asking: "What causes tomato blight?" or "How do I treat powdery mildew?" — or simply upload a leaf photo below.',
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  'What causes tomato early blight?',
  'How to treat leaf rust?',
  'Best fungicide for apple scab?',
  'Prevent corn smut disease',
];

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        blight: '🍅 Tomato Early Blight is caused by the fungus *Alternaria solani*. Symptoms include dark spots with concentric rings on older leaves. Apply copper-based fungicide and remove infected leaves immediately.',
        rust: '🌾 Leaf rust is a fungal disease. Treatment includes applying fungicides containing propiconazole or tebuconazole. Ensure good air circulation between plants.',
        mildew: '🍃 Powdery mildew can be treated with sulfur-based sprays or neem oil. Remove severely infected parts and avoid overhead watering.',
        default: '🤖 That\'s a great question! For the most accurate diagnosis, try uploading a photo of the affected leaf below. I can analyze it instantly using our AI model trained on 38 crop disease classes.',
      };

      const lowerText = text.toLowerCase();
      let reply = aiResponses.default;
      if (lowerText.includes('blight')) reply = aiResponses.blight;
      else if (lowerText.includes('rust')) reply = aiResponses.rust;
      else if (lowerText.includes('mildew')) reply = aiResponses.mildew;

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'ai', text: reply, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="card mb-6 overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-default bg-bg-hover">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 bg-green-primary rounded-full flex items-center justify-center text-sm">🤖</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-bright rounded-full border-2 border-bg-secondary"></div>
          </div>
          <div>
            <div className="text-text-primary text-sm font-semibold">KrishiMitra AI Assistant</div>
            <div className="text-green-bright text-[11px]">● Online — Ready to help</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge bg-green-muted text-green-bright border border-green-primary/30">38 Diseases</span>
          <span className="badge bg-purple-accent/20 text-purple-light border border-purple-accent/30">GPT Enhanced</span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3 bg-bg-primary/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
          >
            {msg.role === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-green-primary flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0">🤖</div>
            )}
            <div className="flex flex-col gap-1">
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                {msg.text}
              </div>
              <div className={`text-[10px] text-text-muted ${msg.role === 'user' ? 'text-right' : ''}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-6 h-6 rounded-full bg-green-primary flex items-center justify-center text-xs mr-2 flex-shrink-0">🤖</div>
            <div className="chat-bubble-ai flex items-center gap-1">
              <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:300ms]"></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-2 border-t border-border-default flex gap-2 overflow-x-auto">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="text-[11px] text-text-secondary hover:text-green-bright border border-border-default hover:border-green-primary/50 rounded-full px-3 py-1 whitespace-nowrap transition-colors bg-bg-card hover:bg-green-muted"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border-default flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask about crop diseases, treatments, prevention..."
          className="flex-1 bg-bg-card border border-border-default rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-green-primary transition-colors"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="btn-primary py-2.5 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
