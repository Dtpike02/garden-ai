import Script from 'next/script';
import '../globals.css';   // adjust path if you placed it in /styles
import { Providers } from './providers';
import { Analytics } from "@vercel/analytics/react"

export const metadata = { title: 'AI Gardening Assistant' };

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


