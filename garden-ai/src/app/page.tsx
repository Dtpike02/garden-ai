// src/app/page.tsx (Updated Homepage)

'use client'; // <<< Make it a Client Component


import Header from '@/components/Header'; // Adjust path if needed
import { useSession, signIn } from 'next-auth/react'; // Import useSession and signIn
import { useRouter } from 'next/navigation'; // Import useRouter
import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Optional: Import icons for features
import {
  SparklesIcon,
  WrenchScrewdriverIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

// Initialize Stripe.js outside component
let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = () => {
  if (!stripePromise) {
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) {
          console.error("Stripe publishable key is not set in .env.local!");
          return null;
      }
      stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};


export default function HomePage() {
  const { data: session, status } = useSession(); // Get session status
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Loading state for button action
  const [error, setError] = useState(''); // Error state for button action

  const isActiveSubscriber = session?.user?.subscriptionStatus === 'active';

  // --- Handler for the main CTA buttons ---
  const handleGetStartedClick = async () => {
    setIsLoading(true);
    setError('');

    // 1. Check Authentication Status
    if (status === 'loading') {
      // Should ideally wait, but for simplicity we'll just return
      setIsLoading(false);
      return;
    }

    if (status === 'unauthenticated') {
      // If logged out, redirect to sign-in, aiming for /ask afterwards
      signIn('google', { callbackUrl: '/ask' });
      // setIsLoading(false); // No need to reset, user navigates away
      return;
    }

    if (status === 'authenticated') {
      // 2. Check Subscription Status
      if (isActiveSubscriber) {
        // If already subscribed, just go to the app
        router.push('/ask');
        setIsLoading(false);
      } else {
        // If logged in but NOT subscribed, initiate checkout
        try {
          const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' });
          const data = await res.json();
          if (!res.ok || !data.sessionId) {
            throw new Error(data.error || 'Failed to create checkout session.');
          }
          const stripe = await getStripe();
          if (!stripe) throw new Error('Stripe.js failed to load.');
          const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
          if (stripeError) throw stripeError;
          // If redirect fails, reset loading
          setIsLoading(false);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Get Started -> Subscribe Error:", err);
            setError(err.message || 'Could not initiate subscription.');
          } else {
            console.error("Get Started -> Subscribe Error: Unknown error", err);
            setError('An unknown error occurred.');
          }
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* --- Header --- */}
      <Header />

      {/* --- Main Content --- */}
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 text-white pt-20 pb-24 text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Your Personal AI Gardening Expert
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-green-100 font-light max-w-3xl mx-auto">
              Get instant answers, diagnose plant problems, and receive personalized care tips to help your garden thrive.
            </p>
            {/* --- Use Button with onClick handler --- */}
            <button
              onClick={handleGetStartedClick}
              disabled={isLoading || status === 'loading'}
              className="inline-block bg-white text-green-700 font-semibold py-3 px-8 rounded-lg shadow-md text-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-wait"
            >
              {isLoading ? 'Processing...' : 'Get Started Now'}
            </button>
            {error && <p className="text-red-200 text-sm mt-4">{error}</p>}
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
              Why Choose AI Gardener?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {/* Feature 1 */}
              <div className="flex flex-col items-center">
                 <div className="bg-green-100 rounded-full p-4 mb-4 inline-block"><SparklesIcon className="h-10 w-10 text-green-600" /></div>
                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Instant AI Advice</h3>
                 <p className="text-gray-600 text-center leading-relaxed">No more endless searching. Get immediate, AI-powered answers to your specific gardening questions, 24/7.</p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col items-center">
                <div className="bg-teal-100 rounded-full p-4 mb-4 inline-block"><WrenchScrewdriverIcon className="h-10 w-10 text-teal-600" /></div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Problem Diagnosis</h3>
                <p className="text-gray-600 text-center leading-relaxed">Describe your plant&apos;s symptoms, and our AI can help identify potential diseases, pests, or nutrient deficiencies.</p>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col items-center">
                 <div className="bg-cyan-100 rounded-full p-4 mb-4 inline-block"><SunIcon className="h-10 w-10 text-cyan-600" /></div>
                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Personalized Care Tips</h3>
                 <p className="text-gray-600 text-center leading-relaxed">Receive tailored advice on watering, fertilizing, lighting, and pruning based on your specific plants and conditions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- How It Works Section --- */}
        {/* ... (Keep this section as is) ... */}
         <section className="py-16 md:py-24 bg-gray-100">
             <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
                    Get Started in 3 Easy Steps
                </h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-center max-w-4xl mx-auto">
                     <div className="p-6 bg-white rounded-lg shadow"><span className="text-3xl font-bold text-green-500 block mb-2">1</span><h4 className="font-semibold text-lg mb-1 text-gray-700">Sign Up / Log In</h4><p className="text-sm text-gray-600">Create your account or log in instantly using Google.</p></div>
                      <div className="p-6 bg-white rounded-lg shadow"><span className="text-3xl font-bold text-green-500 block mb-2">2</span><h4 className="font-semibold text-lg mb-1 text-gray-700">Subscribe (If Required)</h4><p className="text-sm text-gray-600">Choose a plan to unlock full access to the AI assistant features.</p></div>
                      <div className="p-6 bg-white rounded-lg shadow"><span className="text-3xl font-bold text-green-500 block mb-2">3</span><h4 className="font-semibold text-lg mb-1 text-gray-700">Ask Anything!</h4><p className="text-sm text-gray-600">Start chatting with the AI and get expert gardening advice instantly.</p></div>
                 </div>
             </div>
        </section>

        {/* --- Final Call to Action Section --- */}
        <section className="py-16 md:py-24 bg-green-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Ready to Grow a Healthier Garden?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-green-100 max-w-2xl mx-auto">
              Stop guessing and start growing with confidence. Sign up today!
            </p>
            {/* --- Use Button with onClick handler --- */}
            <button
              onClick={handleGetStartedClick}
              disabled={isLoading || status === 'loading'}
              className="inline-block bg-white text-green-700 font-semibold py-3 px-8 rounded-lg shadow-md text-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-wait"
            >
              {isLoading ? 'Processing...' : 'Get Started'}
            </button>
             {error && <p className="text-red-200 text-sm mt-4">{error}</p>}
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      {/* ... (Keep footer as is) ... */}
      <footer className="flex-shrink-0 bg-gray-800 text-gray-400 py-6 text-center text-sm">
        <div className="container mx-auto px-6">
          &copy; {new Date().getFullYear()} AI Gardening Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  );
}