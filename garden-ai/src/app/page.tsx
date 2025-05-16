// src/app/page.tsx (Homepage with SEO metadata)

'use client';

import Head from 'next/head';
import Image from 'next/image';
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
  UserCircleIcon,
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

          {/* --- Features Section --- */}
        <section className="py-16 md:py-24 bg-white">
        <section id="why-gardenai" className="py-16 md:py-24 bg-[url('/flower-background.png')] bg-cover bg-center">
  <div className="container mx-auto px-6 max-w-3xl text-center ">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
      Cultivating Confident Gardeners, Powered by AI
    </h2>
    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
      <p>
        Tired of endless online searches and conflicting gardening advice? GardenAI solves the core problem of getting reliable, quick, and personalized help for your specific plant care needs. We bridge the gap between complex horticultural knowledge and your everyday gardening questions.
      </p>
      <p>
        Our unique AI assistant provides instant, tailored advice that goes beyond generic tips. Whether you&apos;re diagnosing a mysterious pest, figuring out the perfect watering schedule, or choosing the right plants for your space, GardenAI acts as your knowledgeable, always-available gardening companion, offering guidance rooted in horticultural science.
      </p>
      <p>
        Our mission is to make expert gardening knowledge accessible to everyone, from novice plant parents to seasoned green thumbs. We believe that with the right support, anyone can cultivate a thriving garden. GardenAI is here to empower you with the confidence and insights to help your plants flourish.
      </p>
    </div>
  </div>
</section>
        </section>
        <section className=' flex flex-col items-center justify-center bg-gray-100'>
          <h2 className='text-3xl md:text-4xl font-semibold text-gray-800 mx-auto text-center mt-12'>It&apos;s As Easy As Texting!</h2>
          <section className="py-16 md:py-24 flex flex-row">
          <Image
            src="/Example 1.png"
            alt="Example use of 'texting' the AI to get an answer"
            width={500}
            height={500}
            className="mx-auto rounded-lg shadow-lg"
          />
          <Image
            src="/Example 2.png"
            alt="Example use of 'texting' the AI to get an answer"
            width={500}
            height={500}
            className="mx-auto rounded-lg shadow-lg"
          />

        </section>
        </section>
        <section id="pricing" className="py-16 md:py-24 bg-gray-50">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
      Find the Perfect Plan for Your Flourishing Garden
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Tier 1: Sprout Plan (Free Trial) */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-green-700 mb-2">Sprout Plan</h3>
        <p className="text-4xl font-bold text-gray-800 mb-4">$0 <span className="text-lg font-normal text-gray-500">/ 7-Day Trial</span></p>
        <ul className="text-left space-y-3 text-gray-600 mb-8 flex-grow">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            Access to AI for 5 questions
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            Basic plant problem diagnosis
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            General care tips
          </li>
        </ul>
        <a href="#" className="mt-auto inline-block bg-gray-200 text-green-800 font-semibold py-3 px-8 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out">
          Start Your Free Trial
        </a>
      </div>

      {/* Tier 2: Bloom Plan (Premium) - Highlighted */}
      <div className="bg-green-600 text-white rounded-xl shadow-2xl p-8 flex flex-col ring-4 ring-green-300 transform scale-100 lg:scale-105">
        <div className="relative">
            <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full -mt-4 -mr-4">Recommended</span>
        </div>
        <h3 className="text-2xl font-semibold mb-2">Bloom Plan</h3>
        <p className="text-4xl font-bold mb-4">$9.99 <span className="text-lg font-normal opacity-80">/ month</span></p>
        <ul className="text-left space-y-3 opacity-90 mb-8 flex-grow">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            Unlimited AI gardening questions
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            Advanced plant problem diagnosis
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            Personalized care plans
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            Priority support
          </li>
          <li className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            Save your plant profiles
          </li>
        </ul>
        <a href="#" className="mt-auto inline-block bg-yellow-400 text-green-900 font-semibold py-3 px-8 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out">
          Subscribe to Bloom
        </a>
      </div>

      {/* Tier 3: Full Bloom Plan (Annual) */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-green-700 mb-2">Full Bloom Plan</h3>
        <p className="text-4xl font-bold text-gray-800 mb-1">$99.99 <span className="text-lg font-normal text-gray-500">/ year</span></p>
        <p className="text-sm text-green-600 font-semibold mb-4">(Save 20%)</p>
        <ul className="text-left space-y-3 text-gray-600 mb-8 flex-grow">
          <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            All Bloom Plan features
          </li>
           <li className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            Best value for year-round support
          </li>
        </ul>
        <a href="#" className="mt-auto inline-block bg-green-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out">
          Go Full Bloom & Save
        </a>
      </div>
    </div>
  </div>
</section>
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
              What Our Users Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {/* Testimonial 1 */}
              <div className="rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 hover:bg-gray-50 transition-transform transition-shadow duration-300 ease-out">
                <div className="bg-green-100 rounded-full p-4 mb-4 inline-block"><UserCircleIcon className="h-10 w-10 text-green-600" /></div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Sarah J.</h3>
                <p className="text-gray-600 text-center leading-relaxed">&quot;Garden AI has transformed my gardening experience. I can finally understand what my plants need!&quot;</p>
              </div>
              {/* Testimonial 2 */}
              <div className="rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 hover:bg-gray-50 transition-transform transition-shadow duration-300 ease-out">
                <div className="bg-teal-100 rounded-full p-4 mb-4 inline-block"><UserCircleIcon className="h-10 w-10 text-teal-600" /></div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Mark T.</h3>
                <p className="text-gray-600 text-center leading-relaxed">&quot;I love how easy it is to get expert advice.&quot;</p>
              </div>
              {/* Testimonial 3 */}
              <div className="rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl hover:scale-105 hover:bg-gray-50 transition-transform transition-shadow duration-300 ease-out">
                <div className="bg-cyan-100 rounded-full p-4 mb-4 inline-block"><UserCircleIcon className="h-10 w-10 text-cyan-600" /></div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Emily R.</h3>
                <p className="text-gray-600 text-center leading-relaxed">&quot;The personalized care tips have made a world of difference. I can finally keep my plants healthy!&quot;</p>
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
                     <div className="p-6 bg-white rounded-lg shadow hover:shadow-2xl hover:scale-105 hover:bg-gray-50 transition-transform transition-shadow duration-300 ease-out"><span className="text-3xl font-bold text-green-500 block mb-2">1</span><h4 className="font-semibold text-lg mb-1 text-gray-700">Sign Up / Log In</h4><p className="text-sm text-gray-600">Create your account or log in instantly using Google.</p></div>
                      <div className="p-6 bg-white rounded-lg shadow hover:shadow-2xl hover:scale-105 hover:bg-gray-50 transition-transform transition-shadow duration-300 ease-out"><span className="text-3xl font-bold text-green-500 block mb-2">2</span><h4 className="font-semibold text-lg mb-1 text-gray-700">Subscribe</h4><p className="text-sm text-gray-600">Choose a plan to unlock full access to the AI assistant features.</p></div>
                      <div className="p-6 bg-white rounded-lg shadow hover:shadow-2xl hover:scale-105 hover:bg-gray-50 transition-transform transition-shadow duration-300 ease-out"><span className="text-3xl font-bold text-green-500 block mb-2">3</span><h4 className="font-semibold text-lg mb-1 text-gray-700">Ask Anything!</h4><p className="text-sm text-gray-600">Start chatting with the AI and get expert gardening advice instantly.</p></div>
                 </div>
             </div>
        </section>

        {/* --- Final Call to Action Section --- */}
        <section className="py-16 md:py-24 bg-green-700 text-white">
          <div className="container mx-auto px-6 text-center ">
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
          &copy; {new Date().getFullYear()} Garden AI. All rights reserved.
        </div>
      </footer>
      </div>
    </>
  );
}
