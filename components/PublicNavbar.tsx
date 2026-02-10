import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PublicNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4 lg:pl-20 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center gap-12 shadow-glow-sm pointer-events-auto">
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-gray-400 uppercase font-display">
            <Link 
                to="/talent" 
                className={`hover:text-white hover:shadow-glow transition-all ${isActive('/talent') ? 'text-white' : ''}`}
            >
                Find Talent
            </Link>
            <Link 
                to="/work" 
                className={`hover:text-white hover:shadow-glow transition-all ${isActive('/work') ? 'text-white' : ''}`}
            >
                Find Work
            </Link>
            <Link 
                to="/why-hive" 
                className={`hover:text-white hover:shadow-glow transition-all ${isActive('/why-hive') ? 'text-white' : ''}`}
            >
                Why Work Hive
            </Link>
            <Link 
                to="/enterprise" 
                className={`hover:text-white hover:shadow-glow transition-all ${isActive('/enterprise') ? 'text-white' : ''}`}
            >
                Enterprise
            </Link>
          </div>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => navigate('/auth')}
                className="text-gray-300 hover:text-white px-2 py-2 text-xs font-bold transition-all font-display tracking-wider hover:scale-105"
             >
                LOGIN
             </button>
             <button 
                onClick={() => navigate('/auth', { state: { isSignup: true } })}
                className="bg-white text-black border border-white px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-all font-display tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
             >
                SIGN UP
             </button>
          </div>
        </div>
      </nav>
  );
};

export default PublicNavbar;