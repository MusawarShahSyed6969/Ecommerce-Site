const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional for guest checkout
    },
    items: [
      {
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingInfo: {
      fullName: String,
      email: String,
      address: String,
      city: String,
      zipCode: String,
      phone: String,
    },
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentIntentId: String, // from Stripe
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered","Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
