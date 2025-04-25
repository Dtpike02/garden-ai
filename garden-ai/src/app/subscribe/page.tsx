// Example: src/app/subscribe/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation'; // To read query params
import { signIn} from 'next-auth/react';

export const dynamic = 'force-dynamic';
// Make sure to set this in your .env.local (or .env)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const handleSignIn = () => {
    // Standard sign-in, redirect to /ask on success
    signIn('google', { callbackUrl: '/ask' });
  };
export default function SubscribePage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const searchParams = useSearchParams(); // Hook to read query parameters

    useEffect(() => {
        // Check for error message from redirect
        if (searchParams.get('error') === 'SubscriptionRequired') {
            setError('You must subscribe before signing up or logging in.');
        }
         if (searchParams.get('error') === 'nosub') { // Alternative error code example
            setError('Subscription not found. Please subscribe to continue.');
        }
    }, [searchParams]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        try {
            // Call your NEW public checkout API endpoint
            const res = await fetch('/api/stripe/create-public-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create checkout session.');
            }

            // Redirect to Stripe Checkout
            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Stripe.js failed to load.');
            }
            const { error: stripeError } = await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });

            if (stripeError) {
                console.error("Stripe redirection error:", stripeError);
                setError(stripeError.message || 'Failed to redirect to Stripe.');
            }
            // If redirectToCheckout fails, setLoading might need to be reset here.
            // If it succeeds, the user navigates away, so no need to reset.

        } catch (err: unknown) {
            console.error("Subscription initiation error:", err);
            if (err instanceof Error) {
                setError(err.message || 'An unexpected error occurred.');
            } else {
                setError('An unexpected error occurred.');
            }
            setLoading(false); // Reset loading on error
        }
        // Don't reset loading here if redirect happens
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Subscribe to AI Gardener</h1>
                <p className="text-center text-gray-600">
                    Please subscribe first to enable account creation and access the AI assistant.
                </p>

                 {error && (
                     <p className="text-center text-red-600 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>
                 )}

                <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading || !email.includes('@')}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Proceed to Subscription'}
                        </button>
                    </div>
                </form>
                 <p className="text-center text-xs text-gray-500">
                    Already subscribed? <a onClick={handleSignIn} className="font-medium text-green-600 hover:text-green-500">Sign In</a>
                </p>
             </div>
        </div>
    );
}