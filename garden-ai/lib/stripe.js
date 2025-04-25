// lib/stripe.ts
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is missing in environment variables');
}

console.log("--- Stripe Client Initializing ---");
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
    typescript: true,
});
console.log("--- Stripe Client Initialized ---");