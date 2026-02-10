import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from './ui/Card';
import { DollarSign, TrendingUp, Clock, Target, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const revenueData = [
  { name: 'Week 1', value: 12000 },
  { name: 'Week 2', value: 19000 },
  { name: 'Week 3', value: 15000 },
  { name: 'Week 4', value: 24000 },
];

const skillsData = [
  { name: 'React', value: 45 },
  { name: 'Node.js', value: 30 },
  { name: 'Design', value: 15 },
  { name: 'Python', value: 10 },
];

const COLORS = ['#ffffff', '#a1a1aa', '#52525b', '#27272a'];

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <Card className="flex flex-col gap-2 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
      <div className="flex justify-between items-start">
         <div className="p-2 border border-white/20 rounded-sm bg-black/50 text-white">
            <Icon size={18} />
         </div>
         <span className="text-[10px] font-bold text-green-400 flex items-center bg-green-900/20 px-1.5 py-0.5 border border-green-500/20 rounded-sm tracking-wide">
            {trend}
         </span>
      </div>
      <div className="relative z-10 mt-2">
         <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{label}</p>
         <p className="text-2xl font-bold text-white font-display mt-1">{value}</p>
      </div>
  </Card>
);

const AnalyticsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
        <div>
           <h2 className="text-3xl font-bold tracking-wider text-white font-display uppercase">Financial Intelligence</h2>
           <p className="text-sm text-gray-500 mt-1">Real-time performance metrics and revenue streams.</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-black border border-white/20 text-white text-xs px-3 py-2 outline-none uppercase tracking-wider rounded-sm hover:border-white transition-colors">
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>YTD</option>
           </select>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard icon={DollarSign} label="Total Revenue" value="₹2,45,000" trend="+18.2%" />
         <StatCard icon={TrendingUp} label="Avg. Rate" value="₹2,800/hr" trend="+5.4%" />
         <StatCard icon={Clock} label="Hours Billed" value="142 hrs" trend="+12.1%" />
         <StatCard icon={Target} label="Conversion" value="68%" trend="+2.3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <Card className="lg:col-span-2 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">Revenue Trajectory</h3>
            </div>
            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                     <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 10, fontFamily: 'Orbitron'}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 10, fontFamily: 'Orbitron'}} tickFormatter={(value) => `₹${value/1000}k`} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#000', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                     />
                     <Area type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* Distribution Chart */}
         <Card className="flex flex-col">
            <div className="mb-6">
               <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">Revenue by Skill</h3>
            </div>
            <div className="flex-1 min-h-[200px] relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={skillsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {skillsData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" />
                        ))}
                     </Pie>
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#000', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
               {/* Center Text */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold font-display text-white">4</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500">Categories</span>
               </div>
            </div>
            <div className="mt-6 space-y-3">
               {skillsData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                        <span className="text-gray-400 uppercase tracking-wider">{item.name}</span>
                     </div>
                     <span className="text-white font-bold font-display">{item.value}%</span>
                  </div>
               ))}
            </div>
         </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;