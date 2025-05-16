// src/app/api/stripe/create-checkout-session/route.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions"; // Adjust path if needed
import prisma from '../../../../../lib/prisma'; // Adjust path if needed
import { stripe } from '../../../../../lib/stripe'; // Adjust path if needed
import { NextResponse, NextRequest } from 'next/server';
import Stripe from "stripe";

interface RequestBody {
    priceId: string;
    isTrial?: boolean;
}

export async function POST(req: NextRequest) {
    console.log("Received request to create checkout session");
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id || !session?.user?.email) {
            console.error("Unauthorized: Missing user ID or email in session.");
            return NextResponse.json({ error: 'Unauthorized: Missing user ID or email in session.' }, { status: 401 });
        }
        const userId = session.user.id;
        const userEmail = session.user.email;
        console.log(`User authenticated: ${userId}`);

        const body: RequestBody = await req.json();
        const { priceId, isTrial } = body;
        console.log(`Request body: priceId=${priceId}, isTrial=${isTrial}`);

        if (!priceId) {
            console.error("Price ID is required.");
            return NextResponse.json({ error: 'Price ID is required.' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { stripeCustomerId: true }
        });

        if (!user) {
            console.error(`User not found in database for ID: ${userId}`);
            return NextResponse.json({ error: 'User not found in database.' }, { status: 404 });
        }
        const stripeCustomerId = user.stripeCustomerId;
        console.log(`User Stripe Customer ID: ${stripeCustomerId || 'N/A (new customer)'}`);

        const YOUR_DOMAIN = process.env.NEXTAUTH_URL || 'http://localhost:3000';

        const checkoutSessionParams: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: `${YOUR_DOMAIN}/ask?subscribed=true&session_id={CHECKOUT_SESSION_ID}`, // General success URL
            cancel_url: `${YOUR_DOMAIN}/ask?cancelled=true`, // General cancel URL
            metadata: {
                userId: userId,
                selectedPriceId: priceId // Good to have for webhook verification or records
            },
        };

        // Handle Free Trial for the Sprout Plan (which is a trial of the Bloom Plan)
        // Ensure the Price ID passed for the trial is indeed the Bloom Plan's Price ID
        if (isTrial && priceId === process.env.STRIPE_BLOOM_PLAN_PRICE_ID) {
            checkoutSessionParams.subscription_data = {
                trial_period_days: 7,
            };
            // Optionally, you can customize success/cancel URLs for trials if needed
            // checkoutSessionParams.success_url = `${YOUR_DOMAIN}/ask?trial_started=true&session_id={CHECKOUT_SESSION_ID}`;
            // checkoutSessionParams.cancel_url = `${YOUR_DOMAIN}/pricing?trial_cancelled=true`;
            console.log(`Applying 7-day trial for priceId: ${priceId}`);
        }

        if (stripeCustomerId) {
            checkoutSessionParams.customer = stripeCustomerId;
        } else {
            // If user doesn't have one, Stripe creates a new Customer object
            checkoutSessionParams.customer_email = userEmail;
            // Stripe will create a customer and associate the email.
            // The webhook for checkout.session.completed will then receive the customer ID.
            console.log(`No Stripe Customer ID found for user ${userId}. Passing email: ${userEmail} for new customer creation.`);
        }

        console.log("Creating Stripe checkout session with params:", JSON.stringify(checkoutSessionParams, null, 2));
        const stripeCheckoutSession = await stripe.checkout.sessions.create(checkoutSessionParams);

        if (!stripeCheckoutSession?.id) {
            console.error("Could not create Stripe checkout session object.");
            throw new Error('Could not create Stripe checkout session object.');
        }
        console.log(`Stripe Checkout Session created: ${stripeCheckoutSession.id}`);

        return NextResponse.json({ sessionId: stripeCheckoutSession.id });

    } catch (error) {
        console.error("🔴 Error creating Stripe checkout session:", error);
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}