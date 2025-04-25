// src/app/api/stripe/webhook/route.ts
import { stripe } from '../../../../../lib/stripe'; // Adjust path if needed
import prisma from '../../../../../lib/prisma'; // Adjust path if needed
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

// Define relevant events we want to handle
const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'customer.subscription.created', // Useful for confirmation sometimes
]);

export async function POST(req: Request) {
    const body = await req.text(); // Use text for signature verification
    const sig = (await headers()).get('Stripe-Signature') as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // 1. Check if webhook secret is configured
    if (!sig || !webhookSecret) {
        console.error("🔴 Webhook Error: Missing Stripe signature or webhook secret.");
        return new NextResponse('Webhook secret not configured', { status: 400 });
    }

    let event: Stripe.Event;

    // 2. Verify webhook signature
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown signature verification error.';
        console.error(`🔴 Webhook signature verification failed: ${message}`);
        return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
    }

    console.log(`✅ Webhook received: ${event.type}, ID: ${event.id}`);
    const data = event.data.object; // The object related to the event

    // 3. Handle only relevant events
    if (relevantEvents.has(event.type)) {
        try {
             let customerId: string | undefined;
             let subscriptionId: string | undefined;
             let subscriptionStatus: string | undefined;
             let userId: string | undefined; // Your internal User ID

            // --- Handle specific event types ---
            switch (event.type) {
                // --- Initial Subscription Creation ---
                case 'checkout.session.completed':
                    const checkoutSession = data as Stripe.Checkout.Session;
                    console.log(`Processing ${event.type} for session: ${checkoutSession.id}`);

                    // Only process successfully paid sessions
                    if (checkoutSession.payment_status === 'paid') {
                        customerId = typeof checkoutSession.customer === 'string' ? checkoutSession.customer : checkoutSession.customer?.id;
                        subscriptionId = typeof checkoutSession.subscription === 'string' ? checkoutSession.subscription : checkoutSession.subscription?.id;
                        // --- CRITICAL: Get your internal userId from metadata ---
                        userId = checkoutSession.metadata?.userId;

                        console.log(`Webhook Extracted Data - UserID: ${userId}, CustomerID: ${customerId}, SubscriptionID: ${subscriptionId}`);

                        // Validate required data before DB operation
                        if (!userId || !customerId || !subscriptionId) {
                             console.error("🔴 Webhook Error: Missing critical data in checkout.session.completed (userId from metadata, or customer/subscription IDs).", { userId, customerId, subscriptionId });
                             // Break here, still return 200 to Stripe as this isn't retryable if data missing
                             break;
                        }

                        subscriptionStatus = 'active'; // Set initial status

                        // Update the User record using your internal userId
                        try {
                            console.log(`Webhook: Attempting to update User record for ID: ${userId}`);
                            await prisma.user.update({
                                where: { id: userId }, // Find user by your internal ID
                                data: {
                                    stripeCustomerId: customerId,
                                    stripeSubscriptionId: subscriptionId,
                                    subscriptionStatus: subscriptionStatus,
                                    updatedAt: new Date(), // Explicitly set update time
                                },
                            });
                            console.log(`✅ User ${userId} updated successfully from checkout session.`);
                        } catch (dbError: unknown) {
                             console.error(`🔴 Webhook DB Error updating User ${userId} from checkout:`, dbError);
                             // If P2025 occurs here, it means userId from metadata is wrong/user deleted
                             if ((dbError as Prisma.PrismaClientKnownRequestError)?.code === 'P2025') {
                                console.error(`🔴 Critical Webhook Error: User with ID ${userId} from metadata not found in DB!`);
                             }
                             // Log error, but likely return 200 to Stripe still, as retrying won't fix this
                        }
                    } else {
                         console.log(`Webhook: Checkout session ${checkoutSession.id} payment status: ${checkoutSession.payment_status}. Skipping DB update.`);
                    }
                    break; // End checkout.session.completed case

                // --- Handle Ongoing Subscription Changes ---
                case 'customer.subscription.created': // Often confirms details after checkout.completed
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted': // Handles cancellations etc.
                    const subscription = data as Stripe.Subscription;
                    customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
                    subscriptionId = subscription.id;
                    // Use Stripe's status directly ('active', 'canceled', 'past_due', etc.)
                    // Map 'canceled' from Stripe to 'cancelled' if needed for consistency, or handle 'deleted' event separately
                    subscriptionStatus = event.type === 'customer.subscription.deleted' ? 'cancelled' : subscription.status;

                    console.log(`Processing ${event.type} for customer: ${customerId}, status: ${subscriptionStatus}`);

                    if (!customerId) {
                        console.warn("⚠️ Webhook: Customer ID missing in subscription event.");
                        break; // Exit case if no customerId
                    }

                    // Update user record identified by stripeCustomerId
                    try {
                        await prisma.user.update({
                            where: { stripeCustomerId: customerId }, // Find user by Stripe Customer ID
                            data: {
                                stripeSubscriptionId: event.type === 'customer.subscription.deleted' ? null : subscriptionId,
                                subscriptionStatus: subscriptionStatus,
                                updatedAt: new Date(),
                            },
                        });
                        console.log(`✅ User status updated via webhook for Stripe Customer ${customerId} to ${subscriptionStatus}`);
                    } catch (error: unknown) {
                        // Check specifically for P2025 error (User not found for this customer ID)
                        if ((error as Prisma.PrismaClientKnownRequestError)?.code === 'P2025') {
                            console.warn(`⚠️ Webhook: User with stripeCustomerId ${customerId} not found for update (P2025). Maybe checkout handler failed or user deleted?`);
                            // Return 200 OK to Stripe because we can't fix this missing record here.
                        } else {
                            // For other unexpected database errors, log and re-throw
                            console.error(`🔴 Webhook DB Error updating user for customer ${customerId}:`, error);
                            throw error; // Re-throw -> caught by outer catch -> returns 500
                        }
                    }
                    break; // End customer.subscription cases

                default:
                    console.warn(`🤷‍♀️ Webhook: Unhandled relevant event type: ${event.type}`);
            }
        } catch (error) {
             // Catches errors re-thrown from inner blocks (like non-P2025 DB errors)
             console.error('🔴 Webhook handler processing error:', error);
             // Return 500 to Stripe to indicate failure and potentially trigger retries
             return new NextResponse('Webhook handler failed during event processing.', { status: 500 });
        }
    } else {
        // Optional: Log events you aren't handling
        // console.log(`Webhook: Received non-relevant event type: ${event.type}`);
    }

    // Return 200 OK to Stripe if no error response was sent earlier
    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}