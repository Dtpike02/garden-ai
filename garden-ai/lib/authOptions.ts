// src/lib/authOptions.ts

import { AuthOptions } from 'next-auth'; // Import base type
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import prisma from './prisma'; // Adjust path to your prisma client instance

// Export the options so they can be imported elsewhere
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [

        EmailProvider({
            server: process.env.EMAIL_SERVER!,
            from: process.env.EMAIL_FROM!,
        }),

    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "database",
    },
    callbacks: {
        // Link accounts by email to avoid "AccountNotLinked" errors
        async signIn({ user, account }) {
            if (account?.provider === 'google' && user.email) {
                const existing = await prisma.user.findUnique({
                    where: { email: user.email },
                });
                if (existing && existing.id !== user.id) {
                    await prisma.account.upsert({
                        where: {
                            provider_providerAccountId: {
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                            },
                        },
                        update: {},
                        create: {
                            userId: existing.id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            id_token: account.id_token,
                            refresh_token: account.refresh_token,
                            scope: account.scope,
                            session_state: account.session_state,
                            token_type: account.token_type,
                        },
                    });
                    return true;
                }
            }
            return true;
        },
        // Your session and redirect callbacks
        async session({ session, user }) {
            if (session?.user && user?.id) {
                session.user.id = user.id;
                session.user.subscriptionStatus = user.subscriptionStatus;
                session.user.stripeCustomerId = user.stripeCustomerId;
                session.user.stripeSubscriptionId = user.stripeSubscriptionId;
            }
            return session;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/ask`;
        }
    },
    pages: {
        error: '/auth/error',
    },
    debug: false,
    // Add other options if you had them
};
