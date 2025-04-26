// src/app/api/stripe/create-checkout-session/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions"; // Adjust path if needed
import prisma from '../../../../../lib/prisma'; // Adjust path if needed
import { stripe } from '../../../../../lib/stripe'; // Adjust path if needed
import { NextResponse, NextRequest } from 'next/server';
import Stripe from "stripe"; // Import Stripe type

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
    try {
        // 1. Get User Session
        const session = await getServerSession(authOptions);
        if (!session?.user?.id || !session?.user?.email) {
            // Ensure both id and email are available if needed later
            return NextResponse.json({ error: 'Unauthorized: Missing user ID or email in session.' }, { status: 401 });
        }
        const userId = session.user.id;
        const userEmail = session.user.email; // For potentially creating Stripe customer

        // 2. Get User's Stripe Customer ID from DB (if exists)
        // Fetch user from DB to get potentially existing stripeCustomerId
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { stripeCustomerId: true } // Only fetch necessary field
        });

        if (!user) {
             // This shouldn't happen if the session is valid, but good practice check
             return NextResponse.json({ error: 'User not found in database.' }, { status: 404 });
        }
        const stripeCustomerId = user.stripeCustomerId;

        // 3. Environment Variables
        const YOUR_DOMAIN = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const PRICE_ID = process.env.STRIPE_PRICE_ID;

        if (!PRICE_ID) {
             console.error("🔴 Stripe Price ID is not set in environment variables.");
             return NextResponse.json({ error: 'Pricing configuration error.' }, { status: 500 });
        }

        // 4. Prepare Stripe Checkout Session Parameters
        const checkoutSessionParams: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            line_items: [ { price: PRICE_ID, quantity: 1 } ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: `${YOUR_DOMAIN}/ask?subscribed=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/ask?cancelled=true`,
            // --- THIS IS THE CRITICAL FIX ---
            // Pass the internal userId in metadata so the webhook can link the subscription
            metadata: {
                 userId: userId,
            },
            // ---------------------------------
        };

        // 5. Handle Stripe Customer ID
        if (stripeCustomerId) {
            // If user already has a Stripe Customer ID, use it
            checkoutSessionParams.customer = stripeCustomerId;
            console.log(`Using existing Stripe Customer ID: ${stripeCustomerId} for user ${userId}`);
        } else {
            // If user doesn't have one, pre-fill email and let Stripe create a Customer
            // The webhook will handle saving the new customer ID later
            checkoutSessionParams.customer_email = userEmail;
            // checkoutSessionParams.customer_creation = 'always'; // Optional: explicit but default
             console.log(`No Stripe Customer ID found for user ${userId}. Passing email: ${userEmail}`);
        }

        // 6. Create Stripe Checkout Session
        console.log("Creating Stripe checkout session with params:", checkoutSessionParams);
        const checkoutSession = await stripe.checkout.sessions.create(checkoutSessionParams);

        if (!checkoutSession?.id) {
             throw new Error('Could not create Stripe checkout session object.');
        }

        // 7. Return Session ID to Frontend
        return NextResponse.json({ sessionId: checkoutSession.id });

    } catch (error) {
        console.error("🔴 Error creating Stripe checkout session:", error);
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}