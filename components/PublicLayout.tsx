import React from 'react';
import { Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-hidden relative">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-space-gradient opacity-80 z-0 fixed"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-20 z-0 pointer-events-none fixed"></div>

      {/* Left Social Sidebar - Fixed */}
      <div className="fixed left-0 top-0 bottom-0 w-20 hidden lg:flex flex-col items-center justify-center gap-8 z-50 border-r border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="absolute top-8 cursor-pointer">
          <Link to="/">
            <Hexagon className="text-white fill-white" size={32} />
          </Link>
        </div>
      </div>

      <PublicNavbar />

      <div className="relative z-10 lg:pl-20 pt-24">
        {children}
      </div>

    </div>
  );
};

export default PublicLayout;