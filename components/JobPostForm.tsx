import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { ArrowRight, Check, MapPin, IndianRupee, FileText, Cpu, Briefcase } from 'lucide-react';
import { Job } from '../types';

interface JobPostFormProps {
  onSubmit: (job: Job) => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    description: '',
    budget: 0,
    location: '',
    skillsRequired: []
  });

  const [skillInput, setSkillInput] = useState('');

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const addSkill = () => {
    if (skillInput && !formData.skillsRequired?.includes(skillInput)) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...(prev.skillsRequired || []), skillInput]
      }));
      setSkillInput('');
    }
  };

  const handleSubmit = () => {
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || 'Untitled',
      description: formData.description || '',
      budget: formData.budget || 0,
      skillsRequired: formData.skillsRequired || [],
      location: formData.location || 'Remote'
    };
    onSubmit(newJob);
  };

  return (
    <Card className="max-w-3xl mx-auto border-white/10 bg-black/60 shadow-glow-sm">
      <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white font-display tracking-wider uppercase">Initialize Protocol</h2>
          <p className="text-xs text-gray-500 tracking-widest mt-1">Create New Job Contract</p>
        </div>
        <div className="flex items-center gap-2">
           {[1, 2, 3].map(i => (
             <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= i ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-white/10'}`}></div>
           ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Operation Title</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-500 group-focus-within:text-white transition-colors" />
              </div>
              <input 
                type="text" 
                className="w-full pl-10 p-4 bg-black/50 border border-white/10 rounded-sm focus:border-white focus:ring-1 focus:ring-white/20 outline-none text-white placeholder-gray-600 transition-all font-sans"
                placeholder="e.g., React Developer for E-commerce Site"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Scope Description</label>
            <textarea 
              className="w-full p-4 bg-black/50 border border-white/10 rounded-sm focus:border-white focus:ring-1 focus:ring-white/20 outline-none h-40 text-white placeholder-gray-600 transition-all resize-none font-sans"
              placeholder="Describe the project scope, deliverables, and expectations..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleNext} disabled={!formData.title} className="uppercase tracking-widest text-xs font-bold">
              Next Phase <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Required Capabilities</label>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1 group">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Cpu className="h-5 w-5 text-gray-500 group-focus-within:text-white transition-colors" />
                 </div>
                 <input 
                  type="text" 
                  className="w-full pl-10 p-3 bg-black/50 border border-white/10 rounded-sm focus:border-white outline-none text-white placeholder-gray-600 transition-all"
                  placeholder="Add a skill (e.g. React, Node.js)"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSkill()}
                />
              </div>
              <Button type="button" onClick={addSkill} variant="secondary" className="uppercase tracking-widest text-xs font-bold">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {formData.skillsRequired?.map(skill => (
                <span key={skill} className="bg-white/5 border border-white/20 text-white px-3 py-1.5 rounded-sm text-xs flex items-center gap-2 hover:bg-white/10 transition-colors uppercase tracking-wider">
                  {skill}
                </span>
              ))}
              {formData.skillsRequired?.length === 0 && (
                 <span className="text-gray-600 text-sm italic">No skills added yet.</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Geographic Parameters</label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="text" 
                className="w-full pl-10 p-3 bg-black/50 border border-white/10 rounded-sm focus:border-white outline-none text-white placeholder-gray-600 transition-all"
                placeholder="e.g. Mumbai, Remote, Hybrid"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-between pt-6 border-t border-white/5">
            <Button variant="outline" onClick={handleBack} className="uppercase tracking-widest text-xs font-bold">Back</Button>
            <Button onClick={handleNext} className="uppercase tracking-widest text-xs font-bold">Next Phase <ArrowRight size={14} /></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
           <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Budget Allocation (INR)</label>
            <div className="relative group">
              <IndianRupee className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="number" 
                className="w-full pl-10 p-3 bg-black/50 border border-white/10 rounded-sm focus:border-white outline-none text-white placeholder-gray-600 transition-all font-display tracking-wider"
                placeholder="50000"
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
             <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs border-b border-white/10 pb-2 flex items-center gap-2">
                <Briefcase size={14} /> Contract Summary
             </h4>
             <ul className="space-y-3 text-sm text-gray-400">
               <li className="flex justify-between"><span className="uppercase text-[10px] tracking-widest">Title</span> <span className="text-white font-medium">{formData.title}</span></li>
               <li className="flex justify-between"><span className="uppercase text-[10px] tracking-widest">Skills</span> <span className="text-white text-right w-1/2 truncate">{formData.skillsRequired?.join(', ')}</span></li>
               <li className="flex justify-between"><span className="uppercase text-[10px] tracking-widest">Location</span> <span className="text-white">{formData.location}</span></li>
               <li className="flex justify-between items-center"><span className="uppercase text-[10px] tracking-widest">Budget</span> <span className="text-white font-display font-bold text-lg">₹{formData.budget?.toLocaleString()}</span></li>
             </ul>
          </div>

          <div className="flex justify-between pt-6 border-t border-white/5">
            <Button variant="outline" onClick={handleBack} className="uppercase tracking-widest text-xs font-bold">Back</Button>
            <Button onClick={handleSubmit} className="uppercase tracking-widest text-xs font-bold shadow-glow-sm">Deploy Contract <Check size={14} /></Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default JobPostForm;