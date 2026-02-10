import { UserProfile } from '../types';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id?: string; // Optional for now, usually generated on backend
    handler: (response: any) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: any;
    theme?: {
        color: string;
    };
}

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SEKkMHqMt7zKtK";

export const openPaymentModal = (
    amount: number,
    userProfile: UserProfile | null,
    onSuccess: (paymentId: string) => void,
    onFailure: (error: any) => void
) => {
    return new Promise((resolve, reject) => {
        const options: RazorpayOptions = {
            key: RAZORPAY_KEY_ID,
            amount: amount * 100, // Razorpay takes amount in paisa
            currency: 'INR',
            name: 'Work Hive',
            description: 'Escrow Deposit / Wallet Load',
            image: 'https://cdn-icons-png.flaticon.com/512/2618/2618522.png', // Hexagon icon placeholder
            handler: function (response: any) {
                console.log('Payment Successful:', response);
                onSuccess(response.razorpay_payment_id);
                resolve(response);
            },
            prefill: {
                name: userProfile?.displayName || '',
                email: userProfile?.email || '',
                contact: '' // Can be added if phone number is available
            },
            theme: {
                color: '#FACC15' // Amber Gold to match theme
            }
        };

        try {
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                console.error('Payment Failed:', response.error);
                onFailure(response.error);
                reject(response.error);
            });
            rzp1.open();
        } catch (error) {
            console.error('Razorpay SDK not loaded or error initializing:', error);
            onFailure(error);
            reject(error);
        }
    });
};
