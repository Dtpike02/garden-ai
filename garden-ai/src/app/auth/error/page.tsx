'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get('error');

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-2xl font-semibold mb-4">Authentication Error</h1>
      <p className="mb-6 text-red-600">{error || 'Unable to sign in. Please try again.'}</p>
      <Link href="/" className="text-green-700 underline">Go back home</Link>
    </div>
  );
}
