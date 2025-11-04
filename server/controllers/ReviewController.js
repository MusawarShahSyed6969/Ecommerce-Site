// controllers/reviewController.js
const Review = require("../models/Review.js");
const Order = require('../models/Order');
const Product = require('../models/Product');

/**
 * Create new review
 */
// ✅ controllers/reviewController.js



exports.createReview = async (req, res) => {
  try {
    const productId = req.body.productId || req.params.productId;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const { rating, comment } = req.body;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this product." });
    }

    // ✅ Recommended: check orders by product ID (add product field to your order items)
    let orders = await Order.find({
      user: req.user._id,
      "items.product": productId,
      paymentStatus: "Paid",
    });

    // ⚠️ Fallback if items.product is not available: match by product name
    if (!orders.length) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      orders = await Order.find({
        user: req.user._id,
        paymentStatus: "Paid",
        "items.name": product.name,
      });
    }

    if (!orders.length) {
      return res.status(400).json({ message: "You can only review products you bought." });
    }

    // Create the review
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
      name: req.user.name,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("❌ Review error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all reviews for a specific product
 */
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all reviews (admin)
 */
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("product", "name");

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a review
 */
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Only allow the user who made the review or an admin to delete
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();

    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
