const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const { upload } = require("../middleware/upload");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsByBrand,
  deleteProductImage,

} = require('../controllers/productController');

// ---------------------------------------
// 🛒 Public Routes
// ---------------------------------------
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/brand/:brand', getProductsByBrand);
// router.get('/brands', GetAllBrands);
router.get('/:id', getProductById);

// ---------------------------------------
// 🔐 Admin Routes (with upload)
// ---------------------------------------


router.post("/", protect, authorize("admin"), upload.array("images", 5), createProduct);
router.put("/:productId", protect, authorize("admin"), upload.array("images", 5), updateProduct);

router.delete("/:productId/image", protect, authorize("admin"), deleteProductImage);

router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
