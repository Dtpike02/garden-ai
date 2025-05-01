// src/app/page.tsx (Homepage with SEO metadata)

'use client';

import Head from 'next/head';
import Header from '@/components/Header'; // Adjust path if needed
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SparklesIcon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  WrenchScrewdriverIcon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SunIcon,
} from '@heroicons/react/24/outline';

// Initialize Stripe.js outside component
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

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isActiveSubscriber = session?.user?.subscriptionStatus === 'active';

  const handleGetStartedClick = async () => {
    setIsLoading(true);
    setError('');

    if (status === 'loading') {
      setIsLoading(false);
      return;
    }
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl: '/ask' });
      return;
    }
    if (status === 'authenticated') {
      if (isActiveSubscriber) {
        router.push('/ask');
        setIsLoading(false);
      } else {
        try {
          const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' });
          const data = await res.json();
          if (!res.ok || !data.sessionId) throw new Error(data.error || 'Failed to create checkout session.');
          const stripe = getStripe();
          if (!stripe) throw new Error('Stripe.js failed to load.');
          const stripeInstance = await stripe;
          if (!stripeInstance) {
            throw new Error('Stripe.js failed to load.');
          }
          await stripeInstance.redirectToCheckout({ sessionId: data.sessionId });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'An unknown error occurred.';
          setError(message);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>AI Gardening Assistant | Garden AI – Instant Plant Care & Advice</title>
        <meta name="description" content="Get instant AI-powered plant care tips, diagnose pests & diseases, and personalized gardening advice with Garden AI. Start growing a healthier garden today!" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="min-h-[75vh] bg-[url('../public/hero.png')] bg-cover bg-center text-white pt-20 pb-24 flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                AI Gardening Expert: Your Personal Plant Care Assistant
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-green-100 font-light max-w-3xl mx-auto">
                Get instant AI-powered answers, diagnose plant issues, and receive tailored care tips to help your garden flourish.
              </p>
              <button
                onClick={handleGetStartedClick}
                disabled={isLoading || status === 'loading'}
                className="inline-block bg-white text-green-700 font-semibold py-3 px-8 rounded-lg shadow-md text-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-wait"
              >
                {isLoading ? 'Processing...' : 'Solve My Plant Problems'}
              </button>
              {error && <p className="text-red-200 text-sm mt-4">{error}</p>}
            </div>
          </section>

          {/* Features Section (unchanged) */}
          {/* ... */}

          {/* How It Works Section */}
          {/* ... */}

          {/* Final CTA Section */}
          {/* ... */}
        </main>

        {/* Footer */}
        {/* ... */}
      </div>
    </>
  );
}
