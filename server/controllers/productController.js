const Product = require('../models/Product');
const Category = require('../models/Category');

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Admin
 */
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountedPrice,
      category,
      brand,
      countInStock,
      featured,
    } = req.body;

    // 1️⃣ Basic validation
    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: 'Name, price, and category are required' });
    }

    // 2️⃣ Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // 3️⃣ Handle images
    const images = req.body.images || []; // Expected: [{ url, public_id }]

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

    // 5️⃣ Save product
    const createdProduct = await product.save();

    res.status(201).json({
      message: '✅ Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({ message: 'Server error, could not create product' });
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */



exports.getProducts = async (req, res) => {
  try {
    const { category, featured, search, maxPrice, minRating, brand, sort } = req.query;
    const filter = {};

    // 🟢 CATEGORY FILTER (by name)
    if (category && category !== "any") {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter.category = categoryDoc._id;
    }

    // 🟢 FEATURED FILTER
    if (featured) filter.featured = featured === "true";

    // 🟢 SEARCH FILTER (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // 🟢 BRAND FILTER (case-insensitive)
    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }

    // 🟢 PRICE FILTER (<= maxPrice)
    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    // 🟢 RATING FILTER (>= minRating)
    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    // 🟢 SORT HANDLER
    let sortOption = {};
    switch (sort) {
      case "price-low-high":
        sortOption = { price: 1 };
        break;
      case "price-high-low":
        sortOption = { price: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 }; // relevance/default
        break;
    }

    console.log("Filter:", filter);
    console.log("Sort:", sortOption);

    // 🟢 QUERY DATABASE
    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOption);

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server error, could not fetch products" });
  }
};




/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'category',
      'name'
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({ message: 'Server error, could not fetch product' });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      description,
      price,
      discountedPrice,
      category,
      brand,
      countInStock,
      featured,
      images,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If category is changed, verify it exists
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ?? product.price;
    product.discountedPrice = discountedPrice ?? product.discountedPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.countInStock = countInStock ?? product.countInStock;
    product.featured = featured ?? product.featured;
    product.images = images || product.images;

    const updatedProduct = await product.save();

    res.status(200).json({
      message: '✅ Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(500).json({ message: 'Server error, could not update product' });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.status(200).json({ message: '🗑️ Product deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({ message: 'Server error, could not delete product' });
  }
};

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
exports.getFeaturedProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const featuredProducts = await Product.find({ featured: true })
      .limit(limit)
      .populate('category', 'name');

    res.status(200).json({
      count: featuredProducts.length,
      products: featuredProducts,
    });
  } catch (error) {
    console.error('❌ Error fetching featured products:', error);
    res
      .status(500)
      .json({ message: 'Server error, could not fetch featured products' });
  }
};

/**
 * @desc    Get products by category ID
 * @route   GET /api/products/category/:categoryId
 * @access  Public
 */
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ category: categoryId }).populate(
      'category',
      'name'
    );

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('❌ Error fetching products by category:', error);
    res
      .status(500)
      .json({ message: 'Server error, could not fetch products by category' });
  }
};

/**
 * @desc    Get products by brand name
 * @route   GET /api/products/brand/:brand
 * @access  Public
 */
exports.getProductsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;

    if (!brand) {
      return res.status(400).json({ message: 'Brand name is required' });
    }

    // Case-insensitive brand search
    const products = await Product.find({
      brand: { $regex: new RegExp(brand, 'i') },
    }).populate('category', 'name');

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this brand' });
    }

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('❌ Error fetching products by brand:', error);
    res
      .status(500)
      .json({ message: 'Server error, could not fetch products by brand' });
  }
};
