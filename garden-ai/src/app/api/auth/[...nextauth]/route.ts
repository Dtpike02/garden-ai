// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '../../../../../lib/authOptions';

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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



