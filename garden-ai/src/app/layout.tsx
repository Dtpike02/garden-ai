import Script from 'next/script';
import '../globals.css';   // adjust path if you placed it in /styles
import { Providers } from './providers';
import { Analytics } from "@vercel/analytics/react"

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
  alternates: {
    canonical: 'https://gardenai.me',
  },
};

import { ReactNode } from 'react';

// Define META_PIXEL_ID or import it from a configuration file
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Analytics />
      <body className="min-h-screen bg-gray-50">
        <Providers>{children}</Providers>
        {/* --- Meta Pixel Code --- */}
        {/* Only render script if Pixel ID is available */}
        {META_PIXEL_ID && (
          <>
          <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#4ade80" />
        {/* ===== Added: Robots meta ===== */}
        <meta name="robots" content="index, follow" />
        {/* ===== Added: Canonical URL ===== */}
        <link rel="canonical" href="https://gardenai.me" />
        {/* ===== Added: Sitemap reference ===== */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />


        {/* ===== Added: JSON-LD WebSite schema with SearchAction ===== */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://gardenai.me",
            "name": "Garden AI",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://gardenai.me/ask?query={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }`}
        </script>

        {/* ===== Added: JSON-LD BreadcrumbList schema ===== */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://gardenai.me"
              }
            ]
          }`}
        </script>
            </head>
            <Script
              id="fb-pixel-script"
              strategy="afterInteractive" // Load after page becomes interactive
            >
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img height="1" width="1" style={{ display: 'none' }}
                  src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
            </noscript>
          </>
        )}
        {/* --- End Meta Pixel Code --- */}
      </body>
    </html>
  );
}


