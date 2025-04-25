// src/app/auth/signin/page.tsx
'use client';
import { signIn, getProviders, ClientSafeProvider } from 'next-auth/react'; // Import ClientSafeProvider type
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; // For linking back if needed

// Define simpler provider structure based on what getProviders returns
interface ProviderMap {
    [key: string]: ClientSafeProvider;
}

export default function SignInPage() {
    const [providers, setProviders] = useState<ProviderMap | null>(null);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const errorParam = searchParams.get('error');
        // Check for subscription success message as well
        const subscribedParam = searchParams.get('subscribed');

        if (errorParam) {
             // Map common errors or show generic message
             const errorMessages: Record<string, string> = {
                Signin: "Try signing in with a different account.",
                OAuthSignin: "Error during OAuth sign-in.",
                OAuthCallback: "Error during OAuth callback.",
                OAuthCreateAccount: "Error creating account with OAuth.",
                EmailCreateAccount: "Error creating account with email.",
                Callback: "Error in callback.",
                OAuthAccountNotLinked: "Account already linked with a different provider.",
                EmailSignin: "Check your email inbox.",
                CredentialsSignin: "Sign in failed. Check your credentials.",
                default: "Unable to sign in.",
             };
             setError(errorMessages[errorParam] ?? errorMessages.default);
        } else if (subscribedParam === 'true') {
            // Style this differently if needed
            setError("Subscription successful! Please sign in using the same email.");
        }

        const setupProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };
        setupProviders();
    }, [searchParams]);


    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
             <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold text-center text-gray-800">Sign In / Sign Up</h1>
                 {/* Reverted message for standard flow */}
                 <p className="text-center text-gray-600 text-sm">
                    Use Google to sign in or create your AI Gardener account.
                 </p>

                 {error && (
                     <p className={`text-center text-sm p-3 rounded-md border ${error.startsWith('Subscription successful') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                         {error}
                     </p>
                 )}

                <div className="pt-4 space-y-4">
                    {!providers ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : (
                         Object.values(providers).map((provider) => (
                            <div key={provider.id}> {/* Use provider.id as key */}
                                <button
                                    onClick={() => signIn(provider.id, { callbackUrl: '/ask' })} // Redirect to /ask
                                    className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {/* You could add provider icons here */}
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        ))
                    )}
                 </div>
                 <p className="text-center text-xs text-gray-500 pt-4">
                    Need help? <Link href="/" className="font-medium text-green-600 hover:text-green-500">Go Home</Link>
                </p>
            </div>
        </div>
    );
}