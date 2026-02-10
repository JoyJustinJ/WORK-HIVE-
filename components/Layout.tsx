import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Hexagon,
  LayoutDashboard,
  Search,
  PlusCircle,
  Globe,
  LogOut,
  Settings,
  PieChart,
  MessageSquare,
  FileText,
  Wallet,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UserRole, UserProfile } from '../types';
import AIChatBot from './AIChatBot';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  userProfile: UserProfile | null;
}

const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative group ${isActive
        ? 'text-white bg-white/5 border-r-2 border-white shadow-[inset_10px_0_20px_-10px_rgba(255,255,255,0.1)]'
        : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'group-hover:scale-110'}`}>
          {icon}
        </span>
        <span className="tracking-wide">{label}</span>
      </>
    )}
  </NavLink>
);

const Layout: React.FC<LayoutProps> = ({ children, onLogout, userProfile }) => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-black text-white font-sans selection:bg-white selection:text-black overflow-hidden">
      {/* Sidebar - HUD Style */}
      <aside className="w-64 bg-black/50 backdrop-blur-xl hidden md:flex flex-col fixed h-full z-20 border-r border-white/10 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 flex items-center gap-3 border-b border-white/10 bg-black/20">
          <Hexagon className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" size={28} />
          <div>
            <h1 className="text-xl font-bold tracking-widest font-display text-white">WORK HIVE</h1>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider">{userProfile?.role || 'Guest'} ACCOUNT</p>
          </div>
        </div>

        <nav className="flex-1 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 pb-2 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] font-display">Main Module</div>
          <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label={t('dashboard')} />

          {userProfile?.role === 'client' && (
            <>
              <NavItem to="/find-talent" icon={<Search size={18} />} label={t('findTalent')} />
              <NavItem to="/post-job" icon={<PlusCircle size={18} />} label={t('postJob')} />
            </>
          )}

          {userProfile?.role === 'freelancer' && (
            // Ideally this would point to a Job Board, keeping it consistent with routes for now.
            // We could point to /work (landing) or a new internal route, but for demo let's assume they can view contracts
            <NavItem to="/contracts" icon={<FileText size={18} />} label="My Projects" />
          )}

          <div className="mt-8 px-4 pb-2 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] font-display">Systems</div>
          <NavItem to="/payments" icon={<Wallet size={18} />} label="Payments" />
          <NavItem to="/analytics" icon={<PieChart size={18} />} label="Analytics" />
          {userProfile?.role === 'client' && <NavItem to="/contracts" icon={<FileText size={18} />} label="Contracts" />}
          <NavItem to="/messages" icon={<MessageSquare size={18} />} label="Messages" />
          <NavItem to="/support" icon={<HelpCircle size={18} />} label="Support" />
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/40">
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gray-700 to-black text-white flex items-center justify-center font-bold text-xs border border-gray-500 shadow-glow-sm">
              {userProfile?.displayName ? userProfile.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'JD'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate font-display tracking-wide">{userProfile?.displayName || 'John Doe'}</p>
              <p className="text-[10px] text-gray-400 truncate uppercase tracking-widest">{userProfile?.role || 'Guest'} Account</p>
            </div>
            <button onClick={onLogout} className="text-gray-500 hover:text-white transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black relative">

        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-10">

          <div className="flex items-center gap-4">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-2">
              <Hexagon className="text-white fill-white shadow-glow" size={24} />
              <span className="font-bold text-white font-display tracking-widest">WORK HIVE</span>
            </div>

            {/* Navigation Controls (Back/Forward) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-2 border border-white/10 rounded-sm hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Go Back"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="p-2 border border-white/10 rounded-sm hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Go Forward"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              SYSTEM ONLINE
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors px-3 py-1.5 border border-white/10 rounded-sm hover:border-white/40 hover:bg-white/5 uppercase tracking-wider"
            >
              <Globe size={14} />
              {language === 'en' ? 'EN' : 'HI'}
            </button>
          </div>
        </header>

        <main className="p-6 md:p-10 max-w-7xl mx-auto w-full relative z-0">
          {children}
        </main>

        {/* AI Chat Bot - Floats on top of content */}
        <AIChatBot userRole={userProfile?.role || 'client'} />

      </div>
    </div>
  );
};

export default Layout;