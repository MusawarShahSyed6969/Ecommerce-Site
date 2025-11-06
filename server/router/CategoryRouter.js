const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/Auth.js");
const { authorize } = require("../middleware/roles.js");

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/CategoryController");

// Public routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin routes
router.post("/", protect, authorize("admin"), createCategory);
router.put("/:id", protect, authorize("admin"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;
