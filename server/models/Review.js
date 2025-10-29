const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // Reference to the user who wrote the review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to the product being reviewed
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Name (optional if you want to show public name instead of fetching user.name)
    name: {
      type: String,
      trim: true,
    },

    // Star rating (1–5)
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    // Review comment
    comment: {
      type: String,
      trim: true,
      required: [true, "Please add a review comment"],
    },

    // Optional: for verified purchase indicator
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent duplicate reviews per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// ⭐ Static method to calculate & update product average rating
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

  // Update Product document with latest average rating
  if (stats.length > 0) {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      averageRating: stats[0].avgRating,
      numOfReviews: stats[0].numOfReviews,
    });
  } else {
    await mongoose.model("Product").findByIdAndUpdate(productId, {
      averageRating: 0,
      numOfReviews: 0,
    });
  }
};

// 📦 Post middleware to recalc ratings after save/remove
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.product);
});
reviewSchema.post("remove", function () {
  this.constructor.calcAverageRatings(this.product);
});

module.exports = mongoose.model("Review", reviewSchema);


