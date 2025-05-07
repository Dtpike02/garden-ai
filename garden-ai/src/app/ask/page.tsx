
// src/app/ask/page.tsx

'use client';

import Head from 'next/head';
import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { PaperAirplaneIcon, CpuChipIcon } from '@heroicons/react/24/solid';
import TextareaAutosize from 'react-textarea-autosize';
import Header from '@/components/Header';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = (): Promise<Stripe | null> | null => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error('Stripe publishable key is not set!');
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export default function AskPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isActiveSubscriber = session?.user?.subscriptionStatus === 'active';

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  // Auto-scroll chat
  useEffect(() => {
    chatContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = async (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    if (e && 'preventDefault' in e) e.preventDefault();
    if (!isActiveSubscriber) {
      setError('An active subscription is required to chat.');
      return;
    }
    const prompt = currentPrompt.trim();
    if (!prompt) return;
    setIsLoading(true);
    setError('');

    // Add user message
    const userMessage: ChatMessage = { role: 'user', content: prompt };
    setChatHistory(prev => [...prev, userMessage]);
    setCurrentPrompt('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatHistory, userMessage] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'API Error');
      const assistantMessage: ChatMessage = { role: 'assistant', content: data.text };
      setChatHistory(prev => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(msg);
      setChatHistory(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribeClick = async () => {
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.sessionId) throw new Error(data.error || 'Subscription error');
      const stripe = await getStripe();
      if (!stripe) throw new Error('Stripe.js failed to load.');
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Subscription failed.';
      setError(msg);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 animate-pulse">Loading session...</p>
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>Chat with Our AI Gardening Assistant | Garden AI</title>
          <meta name="description" content="Talk to our AI plant expert to diagnose issues, get watering & fertilization tips, and keep your garden thriving. Sign up to start!" />
          <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type":"Question","name":"Can I diagnose root rot?","acceptedAnswer":{"@type":"Answer","text":"Yes—describe symptoms or upload a photo, and our AI will identify root rot."}},
              {"@type":"Question","name":"How accurate are watering recommendations?","acceptedAnswer":{"@type":"Answer","text":"AI tailors tips to plant type and local climate data for optimal accuracy."}},
              {"@type":"Question","name":"What else can I ask?","acceptedAnswer":{"@type":"Answer","text":"Ask about pest ID, fertilization schedules, seasonal care, and more!"}}
            ]
          }`}
        </script>
        </Head>
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100">
        <nav aria-label="On-Page Navigation" className="mb-4">
        <ul className="flex gap-4 text-sm text-green-700">
          <li><a href="#seo-intro" className="hover:underline">About This Tool</a></li>
          <li><a href="#chat-history" className="hover:underline">Chat Window</a></li>
          <li><a href="#chat-input" className="hover:underline">Ask a Question</a></li>
        </ul>
      </nav>
          <Header />
          <main className="flex-grow container mx-auto max-w-4xl p-4 flex flex-col overflow-hidden">

            {/* Pre-rendered SEO Intro */}
            <section id='seo-intro' className="bg-white rounded-lg p-6 mb-4 shadow">
              <h1 className="text-2xl font-bold mb-2">Chat with Your AI Gardening Expert</h1>
              <p className="mb-2">Welcome to your AI plant expert! Ask about pest identification, watering schedules, and more to keep your garden thriving.</p>
              <ul className="list-disc pl-6 text-sm text-gray-700">
                <li>Identify diseases and pests</li>
                <li>Optimize watering and fertilization</li>
                <li>Plan seasonal care tips</li>
              </ul>
            </section>

            {/* Subscription Prompt Area */}
            {!isActiveSubscriber && !isLoading && (
              <div className="p-4 mb-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
                <p className="text-amber-800 font-medium">Please subscribe for full access.</p>
                <button onClick={handleSubscribeClick} disabled={isLoading} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  {isLoading ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            )}

            {/* Chat History Area */}
            <div ref={chatContainerRef} id='chat-history' className="flex-grow overflow-y-auto mb-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              {chatHistory.length === 0 && !isLoading && isActiveSubscriber && (
                <p className="text-center text-gray-500">Welcome to Garden AI! How can I help your garden today?</p>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex items-start mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>                
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
                      <CpuChipIcon className="w-5 h-5" />
                    </div>
                  )}
                  <div className={`px-4 py-2 rounded-lg shadow ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>                  
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <p>AI is thinking...</p>}
            </div>

            {/* Input Form Area */}
            <form id='chat-input' onSubmit={handleSubmit} className="flex items-center space-x-2">
              <TextareaAutosize
                minRows={1}
                maxRows={6}
                value={currentPrompt}
                onChange={e => setCurrentPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about plant care, pests, watering, and more..."
                className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {!isActiveSubscriber ? (
                <button
                  type="button"
                  onClick={handleSubscribeClick}
                  disabled={isLoading}
                  className="bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600"
                >
                  Subscribe to Ask
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !currentPrompt.trim()}
                  className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </button>
              )}
            </form>

            {error && <p className="text-red-500 mt-2">{error}</p>}

          </main>
        </div>
      </>
    );
  }

  // Fallback for unauthenticated users
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600">Redirecting...</p>
    </div>
  );
}

