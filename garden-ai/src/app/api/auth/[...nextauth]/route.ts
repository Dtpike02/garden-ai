// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../../../lib/prisma'; // Adjust path
import GoogleProvider from 'next-auth/providers/google';

console.log("--- Auth Route Loading ---");

// Extend the Session and User types to include custom fields
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            subscriptionStatus?: string;
            stripeCustomerId?: string;
            stripeSubscriptionId?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        id: string;
        subscriptionStatus?: string;
        stripeCustomerId?: string;
        stripeSubscriptionId?: string;
    }
}

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma), // Use Prisma adapter
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "database", // Required when using adapter
    },
    callbacks: {
        // --- SIMPLIFIED session CALLBACK ---
        async session({ session, user }) { // 'user' is the User record from DB via adapter
            if (session?.user && user?.id) {
                session.user.id = user.id; // Add internal User ID to session
                // Add other fields directly from the user record if they exist
                session.user.subscriptionStatus = user.subscriptionStatus;
                session.user.stripeCustomerId = user.stripeCustomerId;
                session.user.stripeSubscriptionId = user.stripeSubscriptionId; // If you added it
            }
            return session; // Return the modified session
        },

        // --- Redirect callback (optional, but useful) ---
        async redirect({ baseUrl }) {
            // Always redirect to /ask after successful sign-in/callback processing
            // Or implement more complex logic if needed
            return `${baseUrl}/ask`;
        }
    },
    
    debug: false,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };