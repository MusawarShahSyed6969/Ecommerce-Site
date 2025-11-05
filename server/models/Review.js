const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Please add a review comment"],
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// ⭐ Static method to calculate & update product rating and total reviews
reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      rating: stats[0].avgRating.toFixed(1), // → updates Product.rating
      numReviews: stats[0].numOfReviews,     // → updates Product.numReviews
    });
  } else {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      rating: 0,
      numReviews: 0,
    });
  }
};

// 📦 Post middleware to recalc after save/remove
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.product);
});

reviewSchema.post("remove", function () {
  this.constructor.calcAverageRatings(this.product);
});

module.exports = mongoose.model("Review", reviewSchema);
