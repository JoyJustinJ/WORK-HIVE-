import React, { useState } from 'react';
import Card from './ui/Card';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Shield, Lock } from 'lucide-react';
import { MOCK_FREELANCERS } from '../constants';

const MessagesPage: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState(MOCK_FREELANCERS[0].id);
  const [messageInput, setMessageInput] = useState('');
  
  // Mock messages store
  const [messages, setMessages] = useState<Record<string, {text: string, sender: 'me' | 'them', time: string}[]>>({
     [MOCK_FREELANCERS[0].id]: [
        { text: "Hi, I reviewed the project requirements. Looks interesting!", sender: 'them', time: "10:00 AM" },
        { text: "Great! Do you have experience with Next.js 14 specifically?", sender: 'me', time: "10:05 AM" },
        { text: "Yes, I've built 3 production apps with App Router recently.", sender: 'them', time: "10:08 AM" },
     ]
  });

  const activeUser = MOCK_FREELANCERS.find(f => f.id === activeChatId) || MOCK_FREELANCERS[0];
  const activeMessages = messages[activeChatId] || [];

  const handleSend = () => {
     if (!messageInput.trim()) return;
     const newMsg = { text: messageInput, sender: 'me' as const, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) };
     setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), newMsg]
     }));
     setMessageInput('');
     
     // Mock Reply
     setTimeout(() => {
        const replyMsg = { text: "Sounds good. Let's move forward.", sender: 'them' as const, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) };
        setMessages(prev => ({
           ...prev,
           [activeChatId]: [...(prev[activeChatId] || []), replyMsg]
        }));
     }, 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-in fade-in duration-500">
      
      {/* Sidebar - Contacts */}
      <Card className="w-80 flex flex-col" noPadding>
         <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display mb-4">Encrypted Channels</h3>
            <div className="relative group">
               <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
               <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-9 p-2 bg-black border border-white/10 rounded-sm text-xs text-white outline-none focus:border-white/40 transition-colors"
               />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto custom-scrollbar">
            {MOCK_FREELANCERS.map(user => (
               <div 
                  key={user.id} 
                  onClick={() => setActiveChatId(user.id)}
                  className={`p-4 flex items-center gap-3 cursor-pointer border-b border-white/5 transition-all hover:bg-white/5 ${activeChatId === user.id ? 'bg-white/10 border-l-2 border-l-white' : 'border-l-2 border-l-transparent'}`}
               >
                  <div className="relative">
                     <img src={user.avatarUrl} className="w-10 h-10 object-cover grayscale" alt={user.name} />
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
                        <span className="text-[10px] text-gray-500">10:42 AM</span>
                     </div>
                     <p className="text-xs text-gray-400 truncate">Last message preview...</p>
                  </div>
               </div>
            ))}
         </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col relative overflow-hidden" noPadding>
         {/* Chat Header */}
         <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-3">
               <img src={activeUser.avatarUrl} className="w-10 h-10 object-cover grayscale border border-white/10" alt={activeUser.name} />
               <div>
                  <h3 className="text-white font-bold font-display tracking-wide">{activeUser.name}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-green-400 uppercase tracking-widest">
                     <Shield size={10} /> Verified Connection
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
               <button className="hover:text-white transition-colors"><Phone size={18} /></button>
               <button className="hover:text-white transition-colors"><Video size={18} /></button>
               <button className="hover:text-white transition-colors"><MoreVertical size={18} /></button>
            </div>
         </div>

         {/* Chat Messages */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-90 custom-scrollbar">
            <div className="flex justify-center mb-6">
               <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-500 flex items-center gap-2">
                  <Lock size={10} /> End-to-end encrypted
               </span>
            </div>

            {activeMessages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-3 rounded-sm text-sm leading-relaxed ${
                     msg.sender === 'me' 
                        ? 'bg-white text-black font-medium' 
                        : 'bg-white/10 text-gray-200 border border-white/10'
                  }`}>
                     <p>{msg.text}</p>
                     <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-gray-500' : 'text-gray-500'}`}>{msg.time}</p>
                  </div>
               </div>
            ))}
         </div>

         {/* Input Area */}
         <div className="p-4 bg-black/40 border-t border-white/10">
            <div className="flex items-center gap-3 bg-black border border-white/20 p-1.5 rounded-sm focus-within:border-white transition-colors">
               <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Paperclip size={18} />
               </button>
               <input 
                  type="text" 
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600"
                  placeholder="Type a secure message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               />
               <button 
                  onClick={handleSend}
                  className="p-2 bg-white text-black hover:bg-gray-200 rounded-sm transition-colors"
               >
                  <Send size={16} />
               </button>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default MessagesPage;