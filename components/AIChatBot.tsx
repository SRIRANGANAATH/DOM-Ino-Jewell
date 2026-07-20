"use client";

import { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your personal DOM-Ino concierge. How can I assist you with your jewelry selection or Gold Savings Plan today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'ai', 
        content: 'Thank you for your message. Currently, I am a demo assistant. I can help you navigate our Heritage Loyalty plan or find the perfect piece.' 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Glow Button */}
      <div className="fixed bottom-[90px] md:bottom-8 right-4 md:right-8 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-14 h-14 bg-[#0E332E] text-[#8A7043] rounded-full shadow-[0_0_15px_rgba(138,112,67,0.5)] transition-transform hover:scale-110"
          >
            {/* Glowing rings */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#8A7043]"></div>
            <div className="absolute -inset-2 rounded-full bg-[#8A7043]/20 blur animate-pulse pointer-events-none"></div>
            <Bot size={28} className="relative z-10" />
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="absolute bottom-0 right-0 w-[calc(100vw-32px)] sm:w-[400px] h-[500px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#8A7043]/20 origin-bottom-right animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#0E332E] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8A7043]/20 flex items-center justify-center text-[#8A7043]">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold tracking-widest text-[#8A7043] text-sm uppercase">DOM-Ino Assistant</h3>
                  <p className="text-[10px] text-white/60">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#F9F6F0] space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#0E332E] text-white rounded-br-none' 
                      : 'bg-white text-[#0E332E] border border-[#0E332E]/10 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#0E332E]/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-[#F9F6F0] border border-[#0E332E]/10 rounded-full px-4 py-2.5 text-sm text-[#0E332E] outline-none focus:border-[#8A7043]/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-[#8A7043] text-white flex items-center justify-center hover:bg-[#7a6239] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send size={16} className="ml-[2px]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
