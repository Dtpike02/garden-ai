// src/app/ask/page.tsx

'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loadStripe, Stripe } from '@stripe/stripe-js';
// --- Import Icons (Example using Heroicons) ---
import { PaperAirplaneIcon, UserCircleIcon, CpuChipIcon } from '@heroicons/react/24/solid';
// --- Import TextareaAutosize ---
import TextareaAutosize from 'react-textarea-autosize';
// Import Header if you want it on this page too
import Header from '@/components/Header'; // Adjust path if needed

// Define message structure for frontend state
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

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


export default function AskPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Component State
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Combined loading state
  const [error, setError] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Derived state for subscription status
  const isActiveSubscriber = session?.user?.subscriptionStatus === 'active';

  // --- Authentication Check/Redirect ---
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  // --- Auto-scroll Chat Effect ---
   useEffect(() => {
    if (chatContainerRef.current) {
        // Use scrollIntoView for potentially smoother scrolling on new message
        chatContainerRef.current.lastElementChild?.scrollIntoView({ behavior: "smooth" });
        // Or stick with scrollTop:
        // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // --- Handle Chat Submission (Keep existing logic) ---
  const handleSubmit = async (event?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
     if (event && 'preventDefault' in event) event.preventDefault();
    if (!isActiveSubscriber) {
        setError('An active subscription is required to chat with the AI.');
        return;
    }
    const promptToSend = currentPrompt.trim();
    if (!promptToSend || isLoading) return;

    setIsLoading(true);
    setError('');
    const newUserMessage: ChatMessage = { role: 'user', content: promptToSend };
    const historyForAPI = [...chatHistory, newUserMessage].map(msg => ({ role: msg.role, content: msg.content }));

    setChatHistory(prevHistory => [...prevHistory, newUserMessage]);
    setCurrentPrompt('');

    try {
      const response = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: historyForAPI }), });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `API Error: ${response.status}`);
      const newAssistantMessage: ChatMessage = { role: 'assistant', content: data.text };
      setChatHistory(prevHistory => [...prevHistory, newAssistantMessage]);
    } catch (err: unknown) {
       let message = 'An unexpected error occurred while fetching AI response.';
       if (err instanceof Error) message = err.message;
       setError(message);
       setChatHistory(prevHistory => prevHistory.slice(0, -1)); // Rollback
       console.error("Error fetching AI response:", err);
    } finally {
      setIsLoading(false);
    }
  };

   // --- Handle Subscribe Button Click (Keep existing logic) ---
   const handleSubscribeClick = async () => {
        setError('');
        setIsLoading(true);
        try {
             const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' });
             const data = await res.json();
             if (!res.ok || !data.sessionId) throw new Error(data.error || 'Failed checkout creation.');
             const stripe = await getStripe();
             if (!stripe) throw new Error('Stripe.js failed.');
             const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
             if (stripeError) throw stripeError;
        } catch (err: unknown) {
             let message = 'Failed subscription.';
             if (err instanceof Error) message = err.message;
             setError(message);
             setIsLoading(false);
        }
   };

  // --- HandleKeyDown for Enter submission (Keep existing logic) ---
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
     if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
       event.preventDefault();
       if (isActiveSubscriber) { handleSubmit(event); }
       else { setError('An active subscription is required.'); }
     }
   };

  // --- Render Logic ---
  if (status === 'loading') {
    return ( <div className="flex items-center justify-center h-screen"><p className="text-lg text-gray-600 animate-pulse">Loading session...</p></div> );
  }

  if (status === 'authenticated') {
    return (
        // --- Overall Page Layout ---
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100">
          {/* Use Header component */}
          <Header />

          {/* --- Main Content Area (allows header to be fixed) --- */}
          <main className="flex-grow flex flex-col container mx-auto max-w-4xl w-full p-4 overflow-hidden"> {/* Added overflow-hidden */}

            {/* --- Subscription Prompt Area --- */}
            {!isActiveSubscriber && !isLoading && (
                <div className="flex-shrink-0 p-4 mb-4 text-center bg-amber-50 border border-amber-200 rounded-lg shadow">
                    <p className="text-amber-800 font-medium text-sm sm:text-base">Please subscribe for full access.</p>
                    <button onClick={handleSubscribeClick} disabled={isLoading} className="..."> {/* Add styles */}
                        {isLoading ? 'Processing...' : 'Subscribe Now'}
                    </button>
                </div>
            )}

            {/* --- Chat History Area --- */}
            <div ref={chatContainerRef} className={` bg-[url('/logo.png')] flex-grow overflow-y-auto mb-4 p-4 space-y-8 bg-white rounded-lg border border-gray-200 shadow-sm ${!isActiveSubscriber ? 'opacity-50' : ''} bg-center bg-cover bg-white/80 bg-blend-overlay`}>
               {/* Welcome Message */}
               {chatHistory.length === 0 && !isLoading && isActiveSubscriber && (
                  <p className="text-center text-3xl text-gray-500 p-4">Welcome to AI Gardener! How can I help your garden today?</p>
               )}
               {/* History Mapping */}
               {chatHistory.map((message, index) => (
                  // --- Message Row ---
                  <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {/* Assistant Avatar/Icon */}
                      {message.role === 'assistant' && (
                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center shadow text-white">
                           <CpuChipIcon className="w-5 h-5" />
                         </div>
                      )}
                      {/* Message Bubble */}
                      <div className={`px-4 py-2.5 shadow-md rounded-xl max-w-[80%] sm:max-w-[75%] md:max-w-[70%] ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none' // User bubble style
                            : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none' // Assistant bubble style
                        }`}
                      >
                          {message.role === 'assistant' ? (
                             <div className="prose prose-sm sm:prose-base max-w-none text-gray-900 prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5"> {/* Tighter prose spacing */}
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                             </div>
                          ) : (
                            <p className="whitespace-pre-wrap break-words">{message.content}</p>
                          )}
                      </div>
                       {/* User Avatar/Icon (Optional) */}
                       {message.role === 'user' && (
                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shadow text-gray-600">
                            <UserCircleIcon className="w-6 h-6" />
                         </div>
                      )}
                  </div>
               ))}
               {/* Loading Indicator Bubble */}
               {isLoading && chatHistory[chatHistory.length - 1]?.role === 'user' && (
                   <div className="flex justify-start gap-3">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center shadow text-white">
                       <CpuChipIcon className="w-5 h-5" />
                     </div>
                     <div className="px-4 py-3 rounded-xl shadow bg-gray-100 text-gray-400 border border-gray-200 flex items-center space-x-1.5 animate-pulse">
                       <span className="block w-1.5 h-1.5 bg-gray-400 rounded-full "></span>
                       <span className="block w-1.5 h-1.5 bg-gray-400 rounded-full "></span>
                       <span className="block w-1.5 h-1.5 bg-gray-400 rounded-full "></span>
                     </div>
                   </div>
               )}
            </div> {/* End Chat History Area */}

             {/* --- Error Display Area --- */}
            {error && (
                <p className="text-red-600 text-center text-xs sm:text-sm mb-2 flex-shrink-0 px-3 py-1 bg-red-100 border border-red-200 rounded-md">
                    {error}
                </p>
            )}

             {/* --- Input Form Area --- */}
            <form 
              onSubmit={handleSubmit} 
              className={`flex-shrink-0 flex items-end gap-2 p-3 border-t border-gray-200 bg-white rounded-b-lg shadow ${!isActiveSubscriber ? 'bg-gray-100' : ''}`}
            >
              <TextareaAutosize
                value={currentPrompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentPrompt(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => handleKeyDown(e)}
                placeholder={isActiveSubscriber ? "Ask about your garden..." : "Subscription required to chat"}
                className={` flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm sm:text-base leading-relaxed transition duration-150 ease-in-out ${!isActiveSubscriber ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                disabled={isLoading || !isActiveSubscriber}
                maxRows={6} // Limit auto-growth height
                minRows={1} // Start small
                cacheMeasurements // Required by react-textarea-autosize
              />
              <button
                type="submit"
                title="Send message"
                className={`p-3 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors ${!isActiveSubscriber ? 'cursor-not-allowed' : ''}`}
                disabled={isLoading || !currentPrompt.trim() || !isActiveSubscriber}
              >
                <PaperAirplaneIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Send</span>
              </button>
            </form> {/* End Input Form Area */}

          </main> {/* End Main Content Area */}
        </div> // End Overall Page Layout
    );
  }

  // Fallback for 'unauthenticated' while redirecting
  return ( <div className="flex items-center justify-center h-screen"><p className="text-lg text-gray-600">Redirecting...</p></div> );
}