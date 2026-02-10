import React from 'react';
import PublicLayout from './PublicLayout';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';

const Feature = ({ icon: Icon, title, desc }: any) => (
    <div className="p-6 border border-white/10 bg-black/40 rounded-xl hover:border-white/30 transition-all group">
        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors">
            <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold font-display uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

const FindTalentPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
        <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-wider mb-6">
                    Hire the Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">1%</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                    Skip the endless interviews. Our AI matches you with pre-vetted senior experts ready to deploy into your workflow immediately.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" onClick={() => navigate('/auth')}>Start Hiring</Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/work')}>I'm a Freelancer</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Feature 
                    icon={Star} 
                    title="Vetted Excellence" 
                    desc="Every freelancer passes a rigourous 5-step technical and behavioral assessment." 
                />
                <Feature 
                    icon={Zap} 
                    title="AI Matching" 
                    desc="Our Gemini-powered engine analyzes your job description to find the perfect fit in seconds." 
                />
                <Feature 
                    icon={ShieldCheck} 
                    title="Zero Risk" 
                    desc="Funds are held in secure escrow and only released when you approve the milestones." 
                />
            </div>

            <div className="mt-32 border-t border-white/10 pt-20">
                <h2 className="text-2xl font-bold font-display uppercase tracking-wider mb-12 text-center">Popular Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['AI Development', 'Blockchain', 'Full Stack', 'UI/UX Design', 'DevOps', 'Cybersecurity', 'Mobile Apps', 'Product Mgmt'].map(cat => (
                        <div key={cat} className="p-4 border border-white/10 text-center hover:bg-white hover:text-black transition-all cursor-pointer rounded-sm uppercase text-xs font-bold tracking-widest">
                            {cat}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </PublicLayout>
  );
};

export default FindTalentPage;