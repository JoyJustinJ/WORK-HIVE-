import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from './PublicLayout';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center px-6 pt-16 md:pt-24">
        
        {/* Main Text */}
        <div className="space-y-6 max-w-4xl relative z-20 mb-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-wider leading-tight uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Work is Here</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto tracking-wide font-light leading-relaxed">
            Connect with the top 1% of global talent. AI-driven matching, secure payments, and premium localized support.
          </p>
        </div>

        {/* The "Orb" Visual */}
        <div className="relative w-full max-w-3xl h-[400px] md:h-[500px] flex items-center justify-center z-10">
           {/* Planet Shadow/Body */}
           <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-black shadow-[inset_-20px_-20px_100px_rgba(255,255,255,0.1)] border border-white/5 z-20 pointer-events-none"></div>
           
           {/* Glow behind planet */}
           <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] z-10 pointer-events-none"></div>

           {/* Rings - SVG */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
             <svg className="w-[120%] h-[120%] opacity-60 animate-spin-slow" viewBox="0 0 500 200">
                <defs>
                   <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="white" />
                      <stop offset="100%" stopColor="transparent" />
                   </linearGradient>
                </defs>
                <ellipse cx="250" cy="100" rx="240" ry="60" fill="none" stroke="url(#ringGradient)" strokeWidth="1" />
                <ellipse cx="250" cy="100" rx="240" ry="60" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.5" />
             </svg>
           </div>
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
             <svg className="w-[100%] h-[100%] opacity-40 animate-spin-reverse-slow" viewBox="0 0 500 200">
                <ellipse cx="250" cy="100" rx="200" ry="40" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 10" />
             </svg>
           </div>

           {/* Centered Actions */}
           <div className="relative z-40 flex flex-col items-center gap-6 mt-16 md:mt-24">
              <button 
                onClick={() => navigate('/auth')} 
                className="group flex items-center gap-3 bg-black/90 backdrop-blur-md border border-white/20 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                 Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </button>
           </div>
        </div>

      </section>
    </PublicLayout>
  );
};

export default LandingPage;