// --- Client Component Logic ---
// (Can be moved to its own file: src/components/SubscriptionFormLoader.tsx)
'use client';

import { useState, useEffect, FormEvent } from 'react'; // Added FormEvent
import Link from 'next/link';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';

let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = () => {
  if (!stripePromise) {
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) { console.error("Stripe key missing!"); return null; }
      stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SubscriptionFormLoader() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam === 'SubscriptionRequired' || errorParam === 'nosub') {
            setError('A subscription is required before signing up. Please subscribe below.');
        }
         const cancelledParam = searchParams.get('cancelled');
         if(cancelledParam === 'true') {
            setError('Subscription process was cancelled. Please try again.');
         }
    }, [searchParams]);

    const handleSubscribe = async (e: FormEvent) => { // Use FormEvent
        e.preventDefault();
        setLoading(true);
        setError('');
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.'); setLoading(false); return;
        }
        try {
            // Call public checkout API
            const res = await fetch('/api/stripe/create-public-checkout', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed checkout creation.');

            const stripe = await getStripe();
            if (!stripe) throw new Error('Stripe.js failed.');

            const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
            if (stripeError) throw stripeError; // This error happens if redirect fails immediately
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'An error occurred.');
            } else {
                setError('An unexpected error occurred.');
            }
            setLoading(false);
        }
        // Don't setLoading(false) on success because user navigates away
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Subscribe to AI Gardener</h1>
                <p className="text-center text-gray-600 text-sm">
                    Please subscribe first to enable account creation and access the AI assistant.
                </p>
                 {error && ( <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p> )}
                <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Enter your email address" disabled={loading}/>
                    </div>
                    <div>
                        <button type="submit" disabled={loading || !email.includes('@')} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? 'Processing...' : 'Proceed to Subscription'}
                        </button>
                    </div>
                </form>
                 <p className="text-center text-xs text-gray-500 pt-4">
                    Already subscribed? <Link href="/auth/signin" className="font-medium text-green-600 hover:text-green-500">Sign In Here</Link>
                 </p>
             </div>
        </div>
    );
}

export default SubscriptionFormLoader;