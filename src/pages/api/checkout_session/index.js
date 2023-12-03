import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
});

export default async function handler(
  req,
  res
) {
  const { item } = req.body;

  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.image],
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: item.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: `${req.headers.origin}/event/${item.id}/register?tid=${item.tid}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/event/${item.id}/register?tid=${item.tid}&session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      images: item.image,
    },
  });

  res.json({ id: session.id });
}