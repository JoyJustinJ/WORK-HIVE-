import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import {
    HelpCircle,
    Mail,
    MessageSquare,
    Phone,
    ChevronDown,
    ChevronUp,
    Send,
    FileText,
    AlertCircle
} from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
}

const FAQS: FaqItem[] = [
    {
        question: "How does the Escrow payment system work?",
        answer: "When you hire a freelancer, the agreed amount is deposited into a secure neutral vault (Escrow). The funds are kept safe until the work is completed and approved by you. Once approved, the funds are released to the freelancer."
    },
    {
        question: "What are the service fees?",
        answer: "Work Hive charges a flat 5% service fee on all completed contracts. There are no hidden charges for posting jobs or creating profiles."
    },
    {
        question: "How do I withdraw my earnings?",
        answer: "Go to the 'Payments' section in your dashboard. Click on 'Withdraw Funds', enter the amount, and select your linked bank account. Withdrawals are processed within 24 hours."
    },
    {
        question: "Can I cancel a contract?",
        answer: "Yes, contracts can be cancelled by mutual agreement. If there is a dispute, our support team will intervene to mediate a fair resolution based on the work completed."
    }
];

const SupportPage: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    const [contactForm, setContactForm] = useState({
        subject: '',
        message: '',
        priority: 'medium'
    });

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Support ticket created! We will get back to you shortly.");
        setContactForm({ subject: '', message: '', priority: 'medium' });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-wider text-white font-display uppercase flex items-center gap-3">
                    <HelpCircle className="text-white" size={32} />
                    Help & Support
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                    Find answers to common questions or get in touch with our dedicated support team.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: FAQs */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <h3 className="text-lg font-bold text-white font-display uppercase tracking-widest mb-6 flex items-center gap-2">
                            <FileText size={20} className="text-blue-400" />
                            Frequently Asked Questions
                        </h3>
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => (
                                <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                                    >
                                        <span className="text-sm font-bold text-white max-w-[90%]">{faq.question}</span>
                                        {openFaqIndex === index ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                    </button>
                                    {openFaqIndex === index && (
                                        <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Contact Form */}
                    <Card>
                        <h3 className="text-lg font-bold text-white font-display uppercase tracking-widest mb-6 flex items-center gap-2">
                            <MessageSquare size={20} className="text-green-400" />
                            Send us a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={contactForm.subject}
                                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                        placeholder="Brief description of issue"
                                        className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Priority</label>
                                    <select
                                        value={contactForm.priority}
                                        onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                                        className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors"
                                    >
                                        <option value="low">Low - General Inquiry</option>
                                        <option value="medium">Medium - Functional Issue</option>
                                        <option value="high">High - Critical / Payment Issue</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    placeholder="Describe your issue in detail..."
                                    className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors resize-none"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <Button className="shadow-glow-sm flex items-center gap-2">
                                    <Send size={16} />
                                    Submit Ticket
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Contact Info */}
                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-blue-900/20 to-black border-blue-500/20">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20">
                                <Phone size={24} className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">24/7 Helpline</h3>
                                <p className="text-xs text-gray-400 mt-1">For urgent payment issues</p>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white font-mono">+91 1800-WORK-HIVE</p>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-900/20 to-black border-green-500/20">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-green-500/10 rounded-full border border-green-500/20">
                                <Mail size={24} className="text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">Email Support</h3>
                                <p className="text-xs text-gray-400 mt-1">Response within 4 hours</p>
                            </div>
                        </div>
                        <a href="mailto:support@workhive.com" className="text-lg font-bold text-white hover:text-green-400 transition-colors">support@workhive.com</a>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-2 mb-4 text-orange-400">
                            <AlertCircle size={20} />
                            <h3 className="text-sm font-bold uppercase tracking-widest font-display">Safety Tips</h3>
                        </div>
                        <ul className="space-y-3">
                            <li className="text-xs text-gray-400 flex items-start gap-2">
                                <span className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></span>
                                Always keep communication within Work Hive.
                            </li>
                            <li className="text-xs text-gray-400 flex items-start gap-2">
                                <span className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></span>
                                Never share your password or OTP.
                            </li>
                            <li className="text-xs text-gray-400 flex items-start gap-2">
                                <span className="w-1 h-1 bg-white rounded-full mt-1.5 shrink-0"></span>
                                Avoid direct bank transfers outside Escrow.
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
