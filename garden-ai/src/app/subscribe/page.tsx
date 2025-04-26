// src/app/subscribe/page.tsx
import { Suspense } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from 'next/link';
import SubscriptionFormLoader from '../../components/SubscriptionFormLoader'; // Adjust the path as needed

// --- Loading Fallback ---
function LoadingFallback() {
    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
             </div>
        </div>
    );
}

// --- Main Page Export (Server Component) ---
export default function SubscribePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SubscriptionFormLoader />
    </Suspense>
  );
}

