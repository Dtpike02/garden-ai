// src/app/page.tsx
'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { PDFDownloadLink } from '@react-pdf/renderer'
import AnswerPdf from '@/components/AnswerPdf'

declare module 'remark-gfm';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-green-700 to-green-500 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Garden AI Helper
          </h1>
          <p className="mt-2 text-lg text-green-200">
            Your AI gardening companion for expert advice
          </p>
        </div>
      </header>

      <main className="flex-grow bg-gradient-to-br from-green-100 via-green-50 to-blue-50 p-8 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-3xl text-center mb-8">
          <h2 className="text-4xl font-extrabold text-green-800">
            Ask anything about gardening or farming
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Get expert advice on planting, soil health, pest control, and seasonal tips.
          </p>
        </section>

        {/* Interactive Card */}
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-white rounded-2xl shadow-xl p-8">
          <textarea
            id="question"
            rows={4}
            className="w-full px-4 py-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-500 placeholder-opacity-100 mb-4"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center mb-6"
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
            <>
              <div
                ref={answerRef}
                className="bg-white border border-green-700 rounded-lg p-6 prose prose-green max-w-none text-black"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
              </div>

              <PDFDownloadLink
                document={<AnswerPdf answer={answer} />}
                fileName="garden-ai-answer.pdf"
                className="mt-4 w-full py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow hover:bg-yellow-500 transition flex items-center justify-center"
                >
                {({ loading }) => (loading ? 'Generating PDF…' : 'Download Answer as PDF')}
              </PDFDownloadLink>
            </>
          )}
        </div>
      </main>

      <footer className="bg-green-200 text-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Garden AI Helper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
