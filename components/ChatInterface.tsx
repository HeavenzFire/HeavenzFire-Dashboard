
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';
import { ICONS } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to the HeavenzFire Multimodal Sandbox. Upload an image or describe your vision, and I will help you generate code or analyze visuals.',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !image) || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      image: image || undefined,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setImage(null);
    setLoading(true);

    const responseText = await geminiService.generateResponse(input, image || undefined);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[700px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h2 className="font-bold text-slate-100 uppercase tracking-tight text-sm">Multimodal Bridge v1.0</h2>
        </div>
        <div className="flex gap-2">
           <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400">
             <ICONS.Github />
           </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-orange-600 text-white' 
                : 'bg-slate-900 text-slate-200 border border-slate-800'
            }`}>
              {msg.image && (
                <img src={msg.image} alt="Upload" className="max-w-xs rounded-lg mb-3 border border-white/10" />
              )}
              <div className="whitespace-pre-wrap text-sm leading-relaxed font-normal">
                {msg.content}
              </div>
              <div className="mt-2 text-[10px] opacity-50 font-mono">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 flex gap-2 items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900/50 border-t border-slate-800 backdrop-blur-md">
        {image && (
          <div className="mb-4 relative inline-block">
             <img src={image} className="w-20 h-20 object-cover rounded-lg border-2 border-orange-500 shadow-lg" />
             <button 
               onClick={() => setImage(null)}
               className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600"
             >
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
             </button>
          </div>
        )}
        <div className="flex gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            className="hidden" 
            accept="image/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </button>
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Describe your prompt..."
            className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none placeholder-slate-500"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-500 text-white px-6 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)] disabled:opacity-50"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
