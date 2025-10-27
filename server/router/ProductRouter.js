const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsByBrand,
  GetAllBrands,
} = require('../controllers/productController');

// ---------------------------------------
// 🛒 Public Routes
// ---------------------------------------

// List all first
router.get('/', getProducts);

// Put static routes BEFORE :id
router.get('/featured', getFeaturedProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/brand/:brand', getProductsByBrand);
router.get('/brands', GetAllBrands);

// Then dynamic route at the bottom
router.get('/:id', getProductById);

// ---------------------------------------
// 🔐 Admin Routes
// ---------------------------------------
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
