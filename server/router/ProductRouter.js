const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const { createProduct } = require('../controllers/productController');

router.post('/', protect, authorize('admin'), createProduct);

module.exports = router;
