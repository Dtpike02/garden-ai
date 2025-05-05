// File: src/app/ask/layout.tsx

import { ReactNode } from 'react';

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
  return <>{children}</>;
}
