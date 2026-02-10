import React from 'react';
import PublicLayout from './PublicLayout';
import { Hexagon, Lock, Cpu, Globe } from 'lucide-react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';

const WhyWorkHivePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <Hexagon className="mx-auto text-white fill-white shadow-glow mb-8" size={64} />
            <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-wider mb-8">
                The Work Hive <span className="text-gray-500">Manifesto</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-16 font-light">
                We believe the future of work is decentralized, meritocratic, and borderless. 
                Work Hive is not just a platform; it's a protocol for trusted collaboration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="p-8 border-t border-white/20">
                    <Lock className="mb-4 text-white" size={24} />
                    <h3 className="text-lg font-bold uppercase tracking-widest mb-3">Trustless Escrow</h3>
                    <p className="text-sm text-gray-400">
                        Smart contracts ensure that payment is guaranteed upon milestone completion. No more chasing invoices.
                    </p>
                </div>
                <div className="p-8 border-t border-white/20">
                    <Cpu className="mb-4 text-white" size={24} />
                    <h3 className="text-lg font-bold uppercase tracking-widest mb-3">AI Intelligence</h3>
                    <p className="text-sm text-gray-400">
                        Our Gemini-powered engine understands context, code, and culture to match talent with 99% accuracy.
                    </p>
                </div>
                <div className="p-8 border-t border-white/20">
                    <Globe className="mb-4 text-white" size={24} />
                    <h3 className="text-lg font-bold uppercase tracking-widest mb-3">Localized Global</h3>
                    <p className="text-sm text-gray-400">
                        Global standards with local payment rails (UPI) and vernacular support.
                    </p>
                </div>
            </div>

            <div className="mt-20 p-10 border border-white/10 bg-white/5 rounded-xl">
                <h2 className="text-2xl font-bold font-display uppercase mb-4">Ready to join the revolution?</h2>
                <Button size="lg" className="mx-auto" onClick={() => navigate('/auth')}>Get Started Now</Button>
            </div>
        </div>
    </PublicLayout>
  );
};

export default WhyWorkHivePage;