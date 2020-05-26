"use strict";

const stripe = require("stripe")("sk_test_xJ3foTGYIH8pmmWgl4oq9iiy00MIhxubFb");
const prisma = require("@prisma/client");
const client = new prisma.PrismaClient();

const endpointSecret = "whsec_U5Y6K2IcakDvM1BdsUkqcNA4Gzd4gYSF";

module.exports.handler = async (event) => {
  const parsed_body = JSON.parse(event.body);
  const checkout_session = parsed_body.data.object;
  const sig = event.headers["Stripe-Signature"];

  try {
    stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (error) {
    return {
      statusCode: 400,
      message: "error verifying stripe signature.",
    };
  }

  // console.log({ parsed_body });

  // Handle the event
  switch (parsed_body.type) {
    case "checkout.session.completed":
      // console.log({ checkout_session });
      const fullSubscriptionObject = await stripe.subscriptions.retrieve(
        checkout_session.subscription
      );
      // console.log({ fullSubscriptionObject });

      try {
        const user = await client.user.findOne({
          where: { stripe_customer_id: checkout_session.customer },
        });

        await client.user.update({
          where: { id: user.id },
          data: {
            subscription_type: "PREMIUM_SUBSCRIBER",
            current_period_end: new Date(
              fullSubscriptionObject.current_period_end * 1000 // ms
            ),
            stripe_subscription_id: checkout_session.subscription,
          },
        });
      } catch (err) {
        // console.log("fuck", err);
        return {
          statusCode: 500,
          body: JSON.stringify({
            err: err,
          }),
        };
      }
      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // console.log("PaymentIntent was successful!");
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // console.log("PaymentMethod was attached to a Customer!");
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return {
        statusCode: 200,
      };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      recieved: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
