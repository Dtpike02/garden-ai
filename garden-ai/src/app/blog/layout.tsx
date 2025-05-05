import { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
//import Link from 'next/link';
export const metadata = {
  title: 'Garden AI – AI-Powered Gardening Assistant',
  description:
    'Welcome to Garden AI, your AI-powered gardening assistant. Diagnose plant issues, get watering and fertilization tips, and receive personalized care advice to grow a thriving garden.',
  openGraph: {
    title: 'Garden AI – AI-Powered Gardening Assistant',
    description:
      'Welcome to Garden AI, your AI-powered gardening assistant. Diagnose plant issues, get watering and fertilization tips, and receive personalized care advice to grow a thriving garden.',
    url: 'https://gardenai.me',
    siteName: 'Garden AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garden AI – AI-Powered Gardening Assistant',
    description:
      'Welcome to Garden AI, your AI-powered gardening assistant. Diagnose plant issues, get watering and fertilization tips, and receive personalized care advice to grow a thriving garden.',
  },
};
export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>
      <Header></Header>
      <div className="container mx-auto px-4 py-8">
        <article className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6'>{children}</article>
        <footer className="mt-12 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Garden AI Blog
        </footer>
      </div>
    </>
  );
}