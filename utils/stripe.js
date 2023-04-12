import Stripe from "stripe";

const { STRIPE_SECRET_KEY, STRIPE_TEST_KEY } = process.env;

export const stripe = Stripe(STRIPE_TEST_KEY);

