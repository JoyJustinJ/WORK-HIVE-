import React, { useState, useEffect } from 'react';
import { Freelancer, Job, MatchResult } from '../types';
import { MOCK_FREELANCERS, JOB_CATEGORIES } from '../constants';
import { analyzeMatch } from '../services/geminiService';
import Card from './ui/Card';
import Button from './ui/Button';
import { MapPin, Star, Sparkles, MessageSquare, Filter, Search as SearchIcon } from 'lucide-react';

interface FreelancerDiscoveryProps {
  activeJob: Job | null; // Pass an active job context to enable AI matching
  onHire: (freelancer: Freelancer) => void;
}

const FreelancerDiscovery: React.FC<FreelancerDiscoveryProps> = ({ activeJob, onHire }) => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>(MOCK_FREELANCERS);
  const [matchResults, setMatchResults] = useState<Record<string, MatchResult>>({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [filterLang, setFilterLang] = useState('');
  const [filterLoc, setFilterLoc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Effect to run AI matching when job context changes
  useEffect(() => {
    if (activeJob) {
      const runMatching = async () => {
        setLoadingAI(true);
        const results: Record<string, MatchResult> = {};
        
        // Parallel requests for demo speed
        const promises = freelancers.map(async (f) => {
           const match = await analyzeMatch(activeJob, f);
           results[f.id] = match;
        });

        await Promise.all(promises);
        setMatchResults(results);
        setLoadingAI(false);
      };
      runMatching();
    }
  }, [activeJob, freelancers]);

  const filteredFreelancers = freelancers.filter(f => {
    const matchesLang = filterLang ? f.languages.includes(filterLang) : true;
    const matchesLoc = filterLoc ? f.location.toLowerCase().includes(filterLoc.toLowerCase()) : true;
    return matchesLang && matchesLoc;
  }).sort((a, b) => {
    // Sort by AI score if available
    const scoreA = matchResults[a.id]?.score || 0;
    const scoreB = matchResults[b.id]?.score || 0;
    return scoreB - scoreA;
  });

  return (
    <div className="space-y-8">
      
      {/* Categories Bar */}
      <div className="flex gap-3 overflow-x-auto pb-4 border-b border-white/10 scrollbar-hide">
         <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-5 py-2 text-sm font-bold border transition-colors ${selectedCategory === 'All' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'}`}
         >
            All Talent
         </button>
         {JOB_CATEGORIES.map(cat => (
            <button 
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-5 py-2 text-sm font-bold border transition-colors whitespace-nowrap ${selectedCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'}`}
            >
               {cat}
            </button>
         ))}
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
             {activeJob ? 'AI Matched Results' : 'Explore Top Talent'}
             {activeJob && <Sparkles className="text-yellow-400" size={24} />}
           </h2>
           <p className="text-gray-400 text-sm mt-1">Found {filteredFreelancers.length} professionals matching your criteria.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-2 border border-white/20 bg-black text-white hover:border-white transition-colors">
             <Filter size={14} className="text-gray-400"/>
             <select 
               className="bg-transparent text-sm outline-none text-white cursor-pointer"
               onChange={e => setFilterLang(e.target.value)}
             >
               <option value="" className="text-black">Any Language</option>
               <option value="Hindi" className="text-black">Hindi</option>
               <option value="English" className="text-black">English</option>
               <option value="Tamil" className="text-black">Tamil</option>
             </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border border-white/20 bg-black text-white hover:border-white transition-colors w-48">
             <SearchIcon size={14} className="text-gray-400"/>
             <input 
                type="text" 
                placeholder="Search city..." 
                className="bg-transparent text-sm outline-none w-full placeholder-gray-500"
                onChange={e => setFilterLoc(e.target.value)}
             />
          </div>
        </div>
      </div>

      {loadingAI && (
        <div className="p-16 text-center border border-dashed border-white/20 rounded-sm">
           <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
           <p className="font-medium text-white">Work Hive AI is analyzing compatibility...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.map(freelancer => {
          const match = matchResults[freelancer.id];

          return (
            <Card key={freelancer.id} className="flex flex-col h-full group" hoverEffect>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                     <img src={freelancer.avatarUrl} alt={freelancer.name} className="w-14 h-14 object-cover border border-gray-200 grayscale group-hover:grayscale-0 transition-all duration-500" />
                     {freelancer.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-black text-white p-0.5 border-2 border-white">
                           <div className="w-3 h-3 flex items-center justify-center text-[8px]">✓</div>
                        </div>
                     )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight text-black">
                      {freelancer.name}
                    </h3>
                    <p className="text-sm text-gray-500">{freelancer.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-black text-white px-2 py-1 text-xs font-bold">
                  <Star size={10} fill="currentColor" /> {freelancer.rating}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500 mb-5 pb-5 border-b border-gray-100">
                <span className="flex items-center gap-1"><MapPin size={12} /> {freelancer.location}</span>
                <span className="flex items-center gap-1"><MessageSquare size={12} /> {freelancer.languages.join(', ')}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {freelancer.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="bg-gray-50 text-gray-800 border border-gray-200 px-2 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              {activeJob && match && (
                <div className={`mt-auto mb-6 p-4 border text-sm ${match.score > 80 ? 'bg-gray-50 border-black' : 'bg-white border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold flex items-center gap-2 text-black"><Sparkles size={12}/> AI Match</span>
                    <span className="font-mono font-bold text-black">{match.score}%</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mt-2">{match.reasoning}</p>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between pt-2">
                <div>
                   <span className="text-lg font-bold text-black">₹{freelancer.hourlyRate}</span>
                   <span className="text-xs text-gray-500">/hr</span>
                </div>
                <Button size="sm" variant="outline" className="hover:bg-black hover:text-white transition-colors" onClick={() => onHire(freelancer)}>
                  Hire Now
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FreelancerDiscovery;