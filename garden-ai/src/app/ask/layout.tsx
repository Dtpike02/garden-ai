// File: src/app/ask/layout.tsx

import { ReactNode } from 'react';
import Head from 'next/head';

export const metadata = {
  title: 'Chat with AI Gardening Assistant | Garden AI',
  description:
    'Use our AI-powered plant expert to diagnose pests, optimize watering schedules, and get personalized gardening tips. Sign up for full access.',
  openGraph: {
    title: 'Chat with AI Gardening Assistant | Garden AI',
    description:
      'Use our AI-powered plant expert to diagnose pests, optimize watering schedules, and get personalized gardening tips. Sign up for full access.',
    url: 'https://gardenai.me/ask',
    siteName: 'Garden AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat with AI Gardening Assistant | Garden AI',
    description:
      'Use our AI-powered plant expert to diagnose pests, optimize watering schedules, and get personalized gardening tips. Sign up for full access.',
  },
};

export default function AskLayout({ children }: { children: ReactNode }) {
  return <>
    <Head><script type="application/ld+json">
{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I diagnose root rot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes—simply describe the symptoms or upload a photo, and the AI will identify root rot."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate are watering recommendations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI tailors watering tips to your plant type and local climate data for optimal accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "What else can I ask?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can ask about pest ID, fertilization schedules, seasonal care, and more!"
      }
    }
  ]
}`}
</script></Head>
    {children}
  </>;
}
