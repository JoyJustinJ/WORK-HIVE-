import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { SKILLS_TRENDING } from '../constants';
import Card from './ui/Card';
import Button from './ui/Button';
import { TrendingUp, Briefcase, DollarSign, Activity, Lock, ArrowUpRight, Download, Plus, Cpu, Radio, Users, Eye, Search, Wallet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../types';

interface DashboardProps {
  userRole: UserRole;
}

const buyerData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 32000 },
  { name: 'Mar', value: 55000 },
  { name: 'Apr', value: 48000 },
  { name: 'May', value: 62000 },
  { name: 'Jun', value: 58000 },
];

const sellerData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Determine mode based on user role prop
  const mode = userRole === 'client' ? 'buyer' : 'seller';

  const stats = mode === 'buyer' ? [
    { 
        label: 'Total Spend', 
        value: '₹4,50,000', 
        icon: DollarSign, 
        trend: '+12.5%', 
        trendColor: 'text-gray-400', 
        trendBg: 'bg-white/10' 
    },
    { 
        label: 'Active Hires', 
        value: '3', 
        sub: 'Contractors', 
        icon: Users, 
        trend: 'Stable', 
        trendColor: 'text-blue-400', 
        trendBg: 'bg-blue-500/10' 
    },
    { 
        label: 'Escrow Vault', 
        value: '₹15,000', 
        sub: 'Secured', 
        icon: Lock, 
        trend: '2 Pending', 
        trendColor: 'text-yellow-400', 
        trendBg: 'bg-yellow-500/10' 
    }
  ] : [
    { 
        label: 'Total Revenue', 
        value: '₹1,24,500', 
        icon: DollarSign, 
        trend: '+24.5%', 
        trendColor: 'text-green-400', 
        trendBg: 'bg-green-500/10' 
    },
    { 
        label: 'Active Projects', 
        value: '2', 
        sub: 'Ongoing', 
        icon: Briefcase, 
        trend: '+1 New', 
        trendColor: 'text-green-400', 
        trendBg: 'bg-green-500/10' 
    },
    { 
        label: 'Profile Views', 
        value: '142', 
        sub: 'This Week', 
        icon: Eye, 
        trend: '+18%', 
        trendColor: 'text-green-400', 
        trendBg: 'bg-green-500/10' 
    }
  ];

  const currentData = mode === 'buyer' ? buyerData : sellerData;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-bold tracking-wider text-white font-display uppercase">Dashboard</h2>
           <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <div className={`w-2 h-2 rounded-full animate-pulse ${mode === 'buyer' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
              <p>{mode === 'buyer' ? 'Client Overview' : 'Freelancer Workspace'}</p>
           </div>
        </div>

        {/* No Toggle Needed - Role is determined by Auth */}

        <div className="flex gap-3">
          <Button 
            onClick={() => alert("Downloading report...")}
            variant="outline" 
            size="sm" 
            className="border-white/20 text-gray-300 hover:bg-white/10 hover:border-white hover:text-white font-display uppercase tracking-widest text-xs"
          >
             <Download size={14} className="mr-2"/> Export Data
          </Button>
          {mode === 'buyer' ? (
            <Button 
                onClick={() => navigate('/post-job')}
                variant="primary" 
                size="sm" 
                className="!bg-white !text-black hover:bg-gray-200 border-none font-display uppercase tracking-widest text-xs font-bold shadow-glow-sm"
            >
                <Plus size={14} className="mr-2"/> Post Job
            </Button>
          ) : (
            <Button 
                onClick={() => navigate('/work')}
                variant="primary" 
                size="sm" 
                className="!bg-white !text-black hover:bg-gray-200 border-none font-display uppercase tracking-widest text-xs font-bold shadow-glow-sm"
            >
                <Search size={14} className="mr-2"/> Find Work
            </Button>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
            <Card key={idx} className="flex flex-col justify-between gap-4 relative overflow-hidden group" hoverEffect>
            <div className={`absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-all`}></div>
            <div className="flex justify-between items-start relative z-10">
                <div className="p-2 border border-white/20 rounded-lg bg-black/50">
                    <stat.icon size={20} className="text-white" />
                </div>
                <span className={`text-[10px] font-bold flex items-center px-2 py-1 border border-white/5 rounded-sm tracking-wider ${stat.trendColor} ${stat.trendBg}`}>
                    {stat.trend}
                </span>
            </div>
            <div className="relative z-10">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest font-display">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-3xl font-bold tracking-tight text-white font-display drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{stat.value}</p>
                    {stat.sub && <span className="text-xs text-gray-500">{stat.sub}</span>}
                </div>
            </div>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <Card className="lg:col-span-2 min-h-[400px] border-white/10 bg-black/40">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display flex items-center gap-2">
                <Activity size={16} className="text-gray-500"/> {mode === 'buyer' ? 'Spend Analytics' : 'Revenue Analytics'}
             </h3>
             <select className="text-xs border border-white/20 bg-black text-gray-300 p-1 rounded-sm outline-none uppercase tracking-wider hover:border-white/40">
                <option>Last 6 Months</option>
             </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 10, fontFamily: 'Orbitron'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 10, fontFamily: 'Orbitron'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#000', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 0 10px rgba(255,255,255,0.1)', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`₹${value}`, mode === 'buyer' ? 'Spend' : 'Revenue']}
                />
                <Bar dataKey="value" fill="#ffffff" radius={[2, 2, 0, 0]} barSize={20} className="drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Intelligence Panel */}
        <div className="space-y-6">
           {/* Market Trends */}
           <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <Cpu size={20} className="text-white shadow-glow" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">{t('aiInsights')}</h3>
              </div>
              
              <div className="space-y-4">
                {SKILLS_TRENDING.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded transition-colors -mx-2">
                    <span className="font-medium text-xs text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
                    <span className="text-white font-bold flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 border border-white/20 rounded-sm font-display">
                      <TrendingUp size={10} /> {skill.growth}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/analytics')}
                className="mt-8 w-full py-3 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group rounded-sm"
              >
                View Insights <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
              </button>
           </div>

           {/* Quick Actions - Context Aware */}
           <Card className="border-l-4 border-l-white">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 font-display">Quick Actions</h3>
              <div className="space-y-2">
                 {mode === 'buyer' ? (
                     <>
                        <button 
                            onClick={() => navigate('/contracts')}
                            className="w-full text-left p-3 hover:bg-white/5 border border-white/10 flex items-center justify-between group transition-all rounded-sm bg-black/40"
                        >
                            <span className="font-medium text-xs text-gray-300 group-hover:text-white">Create NDA</span>
                            <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white"/>
                        </button>
                        <button 
                            onClick={() => navigate('/payments')}
                            className="w-full text-left p-3 hover:bg-white/5 border border-white/10 flex items-center justify-between group transition-all rounded-sm bg-black/40"
                        >
                            <span className="font-medium text-xs text-gray-300 group-hover:text-white">Fund Escrow</span>
                            <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white"/>
                        </button>
                     </>
                 ) : (
                     <>
                        <button 
                            onClick={() => navigate('/contracts')}
                            className="w-full text-left p-3 hover:bg-white/5 border border-white/10 flex items-center justify-between group transition-all rounded-sm bg-black/40"
                        >
                            <span className="font-medium text-xs text-gray-300 group-hover:text-white">Submit Invoice</span>
                            <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white"/>
                        </button>
                         <button 
                            onClick={() => navigate('/payments')}
                            className="w-full text-left p-3 hover:bg-white/5 border border-white/10 flex items-center justify-between group transition-all rounded-sm bg-black/40"
                        >
                            <span className="font-medium text-xs text-gray-300 group-hover:text-white">Withdraw Funds</span>
                            <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white"/>
                        </button>
                     </>
                 )}
              </div>
           </Card>
        </div>
      </div>
      
      {/* Recent Activity Feed */}
      <Card>
         <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">Recent Activity</h3>
            <Button 
                onClick={() => navigate('/analytics')}
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-white text-xs uppercase tracking-widest"
            >
                View All
            </Button>
         </div>
         <div className="space-y-0">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex gap-4 py-4 border-b last:border-0 border-white/5 hover:bg-white/5 px-4 -mx-4 transition-colors group cursor-default">
                  <div className="w-10 h-10 border border-white/20 bg-black/50 flex items-center justify-center group-hover:border-white group-hover:shadow-glow-sm transition-all rounded-sm">
                     <Activity size={16} className="text-white" />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors font-display">
                        {mode === 'buyer' ? 'Milestone "Frontend Setup" approved' : 'Payment received for "Frontend Setup"'}
                     </p>
                     <p className="text-[10px] text-gray-500 uppercase tracking-wide">2 hours ago • Project: E-commerce Revamp</p>
                  </div>
                  <div className="ml-auto flex items-center">
                     <span className="px-3 py-1 border border-white/10 text-[10px] font-bold text-gray-400 bg-black group-hover:bg-white group-hover:text-black transition-all uppercase tracking-widest rounded-sm">Details</span>
                  </div>
               </div>
            ))}
         </div>
      </Card>
    </div>
  );
};

export default Dashboard;