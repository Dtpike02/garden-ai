// src/app/page.tsx
'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
// Import remarkGfm without type declarations
// Since '@types/remark-gfm' is not available, you can use a workaround by declaring the module manually.
import remarkGfm from 'remark-gfm';

// Add a declaration for the module to avoid TypeScript errors
declare module 'remark-gfm';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setAnswer(data.answer);
    } catch (e: unknown) {
      setAnswer(`Error: ${e instanceof Error ? e.message : 'An unknown error occurred.'}`);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-green-50 to-blue-50 flex items-center justify-center p-8">
      {/* Wider responsive card: adjusts at each breakpoint */}
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-5xl font-bold text-center text-green-800 mb-6">
          Garden AI Helper
        </h1>

        <div className="mb-6">
          <label htmlFor="question" className="block text-lg font-medium text-gray-800 mb-2">
            Ask anything about gardening:
          </label>
          <textarea
            id="question"
            rows={4}
            className=" text-black w-full px-4 py-3 border border-green-700 300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition placeholder-gray-500 placeholder-opacity-100"
            placeholder="e.g. How to grow tomatoes in containers?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
            </svg>
          ) : (
            'Ask GardenWise'
          )}
        </button>

        {answer && (
          <div className="mt-8 bg-white border border-green-700 rounded-lg p-6 prose max-w-none text-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer || ''}</ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  );
}
