const Category = require("../models/Category");

// @desc    Create a new category
// @route   POST /api/categories
// @access  Admin
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image, featured } = req.body;

    if (!name) return res.status(400).json({ message: "Category name is required" });

    // Check if category already exists
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = new Category({
      name,
      description: description || "",
      image: image || {},
      featured: featured || false
    });

    const savedCategory = await category.save();
    res.status(201).json({ message: "Category created successfully", category: savedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating category" });
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching category" });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Admin
exports.updateCategory = async (req, res) => {
  try {
    const { name, description, image, featured, isActive } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.name = name || category.name;
    category.description = description || category.description;
    category.image = image || category.image;
    category.featured = featured !== undefined ? featured : category.featured;
    category.isActive = isActive !== undefined ? isActive : category.isActive;

    const updatedCategory = await category.save();
    res.status(200).json({ message: "Category updated", category: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating category" });
  }
};

// @desc    Delete (soft-delete) category
// @route   DELETE /api/categories/:id
// @access  Admin
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.isActive = false;
    await category.save();

    res.status(200).json({ message: "Category deactivated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting category" });
  }
};
