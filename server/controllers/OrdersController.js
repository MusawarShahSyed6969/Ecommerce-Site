const Order = require("../models/Order");

// ✅ Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // optional, fetch user info
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// ✅ Get orders of the currently logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    // req.user._id is set by your auth middleware (after JWT verification)
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate("user", "name email") // optional, just for clarity in response
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.error("❌ Failed to fetch user orders:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ✅ Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.orderStatus = orderStatus; // Processing | Shipped | Delivered
    await order.save();

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("❌ Failed to update order:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get order by ID (optional)
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("❌ Failed to fetch order:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
