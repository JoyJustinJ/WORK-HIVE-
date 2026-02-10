import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { Lock, CheckCircle, RefreshCw, Smartphone, ShieldCheck } from 'lucide-react';

interface EscrowProps {
  amount: number;
  freelancerName: string;
  onComplete: () => void;
}

const EscrowPaymentCard: React.FC<EscrowProps> = ({ amount, freelancerName, onComplete }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'processing' | 'success'>('idle');

  const startPayment = () => {
    setStatus('scanning'); // Show scanning/processing UI briefly or directly open modal

    // For better UX, we can show "Processing" while opening the modal or just open it.
    // Let's switch to 'processing' to indicate activity.
    setStatus('processing');

    // We need user profile for prefill but it's not passed here. 
    // For now we pass null or update props. 
    // To avoid breaking changes, let's pass null and rely on user entering details if needed, 
    // or assume the user is logged in context (which is not directly accessible here without hook).
    // Ideally validation happens before this component is rendered.

    import('../services/razorpayService').then(({ openPaymentModal }) => {
      openPaymentModal(
        amount,
        null, // We might want to pass user details via props if strictly needed for prefill
        (paymentId) => {
          console.log("Payment completed:", paymentId);
          setStatus('success');
          setTimeout(() => onComplete(), 2000);
        },
        (error) => {
          console.error("Payment failed:", error);
          setStatus('idle'); // Reset to idle on failure
          alert("Payment failed. Please try again.");
        }
      ).catch(err => {
        console.error("Failed to load Razorpay service", err);
        setStatus('idle');
      });
    });
  };

  return (
    <Card className="max-w-md mx-auto relative overflow-hidden border-2 border-black" noPadding>
      <div className="bg-black text-white p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck size={28} />
          <div>
            <h3 className="text-lg font-bold">Secure Vault</h3>
            <p className="text-xs text-gray-400">Powered by Work Hive Escrow</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">Total Deposit Amount</p>
          <p className="text-4xl font-bold text-black">₹{amount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">Beneficiary: {freelancerName}</p>
        </div>

        {status === 'idle' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 border border-gray-200 text-center">
              <p className="text-sm text-gray-800">
                Funds are held in a <strong>neutral vault</strong> and only released upon your approval of the work.
              </p>
            </div>
            <Button fullWidth onClick={startPayment} size="lg">
              Pay via UPI
            </Button>
          </div>
        )}

        {status === 'scanning' && (
          <div className="flex flex-col items-center justify-center py-4 space-y-6 animate-in fade-in">
            <div className="w-48 h-48 bg-white border-2 border-black p-2 flex items-center justify-center relative">
              {/* Simulating a QR Code */}
              <div className="grid grid-cols-6 gap-1 w-full h-full">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className={`w-full h-full ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`}></div>
                ))}
              </div>
              <div className="absolute inset-0 border-4 border-black/10 animate-pulse"></div>
            </div>
            <p className="text-sm font-bold animate-pulse">Scan with any UPI App</p>
          </div>
        )}

        {status === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <RefreshCw size={48} className="text-black animate-spin" />
            <p className="text-black font-medium">Verifying Transaction...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white">
              <CheckCircle size={32} />
            </div>
            <p className="text-xl font-bold text-black">Deposit Confirmed</p>
            <p className="text-sm text-gray-500">Redirecting to contract...</p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
          <Lock size={10} />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>
    </Card>
  );
};

export default EscrowPaymentCard;