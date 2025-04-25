import '../globals.css';   // adjust path if you placed it in /styles
import { Providers } from './providers';

export const metadata = { title: 'AI Gardening Assistant' };

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
