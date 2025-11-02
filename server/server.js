require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DB");
const paymentRoutes = require("./router/Payment.js");
const StripeWebhookHandler = require("./router/StripeWebhook.js");

const authRouter = require("./router/AuthRouter");
const productRouter = require("./router/ProductRouter");
const categoryRouter = require("./router/CategoryRouter");
const reviewRoutes = require("./router/ReviewRouter.js");
const orderRoutes = require("./router/OrderRoute.js");
const brandRoutes = require("./router/BrandRoutes.js");

const app = express();
app.use(cors());

// ⚠️ Stripe webhook route must come before express.json() for raw body
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), StripeWebhookHandler);

// ✅ Now use JSON parser for all other routes
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/brands", brandRoutes);


connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
