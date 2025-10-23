require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DB");

// Routers
const authRouter = require("./router/AuthRouter");
const productRouter = require("./router/ProductRouter");
const categoryRouter = require("./router/CategoryRouter");
//const orderRouter = require("./router/OrderRouter");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use("/api/auth", authRouter);          // Auth routes
app.use("/api/products", productRouter);   // Product routes
app.use("/api/categories", categoryRouter); // Category routes
//app.use("/api/orders", orderRouter);       // Order routes

// ✅ Connect to DB
connectDB();

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
