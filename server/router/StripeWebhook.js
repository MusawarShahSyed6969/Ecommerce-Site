const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order"); // ✅ import your model

const SendMail = require("../utils/Nodemailer")


module.exports = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // ⚡ req.body must be the raw buffer (handled in your main server with express.raw)
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("✅ Payment successful:", session.id);

      try {
        const orderData = {
          user: session.client_reference_id, // optional
          items: session.metadata.items
            ? JSON.parse(session.metadata.items)
            : [],
          shippingInfo: session.metadata.shippingInfo
            ? JSON.parse(session.metadata.shippingInfo)
            : {},

          totalAmount: session.amount_total / 100, // ✅ match your schema
          paymentStatus: "Paid",
          paymentIntentId: session.payment_intent,
          orderStatus: "Processing",
        };

        const newOrder = await Order.create(orderData);
        console.log("✅ Order saved to DB:", newOrder._id);

        await SendMail("tempo7691@gmail.com", "New Order Received", "You have a new order!", "Admin");
        await SendMail(orderData.shippingInfo.email, "Order Generated Successfully", "We have received your order, thank you!", orderData.shippingInfo.fullName);


      } catch (err) {
        console.error("❌ Failed to save order:", err.message);
      }
      break;
    }

    case "payment_intent.succeeded":
      console.log("💳 PaymentIntent succeeded:", event.data.object.id);
      break;

    default:
      console.log(`⚠️ Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};


