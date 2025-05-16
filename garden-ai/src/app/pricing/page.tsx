// src/app/pricing/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import Header from '@/components/Header'; // Adjust path if needed
import Head from 'next/head';

let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error('Stripe publishable key is not set in .env.local!');
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export default function PricingPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null); // Store Price ID of loading button
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    // Get Price IDs from environment variables
    // Ensure these are prefixed with NEXT_PUBLIC_ in your .env.local
    const sproutTrialPriceId = process.env.NEXT_PUBLIC_STRIPE_BLOOM_PLAN_PRICE_ID!; // Trial uses Bloom's Price ID
    const bloomPlanPriceId = process.env.NEXT_PUBLIC_STRIPE_BLOOM_PLAN_PRICE_ID!;
    const fullBloomPlanPriceId = process.env.NEXT_PUBLIC_STRIPE_FULL_BLOOM_PLAN_PRICE_ID!;

    useEffect(() => {
        // Preload Stripe.js
        getStripe();
    }, []);

    const handleSubscription = async (priceId: string, isTrial: boolean = false) => {
        if (status === 'unauthenticated') {
            signIn('google', { callbackUrl: '/pricing' }); // Redirect to sign-in, then back to pricing
            return;
        }
        if (status === 'loading' || !session?.user) {
            setError('Authenticating... please wait.');
            return;
        }

        setIsLoading(priceId);
        setError(null);

        try {
            const res = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId, isTrial }),
            });

            const data = await res.json();

            if (!res.ok || !data.sessionId) {
                throw new Error(data.error || 'Failed to create checkout session.');
            }

            const stripe = await getStripe();
            if (!stripe) {
                throw new Error('Stripe.js failed to load.');
            }

            const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
            
            if (stripeError) {
                console.error("Stripe redirect error:", stripeError);
                setError(stripeError.message || 'Could not redirect to Stripe.');
                setIsLoading(null); // Clear loading state on redirect error
            }
            // If redirectToCheckout is successful, the user is navigated away,
            // so setIsLoading(null) might not be hit here unless there's an immediate failure.
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(message);
            console.error("Subscription process error:", message);
            setIsLoading(null);
        }
    };

    if (status === "loading") {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <p className="text-gray-600 animate-pulse">Loading plans...</p>
                </main>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Pricing Plans | GardenAI</title>
                <meta name="description" content="Choose the perfect GardenAI plan to help your garden thrive. Free trial available!" />
            </Head>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-grow">
                    {/* Pricing Section */}
                    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                                    Find the Perfect Plan for Your Flourishing Garden
                                </h1>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Unlock expert AI gardening advice, personalized care plans, and more to help your plants thrive.
                                </p>
                            </div>

                            {error && (
                                <div className="mb-8 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md text-center">
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {/* Tier 1: Sprout Plan (Free Trial) */}
                                <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-green-200">
                                    <h3 className="text-2xl font-semibold text-green-700 mb-2">Sprout Plan</h3>
                                    <p className="text-4xl font-bold text-gray-800 mb-4">
                                        $0 <span className="text-lg font-normal text-gray-500">/ 7-Day Trial</span>
                                    </p>
                                    <ul className="text-left space-y-3 text-gray-600 mb-8 flex-grow">
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Access to AI for 5 questions
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Basic plant problem diagnosis
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            General care tips
                                        </li>
                                    </ul>
                                    <button
                                        onClick={() => handleSubscription(sproutTrialPriceId, true)}
                                        disabled={isLoading === sproutTrialPriceId}
                                        className="mt-auto w-full bg-gray-200 text-green-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isLoading === sproutTrialPriceId ? 'Processing...' : 'Start Your Free Trial'}
                                    </button>
                                </div>

                                {/* Tier 2: Bloom Plan (Premium) - Highlighted */}
                                <div className="bg-green-600 text-white rounded-xl shadow-2xl p-8 flex flex-col ring-4 ring-green-400 transform scale-100 md:scale-105 relative">
                                    <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg -mt-0.5 -mr-0.5">Recommended</span>
                                    <h3 className="text-2xl font-semibold mb-2">Bloom Plan</h3>
                                    <p className="text-4xl font-bold mb-4">$9.99 <span className="text-lg font-normal opacity-80">/ month</span></p>
                                    <ul className="text-left space-y-3 opacity-90 mb-8 flex-grow">
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Unlimited AI gardening questions
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Advanced plant problem diagnosis
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Personalized care plans
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Priority support
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Save your plant profiles
                                        </li>
                                    </ul>
                                    <button
                                        onClick={() => handleSubscription(bloomPlanPriceId)}
                                        disabled={isLoading === bloomPlanPriceId}
                                        className="mt-auto w-full bg-yellow-400 text-green-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isLoading === bloomPlanPriceId ? 'Processing...' : 'Subscribe to Bloom'}
                                    </button>
                                </div>

                                {/* Tier 3: Full Bloom Plan (Annual) */}
                                <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-green-200">
                                    <h3 className="text-2xl font-semibold text-green-700 mb-2">Full Bloom Plan</h3>
                                    <p className="text-4xl font-bold text-gray-800 mb-1">$99.99 <span className="text-lg font-normal text-gray-500">/ year</span></p>
                                    <p className="text-sm text-green-600 font-semibold mb-4">(Save 20%)</p>
                                    <ul className="text-left space-y-3 text-gray-600 mb-8 flex-grow">
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            All Bloom Plan features
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            Best value for year-round support
                                        </li>
                                    </ul>
                                    <button
                                        onClick={() => handleSubscription(fullBloomPlanPriceId)}
                                        disabled={isLoading === fullBloomPlanPriceId}
                                        className="mt-auto w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isLoading === fullBloomPlanPriceId ? 'Processing...' : 'Go Full Bloom & Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* You can add the Testimonials, Blog Teaser, and Why GardenAI sections here as well */}
                    {/* For example: */}
                    {/* <TestimonialsSection /> */}
                    {/* <BlogTeaserSection /> */}
                    {/* <WhyGardenAISection /> */}

                </main>
                <footer className="flex-shrink-0 bg-gray-800 text-gray-400 py-6 text-center text-sm">
                    <div className="container mx-auto px-6">
                        &copy; {new Date().getFullYear()} Garden AI. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}

// You would also create components for TestimonialsSection, BlogTeaserSection, WhyGardenAISection
// and import them here if you want to include them on the same /pricing page.
// Example:
// const TestimonialsSection = () => <section>...</section>;
// const BlogTeaserSection = () => <section>...</section>;
// const WhyGardenAISection = () => <section>...</section>;