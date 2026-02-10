import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: 'Namaste! I am the Hive Assistant. How can I help you navigate the top 1% talent ecosystem today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setLoading(true);

        console.log(">>> [AI DEBUG] Attempting to send message to Gemini...");
        console.log(">>> [AI DEBUG] API Key Present:", !!GEMINI_API_KEY);

        try {
            if (!GEMINI_API_KEY) {
                console.error(">>> [AI DEBUG] ERROR: API Key is missing!");
                throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to .env.local");
            }

            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `You are a helpful assistant for "Work Hive", a premium freelancing platform for the Indian market. 
      Users can be freelancers or clients. 
      Your tone is professional, elite, yet helpful. 
      Keep responses concise and helpful. 
      If asked about technical issues, suggest contacting support@workhive.in.
      User message: ${userMessage}`;

            console.log(">>> [AI DEBUG] sending prompt to model...");
            const result = await model.generateContent(prompt);
            console.log(">>> [AI DEBUG] Response received.");
            const response = await result.response;
            const text = response.text();
            console.log(">>> [AI DEBUG] Text extracted:", text.substring(0, 50) + "...");

            setMessages(prev => [...prev, { role: 'bot', text }]);
        } catch (error: any) {
            console.error(">>> [AI DEBUG] Chatbot Error Details:", error);

            let errorMessage = "I'm having trouble connecting to my hive mind right now. Please try again later or check your API key.";

            // Customize error message for better user feedback if possible
            if (error.message?.includes("API Key")) errorMessage = "System Error: API Key is missing.";
            if (error.status === 403) errorMessage = "Access Denied: Please check if your API key is valid and has the correct permissions.";

            setMessages(prev => [...prev, { role: 'bot', text: errorMessage }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all duration-500 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-black border border-white/20 text-white hover:border-white'}`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <Bot size={18} className="text-black" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold tracking-wider uppercase">Hive AI Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Core Connected</span>
                                </div>
                            </div>
                        </div>
                        <Sparkles className="text-white/20" size={18} />
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-white text-black' : 'bg-white/5 border border-white/10 text-gray-200'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin text-gray-500" />
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">Processing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-black/40">
                        <div className="relative group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask anything about the Hive..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm outline-none focus:border-white/30 transition-all placeholder-gray-600"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
