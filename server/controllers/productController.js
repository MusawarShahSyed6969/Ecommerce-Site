// src/controllers/productController.js
const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc    Create a new product
// @route   POST /api/products
// @access  Admin
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountedPrice,
      category, // should be category _id
      brand,
      countInStock,
      featured,
    } = req.body;

    // 1️⃣ Validation
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    // 2️⃣ Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // 3️⃣ Handle images (if uploaded via req.files or req.body.images)
    // Example: req.body.images = [{url, public_id}]
    const images = req.body.images || [];

    // 4️⃣ Create product
    const product = new Product({
      name,
      description,
      price,
      discountedPrice: discountedPrice || 0,
      images,
      category,
      brand: brand || 'Generic',
      countInStock: countInStock || 0,
      featured: featured || false,
    });

    // 5️⃣ Save to DB
    const createdProduct = await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, could not create product' });
  }
};
