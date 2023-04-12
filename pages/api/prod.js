import Stripe from "stripe";

const {
  STRIPE_SECRET_KEY,
  PROD_100,
  PROD_500,
  PROD_1000,
  PROD_2000,
  PROD_5000,
  PROD_10000,
} = process.env;

const stripe = Stripe(STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount, successToken } = req.body;

    let priceId = "";

    if (amount === 100) {
      priceId = PROD_100;
    }
    if (amount === 500) {
      priceId = PROD_500;
    }
    if (amount === 1000) {
      priceId = PROD_1000;
    }
    if (amount === 2000) {
      priceId = PROD_2000;
    }
    if (amount === 5000) {
      priceId = PROD_5000;
    }
    if (amount === 10000) {
      priceId = PROD_10000;
    }

    try {
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `https://www.prodicity.io/settings/billing/${successToken}?amount=${amount}`, // Create success url
        cancel_url: "https://www.prodicity.io/settings/billing", // Cancel url
      });
      // Send the Stripe session URL as sa response
      res.status(200).json({ url: session.url });
    } catch (err) {
      // Handle any errors
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
