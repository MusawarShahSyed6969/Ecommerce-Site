const express = require("express");
const {
  createReview,
  getProductReviews,
  deleteReview,
  getAllReviews
} = require("../controllers/ReviewController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createReview);
router.get("/product/:productId", getProductReviews);
router.get("/", protect, getAllReviews);
router.delete("/:id", protect, deleteReview);

module.exports = router;
