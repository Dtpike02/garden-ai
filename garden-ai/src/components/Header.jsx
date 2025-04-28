// src/components/Header.tsx
'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    // Standard sign-in, redirect to /ask on success
    signIn('google', { callbackUrl: '/ask' });
  };

  const handleSignOut = async () => {
    // Standard sign-out, redirect to home on success
    await signOut({ redirect: false });
    // Use router to redirect to home
    router.push('/')

  };

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md h-16 flex-shrink-0">
      <div className='flex items-center gap-2 sm:gap-3'>
        <Image src="/Logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
        <Link href="/" className="text-xl font-bold hover:opacity-90 transition-opacity">
          AI Gardener
        </Link>
      </div>

      {/* --- Auth Buttons & Links --- */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Loading State */}
        {status === "loading" && (
          <div className="h-8 w-24 animate-pulse bg-white/30 rounded-md"></div> // Simple loading placeholder
        )}

        {/* Unauthenticated State */}
        {status === "unauthenticated" && (
          <>
            <button
              onClick={handleSignIn}
              className="text-sm font-medium px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              Log in
            </button>
            <button
              onClick={handleSignIn} // Sign up also just triggers the sign-in flow
              className="bg-white text-green-700 px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </button>
          </>
        )}

        {/* Authenticated State */}
        {status === "authenticated" && session && (
           <>
             {/* --- Link to the /ask page --- */}
             <Link
                href="/ask"
                className="text-sm font-medium px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors hidden sm:inline-block" // Added link, hidden on xs screens
                title="Go to the AI Chat" // Tooltip
             >
                Ask AI
             </Link>
             {/* ----------------------------------- */}

             {/* Welcome message (optional) */}
             <span className="text-sm hidden md:inline border-l border-white/30 pl-3 sm:pl-4"> {/* Hide on sm, show md+ */}
               {session.user?.name || session.user?.email}
             </span>

             {/* Logout Button */}
             <button
                onClick={handleSignOut}
                className="bg-white text-red-600 px-4 py-1.5 rounded-md text-sm font-semibold shadow hover:bg-gray-100 transition-colors"
             >
               Log out
             </button>
           </>
        )}
      </div>
    </header>
  )
}