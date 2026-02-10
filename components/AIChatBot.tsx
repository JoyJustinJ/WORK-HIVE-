import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Bot } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { UserRole } from '../types';

interface AIChatBotProps {
  userRole: UserRole;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const AIChatBot: React.FC<AIChatBotProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `Hello! I'm HiveMind. How can I assist you with your ${userRole === 'client' ? 'hiring' : 'freelancing'} today?`, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSession = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session when opened
  useEffect(() => {
    if (isOpen && !chatSession.current) {
        chatSession.current = createChatSession(userRole);
    }
  }, [isOpen, userRole]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
        let text = "";
        if (chatSession.current) {
            const result = await chatSession.current.sendMessage({ message: userMsg.text });
            text = result.text;
        } else {
            // Mock response if no API key is present in environment
            await new Promise(resolve => setTimeout(resolve, 1500));
            text = "I'm currently running in demo mode (API Key missing). Please configure the API Key to enable my full neural capabilities.";
        }
        
        const botMsg: Message = { id: (Date.now() + 1).toString(), text: text, sender: 'bot' };
        setMessages(prev => [...prev, botMsg]);
    } catch (error) {
        console.error("Chat Error", error);
        setMessages(prev => [...prev, { id: Date.now().toString(), text: "I encountered a neural disruption. Please try again.", sender: 'bot' }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-glow transition-all duration-300 group ${isOpen ? 'rotate-90 bg-white text-black' : 'bg-black border border-white/20 text-white hover:bg-white hover:text-black'}`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} className="group-hover:animate-bounce" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-400" />
                <h3 className="font-bold font-display text-white tracking-wide">HiveMind AI</h3>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full bg-green-500/10">Online</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                        msg.sender === 'user' 
                        ? 'bg-white text-black font-medium rounded-tr-none' 
                        : 'bg-white/10 text-gray-200 border border-white/10 rounded-tl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/10 flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/50">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-white/50 transition-colors">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
                    disabled={isTyping}
                    autoFocus
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                >
                    <Send size={16} />
                </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-[9px] text-gray-600">Powered by Gemini 3 Flash • AI can make mistakes.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;