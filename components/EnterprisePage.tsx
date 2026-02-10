import React from 'react';
import PublicLayout from './PublicLayout';
import { Building2, FileCheck, Users, PieChart } from 'lucide-react';
import Button from './ui/Button';

const EnterprisePage: React.FC = () => {
  return (
    <PublicLayout>
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex flex-col lg:flex-row gap-20">
                <div className="flex-1">
                    <h1 className="text-5xl font-bold font-display uppercase tracking-wider mb-6 leading-none">
                        Scale Your <br/> Workforce
                    </h1>
                    <p className="text-xl text-gray-400 mb-10">
                        Enterprise-grade freelance management system for agile organizations. 
                        Compliance, billing, and sourcing in one unified dashboard.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        <div className="flex items-start gap-3">
                            <FileCheck className="text-white shrink-0" />
                            <div>
                                <h4 className="font-bold uppercase tracking-wide text-sm">Compliance</h4>
                                <p className="text-xs text-gray-500 mt-1">Automated tax forms and legal contracts.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Users className="text-white shrink-0" />
                            <div>
                                <h4 className="font-bold uppercase tracking-wide text-sm">Team Builder</h4>
                                <p className="text-xs text-gray-500 mt-1">Curate private talent pools for your managers.</p>
                            </div>
                        </div>
                    </div>
                    <Button size="lg" className="bg-white text-black hover:bg-gray-200">Contact Sales</Button>
                </div>
                
                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                    <div className="relative border border-white/10 bg-black/80 backdrop-blur-xl p-8 rounded-xl shadow-2xl">
                        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                            <div className="flex items-center gap-3">
                                <Building2 size={24}/>
                                <span className="font-display font-bold">ACME Corp Dashboard</span>
                            </div>
                            <div className="text-xs text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-1 rounded">Enterprise Plan</div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-24 bg-white/5 rounded w-full animate-pulse"></div>
                            <div className="flex gap-4">
                                <div className="h-32 bg-white/5 rounded flex-1 animate-pulse"></div>
                                <div className="h-32 bg-white/5 rounded flex-1 animate-pulse"></div>
                            </div>
                            <div className="h-12 bg-white/5 rounded w-3/4 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-32 text-center">
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-8">Trusted by industry leaders</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                    <div className="text-2xl font-bold font-display">TECHFLOW</div>
                    <div className="text-2xl font-bold font-display">NEXUS</div>
                    <div className="text-2xl font-bold font-display">ORBITAL</div>
                    <div className="text-2xl font-bold font-display">QUANTUM</div>
                </div>
            </div>
        </div>
    </PublicLayout>
  );
};

export default EnterprisePage;