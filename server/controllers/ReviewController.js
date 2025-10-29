// controllers/reviewController.js
const Review = require("../models/Review.js");

/**
 * Create new review
 */
// ✅ controllers/reviewController.js


exports.createReview = async (req, res) => {
  try {
    // Fallback: if frontend didn't send productId, use route param
    const productId = req.body.productId || req.params.productId;

    console.log(productId);
    

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const { rating, comment } = req.body;

    console.log("🧩 Body:", req.body);
    console.log("🧑‍💻 Authenticated User:", req.user);

    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this product." });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId, // ✅ Always defined now
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
