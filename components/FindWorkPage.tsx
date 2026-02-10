import React from 'react';
import PublicLayout from './PublicLayout';
import { ArrowRight, DollarSign, Globe, Briefcase } from 'lucide-react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';

const FindWorkPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 animate-in slide-in-from-left duration-700">
                <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 bg-white/5">
                    For Professionals
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-wider mb-6 leading-tight">
                    Your Skills,<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Global Impact</span>
                </h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Join an elite network of professionals. Access high-ticket international projects, enjoy guaranteed payments, and build your digital reputation on the blockchain.
                </p>
                <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-sm">
                        <div className="p-1 bg-white text-black rounded-full"><ArrowRight size={12}/></div>
                        <span>Zero commission on your first 3 projects</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                        <div className="p-1 bg-white text-black rounded-full"><ArrowRight size={12}/></div>
                        <span>Instant localized payments via UPI</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                        <div className="p-1 bg-white text-black rounded-full"><ArrowRight size={12}/></div>
                        <span>Verified career credentials</span>
                    </li>
                </ul>
                <Button size="lg" onClick={() => navigate('/auth')}>Create Profile</Button>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 animate-in zoom-in duration-700 delay-100">
                <div className="space-y-4 mt-8">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <DollarSign size={32} className="mb-4 text-green-400"/>
                        <h3 className="font-bold font-display">High Rates</h3>
                        <p className="text-xs text-gray-400 mt-2">Avg project value ₹1.5L+</p>
                    </div>
                     <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <Briefcase size={32} className="mb-4 text-blue-400"/>
                        <h3 className="font-bold font-display">Top Clients</h3>
                        <p className="text-xs text-gray-400 mt-2">Fortune 500 & Startups</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <Globe size={32} className="mb-4 text-purple-400"/>
                        <h3 className="font-bold font-display">Remote First</h3>
                        <p className="text-xs text-gray-400 mt-2">Work from anywhere</p>
                    </div>
                    <div className="bg-black border border-white/20 p-6 rounded-2xl flex flex-col justify-center items-center text-center">
                        <div className="text-3xl font-bold font-display mb-1">500+</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Active Jobs</div>
                    </div>
                </div>
            </div>
        </div>
    </PublicLayout>
  );
};

export default FindWorkPage;