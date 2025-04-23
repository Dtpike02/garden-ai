// src/app/page.tsx
'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Flower2, DownloadCloud } from 'lucide-react';
import Image from 'next/image';

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

  const downloadPDF = async () => {
    if (!answer || !answerRef.current) return;
    const inlineStyles = (el: HTMLElement) => {
      const styles = window.getComputedStyle(el);
      ['backgroundColor','color','borderColor','fill','stroke'].forEach(prop => {
        const value = styles.getPropertyValue(prop);
        if (value) el.style.setProperty(prop, value);
      });
      Array.from(el.children).forEach(child => inlineStyles(child as HTMLElement));
    };
    const clone = answerRef.current.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed'; clone.style.top = '-10000px';
    document.body.appendChild(clone);
    inlineStyles(clone);
    const canvas = await html2canvas(clone, { scale: 2 });
    document.body.removeChild(clone);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('garden-ai-answer.pdf');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-green-700 to-green-500 text-white py-6 shadow-lg">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-center">
      <Image
        alt='Garden AI Helper Logo'
        src="/Logo.png"
        width={100}
        height={100}
      />
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Garden AI Helper
        </h1>
        
      </div>
    </div>
  </div>
</header>

      <main className="flex-grow bg-gradient-to-br from-green-100 via-green-50 to-blue-50 p-8 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-3xl text-center mb-8">
          <Flower2 className="mx-auto mb-6 h-12 w-12 text-green-700" />
          <h2 className="text-4xl font-extrabold text-green-800">
            Ask anything about gardening or farming
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Get expert advice on planting, soil health, pest control, and seasonal tips.
          </p>
        </section>

        {/* Interactive Card */}
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-white rounded-2xl shadow-xl p-8">
          <label htmlFor="question" className="flex items-center text-lg font-medium text-gray-800 mb-2">

  <span className="text-green-800 font-semibold">What gardening question can I help you with today?</span>
</label>
          <textarea
            id="question"
            rows={4}
            className="w-full px-4 py-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-500 placeholder-opacity-100 mb-4"
            placeholder="e.g. How to grow tomatoes in containers?"
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
              <div ref={answerRef} className="bg-white border border-green-700 rounded-lg p-6 prose prose-green max-w-none text-black">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
              </div>

              <button
                onClick={downloadPDF}
                className="mt-4 w-full py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow hover:bg-yellow-500 transition flex items-center justify-center"
              >
                <DownloadCloud className="h-5 w-5 mr-2" />
                Download Answer as PDF
              </button>
            </>
          )}
        </div>
      </main>

      <footer className="bg-green-200 text-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center flex items-center justify-center">
          <p>© {new Date().getFullYear()} Garden AI Helper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
