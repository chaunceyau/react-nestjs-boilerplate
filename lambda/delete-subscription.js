"use strict";

const stripe = require("stripe")("sk_test_xJ3foTGYIH8pmmWgl4oq9iiy00MIhxubFb");
const prisma = require("@prisma/client");
const client = new prisma.PrismaClient();

const endpointSecret = "whsec_ctudo4JzCKlFbXELbpKJvtxU3jwsIgMS";

module.exports.handler = async (event) => {
  console.log("MHELMRELMRELM", event);
  const parsed_body = JSON.parse(event.body);
  console.log("parsed_body", parsed_body);
  const sig = event.headers["Stripe-Signature"];

  try {
    console.log("034202");
    stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (error) {
    console.log("ERROR", error);
    return {
      statusCode: 400,
      message: "error verifying stripe signature.",
    };
  }
  console.log("9324m9fm,leam");

  switch (parsed_body.type) {
    case "customer.subscription.deleted":
      const subscription = parsed_body.data.object;
      console.log("subscription", subscription);
      await client.user.update({
        where: { stripe_subscription_id: subscription.id },
        data: { subscription_type: "FREE_TIER", stripe_subscription_id: null },
      });
      console.log("subscription");

      break;
    default:
      console.log("dksnfak");
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
