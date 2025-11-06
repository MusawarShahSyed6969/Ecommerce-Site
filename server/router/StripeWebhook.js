const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");
const SendMail = require("../utils/Nodemailer");

module.exports = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // 🧩 If req.body is a Buffer (local express.raw), use directly
    // 🧩 If it's a string/object (Vercel/serverless), rebuild the raw buffer
    let rawBody;
    if (Buffer.isBuffer(req.body)) {
      rawBody = req.body;
    } else if (typeof req.body === "string") {
      rawBody = Buffer.from(req.body);
    } else {
      // In Vercel or some serverless contexts, body can be auto-parsed JSON
      rawBody = Buffer.from(JSON.stringify(req.body || {}));
    }

    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle events
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("✅ Payment successful:", session.id);

        const orderData = {
          user: session.client_reference_id || null,
          items: session.metadata.items ? JSON.parse(session.metadata.items) : [],
          shippingInfo: session.metadata.shippingInfo
            ? JSON.parse(session.metadata.shippingInfo)
            : {},
          totalAmount: session.amount_total / 100,
          paymentStatus: "Paid",
          paymentIntentId: session.payment_intent,
          orderStatus: "Processing",
        };

        const newOrder = await Order.create(orderData);
        console.log("✅ Order saved to DB:", newOrder._id);

        await SendMail(
          "tempo7691@gmail.com",
          "New Order Received",
          "You have a new order!",
          "Admin"
        );

        if (orderData.shippingInfo.email) {
          await SendMail(
            orderData.shippingInfo.email,
            "Order Generated Successfully",
            "We have received your order, thank you!",
            orderData.shippingInfo.fullName || "Customer"
          );
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
  } catch (err) {
    console.error("❌ Error handling webhook:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
