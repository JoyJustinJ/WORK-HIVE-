import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    Download,
    Clock,
    CheckCircle,
    AlertCircle,
    CreditCard,
    Landmark,
    ShieldCheck,
    MoreHorizontal,
    Plus,
    X,
    Smartphone,
    Building2,
    FileText
} from 'lucide-react';
import { UserRole } from '../types';

interface PaymentsPageProps {
    userRole: UserRole;
}

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    status: 'completed' | 'pending' | 'failed';
    method: string;
}

const MOCK_TRANSACTIONS_CLIENT: Transaction[] = [
    { id: 'TX-8921', date: 'Oct 24, 2024', description: 'Escrow Deposit: E-commerce Project', amount: 50000, type: 'debit', status: 'completed', method: 'UPI' },
    { id: 'TX-8920', date: 'Oct 20, 2024', description: 'Milestone Release: UI Design', amount: 15000, type: 'debit', status: 'completed', method: 'Escrow' },
    { id: 'TX-8918', date: 'Oct 15, 2024', description: 'Refund: Cancelled Contract', amount: 5000, type: 'credit', status: 'completed', method: 'Wallet' },
];

const MOCK_TRANSACTIONS_FREELANCER: Transaction[] = [
    { id: 'TX-7721', date: 'Oct 22, 2024', description: 'Payment Received: Frontend Setup', amount: 45000, type: 'credit', status: 'pending', method: 'Escrow' },
    { id: 'TX-7719', date: 'Oct 18, 2024', description: 'Withdrawal to HDFC Bank ****1234', amount: 12000, type: 'debit', status: 'completed', method: 'Bank Transfer' },
    { id: 'TX-7715', date: 'Oct 10, 2024', description: 'Payment Received: Consultation', amount: 5000, type: 'credit', status: 'completed', method: 'Escrow' },
];

const PaymentsPage: React.FC<PaymentsPageProps> = ({ userRole }) => {
    const isClient = userRole === 'client';
    const transactions = isClient ? MOCK_TRANSACTIONS_CLIENT : MOCK_TRANSACTIONS_FREELANCER;

    const [activeTab, setActiveTab] = useState<'history' | 'methods' | 'settings'>('history');

    // Modal States
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [amountInput, setAmountInput] = useState('');

    // Form States (for Gateway Integration)
    const [kycData, setKycData] = useState({
        legalName: '',
        taxId: '', // PAN or GSTIN
        addressLine1: '',
        city: '',
        postalCode: '',
        country: 'India'
    });

    const [bankData, setBankData] = useState({
        accountName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: ''
    });

    // Render Methods Tab (Add Card / Bank)
    const renderMethodsTab = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in">
            {/* Saved Methods */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display mb-4">
                    {isClient ? 'Payment Sources' : 'Payout Methods'}
                </h3>

                {/* Mock Existing Card */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between group hover:border-white/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-zinc-800 rounded flex items-center justify-center border border-white/10">
                            <CreditCard size={16} className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">HDFC Bank Debit</p>
                            <p className="text-xs text-gray-500">•••• 4242 • Exp 12/28</p>
                        </div>
                    </div>
                    <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-500/20 rounded">Primary</div>
                </div>

                {/* Add New Method Button */}
                <button className="w-full p-4 border border-dashed border-white/20 rounded-lg flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all group">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <Plus size={14} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">Add {isClient ? 'Card or UPI' : 'Bank Account'}</span>
                </button>
            </div>

            {/* Input Form for New Method (Visual Only) */}
            <Card>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display mb-6">
                    Add New {isClient ? 'Payment Method' : 'Withdrawal Account'}
                </h3>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    {isClient ? (
                        <>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Card Number</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors font-mono" />
                            </div>
                            <div className="flex gap-4">
                                <div className="space-y-1 flex-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors font-mono" />
                                </div>
                                <div className="space-y-1 flex-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CVC</label>
                                    <input type="text" placeholder="123" className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors font-mono" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Name on Card</label>
                                <input type="text" placeholder="JOHN DOE" className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Account Holder Name</label>
                                <input
                                    type="text"
                                    value={bankData.accountName}
                                    onChange={(e) => setBankData({ ...bankData, accountName: e.target.value })}
                                    placeholder="AS PER PASSBOOK"
                                    className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Account Number</label>
                                <input
                                    type="text"
                                    value={bankData.accountNumber}
                                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                                    placeholder="0000000000"
                                    className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors font-mono"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">IFSC Code</label>
                                <input
                                    type="text"
                                    value={bankData.ifscCode}
                                    onChange={(e) => setBankData({ ...bankData, ifscCode: e.target.value })}
                                    placeholder="HDFC0001234"
                                    className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors font-mono uppercase"
                                />
                            </div>
                        </>
                    )}

                    <Button fullWidth className="mt-4 uppercase tracking-widest text-xs font-bold">
                        Save Securely
                    </Button>
                </form>
            </Card>
        </div>
    );

    // Render Settings Tab (KYC / Tax)
    const renderSettingsTab = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in">
            <Card>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <FileText className="text-blue-400" size={24} />
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display">
                            {isClient ? 'Billing Information' : 'Tax & KYC Details'}
                        </h3>
                        <p className="text-xs text-gray-500">Required for {isClient ? 'invoices' : 'payouts'}</p>
                    </div>
                </div>

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Legal Name / Entity</label>
                        <input
                            type="text"
                            value={kycData.legalName}
                            onChange={(e) => setKycData({ ...kycData, legalName: e.target.value })}
                            className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{isClient ? 'GSTIN (Optional)' : 'PAN Card Number'}</label>
                        <input
                            type="text"
                            value={kycData.taxId}
                            onChange={(e) => setKycData({ ...kycData, taxId: e.target.value })}
                            className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors uppercase"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Billing Address</label>
                        <textarea
                            value={kycData.addressLine1}
                            onChange={(e) => setKycData({ ...kycData, addressLine1: e.target.value })}
                            className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm text-white outline-none focus:border-white/40 transition-colors h-24 resize-none"
                        ></textarea>
                    </div>

                    <Button variant="secondary" fullWidth className="mt-2 text-xs uppercase tracking-widest">Update Information</Button>
                </form>
            </Card>

            {/* Verification Status */}
            <div className="space-y-6">
                <Card className="border-green-500/20 bg-green-900/5">
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="text-green-400 shrink-0" size={24} />
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display mb-1">Identity Verified</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Your account has cleared Level 2 KYC. You can withdraw up to ₹5,00,000 per month without additional documentation.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start gap-4">
                        <Building2 className="text-gray-400 shrink-0" size={24} />
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-display mb-1">Tax Documents</h3>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-sm">
                                    <span className="text-xs text-gray-300">Form 16A (FY 2023-24)</span>
                                    <Download size={14} className="text-gray-500 cursor-pointer hover:text-white" />
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-sm">
                                    <span className="text-xs text-gray-300">Monthly Invoices (Zip)</span>
                                    <Download size={14} className="text-gray-500 cursor-pointer hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative">

            {/* Deposit/Withdraw Modal Overlay */}
            {(showDepositModal || showWithdrawModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-xl shadow-2xl relative overflow-hidden">
                        <button
                            onClick={() => { setShowDepositModal(false); setShowWithdrawModal(false); }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            <h3 className="text-xl font-bold text-white font-display uppercase tracking-widest mb-6 text-center">
                                {showDepositModal ? 'Add Funds to Escrow' : 'Withdraw Earnings'}
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Amount (INR)</label>
                                    <div className="relative mt-2">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                                        <input
                                            type="number"
                                            value={amountInput}
                                            onChange={(e) => setAmountInput(e.target.value)}
                                            className="w-full bg-black border border-white/20 p-4 pl-8 rounded-sm text-2xl font-bold text-white outline-none focus:border-white transition-colors font-display"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                                        {showDepositModal ? 'Payment Method' : 'Destination Account'}
                                    </label>
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between cursor-pointer hover:bg-white/10">
                                        <div className="flex items-center gap-3">
                                            {showDepositModal ? <Smartphone size={18} className="text-white" /> : <Landmark size={18} className="text-white" />}
                                            <div>
                                                <p className="text-sm font-bold text-white">{showDepositModal ? 'UPI (GooglePay/PhonePe)' : 'HDFC Bank ****1234'}</p>
                                                <p className="text-[10px] text-gray-500">{showDepositModal ? 'Instant Deposit' : 'Processing: 2-4 Hours'}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-blue-400 font-bold uppercase">Change</span>
                                    </div>
                                </div>

                                {showDepositModal && (
                                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-sm text-xs text-blue-200 flex items-start gap-2">
                                        <ShieldCheck size={14} className="shrink-0 mt-0.5" />
                                        <p>Funds are held in a secure escrow vault until you approve the work. We do not release funds without your consent.</p>
                                    </div>
                                )}

                                <Button fullWidth size="lg" className="shadow-glow-sm" onClick={() => {
                                    if (showDepositModal) {
                                        const amount = parseFloat(amountInput);
                                        if (!amount || isNaN(amount)) {
                                            alert("Please enter a valid amount");
                                            return;
                                        }

                                        import('../services/razorpayService').then(({ openPaymentModal }) => {
                                            openPaymentModal(
                                                amount,
                                                null,
                                                (paymentId) => {
                                                    alert(`Payment Successful! REF: ${paymentId}`);
                                                    setShowDepositModal(false);
                                                    // Ideally update balance state here
                                                },
                                                (error) => {
                                                    console.error("Payment Error", error);
                                                    alert("Payment Failed");
                                                }
                                            );
                                        });
                                    } else {
                                        alert("Withdrawal Request Submitted");
                                        setShowWithdrawModal(false);
                                    }
                                }}>
                                    {showDepositModal ? 'Proceed to Pay' : 'Request Withdrawal'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-wider text-white font-display uppercase flex items-center gap-3">
                        <Wallet className="text-white" size={32} />
                        {isClient ? 'Financial Center' : 'Earnings & Wallet'}
                    </h2>
                    <p className="text-sm text-gray-400 mt-2">
                        {isClient
                            ? 'Manage your escrow deposits, invoices, and payment methods.'
                            : 'Track your income, manage withdrawals, and view tax documents.'}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="text-xs uppercase tracking-widest font-bold">
                        <Download size={14} className="mr-2" /> Statements
                    </Button>
                    <Button
                        onClick={() => isClient ? setShowDepositModal(true) : setShowWithdrawModal(true)}
                        className="text-xs uppercase tracking-widest font-bold shadow-glow-sm"
                    >
                        {isClient ? '+ Add Funds' : 'Withdraw Funds'}
                    </Button>
                </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Balance Card */}
                <Card className="col-span-1 md:col-span-2 relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border-white/20">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
                                    {isClient ? 'Escrow Vault Balance' : 'Available for Withdrawal'}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold font-display text-white">₹{isClient ? '65,000' : '28,400'}</span>
                                    <span className="text-sm text-gray-500">.00</span>
                                </div>
                            </div>
                            <div className="p-3 bg-white/10 rounded-full border border-white/10">
                                <ShieldCheck className="text-green-400" size={24} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 bg-black/40 border border-white/10 p-4 rounded-lg">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Pending Clearance</p>
                                <p className="text-lg font-bold text-white">₹{isClient ? '15,000' : '45,000'}</p>
                            </div>
                            <div className="flex-1 bg-black/40 border border-white/10 p-4 rounded-lg">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{isClient ? 'Total Spent' : 'Lifetime Earnings'}</p>
                                <p className="text-lg font-bold text-white">₹{isClient ? '4,50,000' : '8,24,000'}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Payment Methods Card Summary */}
                <Card className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Active Methods</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-sm">
                                <div className="w-10 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-white italic">VISA</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-white">HDFC Bank •••• 4242</p>
                                    <p className="text-[10px] text-gray-500">Primary</p>
                                </div>
                                <MoreHorizontal size={14} className="text-gray-500" />
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-sm">
                                <div className="w-10 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-sm flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-white">UPI</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-white">workhive@okhdfc</p>
                                    <p className="text-[10px] text-gray-500">Instant</p>
                                </div>
                                <MoreHorizontal size={14} className="text-gray-500" />
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" fullWidth className="mt-4 uppercase text-[10px] tracking-widest" onClick={() => setActiveTab('methods')}>Manage Methods</Button>
                </Card>
            </div>

            {/* Main Content Area */}
            <Card noPadding className="min-h-[400px]">
                <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center bg-black/40 gap-4">
                    <h3 className="font-bold text-white font-display tracking-wide uppercase">
                        {activeTab === 'history' ? 'Transaction History' : activeTab === 'methods' ? 'Manage Methods' : 'Settings & KYC'}
                    </h3>
                    <div className="flex gap-2 bg-black p-1 rounded-md border border-white/10">
                        {['history', 'methods', 'settings'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-all ${activeTab === tab ? 'bg-white text-black shadow-glow-sm' : 'text-gray-500 hover:text-white'}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-0">
                    {activeTab === 'history' && (
                        <>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5 text-[10px] text-gray-500 uppercase tracking-widest">
                                        <th className="p-4 font-bold">Transaction ID</th>
                                        <th className="p-4 font-bold">Description</th>
                                        <th className="p-4 font-bold">Date</th>
                                        <th className="p-4 font-bold">Amount</th>
                                        <th className="p-4 font-bold">Status</th>
                                        <th className="p-4 font-bold text-right">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="p-4 font-mono text-xs text-gray-500">{tx.id}</td>
                                            <td className="p-4 font-medium text-white flex items-center gap-2">
                                                {tx.type === 'credit'
                                                    ? <ArrowDownLeft size={14} className="text-green-500" />
                                                    : <ArrowUpRight size={14} className="text-red-400" />
                                                }
                                                {tx.description}
                                            </td>
                                            <td className="p-4 text-gray-400">{tx.date}</td>
                                            <td className={`p-4 font-bold font-display ${tx.type === 'credit' ? 'text-green-400' : 'text-white'}`}>
                                                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                            </td>
                                            <td className="p-4">
                                                {tx.status === 'completed' && <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-green-500/10 text-green-400 border border-green-500/20"><CheckCircle size={10} /> Paid</span>}
                                                {tx.status === 'pending' && <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"><Clock size={10} /> Pending</span>}
                                                {tx.status === 'failed' && <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-red-500/10 text-red-400 border border-red-500/20"><AlertCircle size={10} /> Failed</span>}
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-500 hover:text-white transition-colors">
                                                    <Download size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 border-t border-white/10 text-center">
                                <button className="text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-colors">Load More Transactions</button>
                            </div>
                        </>
                    )}

                    {activeTab === 'methods' && (
                        <div className="p-6 md:p-8">
                            {renderMethodsTab()}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="p-6 md:p-8">
                            {renderSettingsTab()}
                        </div>
                    )}
                </div>
            </Card>

        </div>
    );
};

export default PaymentsPage;