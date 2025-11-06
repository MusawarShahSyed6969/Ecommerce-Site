const express = require("express");
const { getAllOrders, updateOrderStatus, getOrderById, getUserOrders } = require("../controllers/OrdersController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/roles");
const router = express.Router();

// Protected routes: admin only
router.get("/", protect, authorize("admin"), getAllOrders);            // GET all orders
router.get("/user", protect, getUserOrders); // ✅ New route


router.get("/:id", protect, getOrderById);         // GET single order by ID
router.put("/:id/status", protect, authorize("admin"), updateOrderStatus); // UPDATE status

module.exports = router;
