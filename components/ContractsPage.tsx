import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { FileText, CheckCircle, Clock, AlertTriangle, MoreHorizontal, Download, Eye } from 'lucide-react';

type ContractStatus = 'Active' | 'Pending' | 'Completed' | 'Dispute';

interface Contract {
  id: string;
  title: string;
  party: string;
  amount: number;
  status: ContractStatus;
  date: string;
  progress: number;
}

const MOCK_CONTRACTS: Contract[] = [
  { id: 'C-1024', title: 'E-commerce Frontend Overhaul', party: 'Arjun Mehta', amount: 125000, status: 'Active', date: 'Oct 24, 2024', progress: 65 },
  { id: 'C-1023', title: 'Mobile App UX Research', party: 'Priya Sharma', amount: 45000, status: 'Completed', date: 'Oct 10, 2024', progress: 100 },
  { id: 'C-1022', title: 'Backend API Optimization', party: 'Lakshmi Iyer', amount: 85000, status: 'Pending', date: 'Oct 01, 2024', progress: 0 },
  { id: 'C-1021', title: 'SEO Audit & Strategy', party: 'Rohan Das', amount: 25000, status: 'Dispute', date: 'Sep 28, 2024', progress: 40 },
];

const StatusBadge = ({ status }: { status: ContractStatus }) => {
   const styles = {
      Active: "bg-green-500/10 text-green-400 border-green-500/20",
      Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      Completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Dispute: "bg-red-500/10 text-red-400 border-red-500/20",
   };

   const icons = {
      Active: <Clock size={12} />,
      Pending: <Clock size={12} />,
      Completed: <CheckCircle size={12} />,
      Dispute: <AlertTriangle size={12} />,
   };

   return (
      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
         {icons[status]} {status}
      </span>
   );
};

const ContractsPage: React.FC = () => {
  const [filter, setFilter] = useState<ContractStatus | 'All'>('All');

  const filteredContracts = filter === 'All' ? MOCK_CONTRACTS : MOCK_CONTRACTS.filter(c => c.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
        <div>
           <h2 className="text-3xl font-bold tracking-wider text-white font-display uppercase">Contract Registry</h2>
           <p className="text-sm text-gray-500 mt-1">Manage agreements, escrow releases, and disputes.</p>
        </div>
        <div className="flex gap-2">
            {['All', 'Active', 'Completed', 'Dispute'].map((f) => (
               <button 
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 text-xs font-bold border transition-all uppercase tracking-widest rounded-sm ${filter === f ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/40'}`}
               >
                  {f}
               </button>
            ))}
        </div>
      </div>

      <div className="grid gap-4">
         {filteredContracts.map((contract) => (
            <Card key={contract.id} className="group hover:bg-white/5 transition-colors" noPadding>
               <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center rounded-sm">
                     <FileText size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 w-full text-center md:text-left">
                     <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                        <h3 className="text-white font-bold font-display tracking-wide">{contract.title}</h3>
                        <span className="hidden md:inline text-gray-600">•</span>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">{contract.party}</span>
                     </div>
                     <p className="text-xs text-gray-500 font-mono">ID: {contract.id} • Started: {contract.date}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-center md:text-right min-w-[120px]">
                     <p className="text-lg font-bold text-white font-display">₹{contract.amount.toLocaleString()}</p>
                     <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                        <div className="bg-white h-full transition-all duration-1000" style={{ width: `${contract.progress}%` }}></div>
                     </div>
                     <p className="text-[10px] text-gray-500 mt-1 text-right">{contract.progress}% Funded</p>
                  </div>

                  {/* Status */}
                  <div>
                     <StatusBadge status={contract.status} />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                     <button className="p-2 border border-white/10 hover:bg-white hover:text-black hover:border-white text-gray-400 rounded-sm transition-all" title="View Details">
                        <Eye size={16} />
                     </button>
                     <button className="p-2 border border-white/10 hover:bg-white hover:text-black hover:border-white text-gray-400 rounded-sm transition-all" title="Download Invoice">
                        <Download size={16} />
                     </button>
                  </div>
               </div>
            </Card>
         ))}
      </div>
    </div>
  );
};

export default ContractsPage;