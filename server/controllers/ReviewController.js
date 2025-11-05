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

    // 1️⃣ Get product info (to use product.name if needed)
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // 2️⃣ Check for existing review
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product." });
    }

    // 3️⃣ Check if user purchased this product
    // We can't rely on productId, so check by product name (and fallback to paid orders only)
    const purchased = await Order.findOne({
      user: req.user._id,
      paymentStatus: "Paid",
      $or: [
        // If future orders contain `items.product` ObjectIds
        { "items.product": productId },
        // Fallback: match product name (current schema)
        { "items.name": product.name },
      ],
    });

    if (!purchased) {
      return res.status(403).json({
        message: "You can only review products you have purchased.",
      });
    }

    // 4️⃣ Create review
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
      name: req.user.name,
      isVerifiedPurchase: true, // ✅ mark verified
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
// controllers/reviewController.js

// 📦 Get reviews for a product (default 7 recent reviews)
// controllers/reviewController.js

exports.getProductReviews = async (req, res) => {
  try {
    const { limit } = req.query;
    const { productId } = req.params;

    console.log(productId, limit);


    const query = { product: productId };

    // Get total count (without fetching all docs)
    const totalReviews = await Review.countDocuments(query);

    // Fetch only the latest reviews (limited)
    let mongoQuery = Review.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    if (limit !== "all") {
      mongoQuery = mongoQuery.limit(parseInt(limit, 10));
    }

    const reviews = await mongoQuery;

    res.status(200).json({
      success: true,
      total: totalReviews, // ✅ total count of all reviews
      count: reviews.length, // number of reviews returned in this request
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
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
