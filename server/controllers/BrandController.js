const Brand = require("../models/Brand");

/* ---------------- GET ALL BRANDS ---------------- */
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: brands.length,
      brands,
    });
  } catch (error) {
    console.error("❌ Error fetching brands:", error);
    res.status(500).json({ message: "Server error while fetching brands" });
  }
};

/* ---------------- CREATE BRAND ---------------- */
exports.createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const existing = await Brand.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const brand = await Brand.create({
      name,
      description: description || "",
      logo: req.body.logo || {},
    });

    res.status(201).json({
      success: true,
      message: "✅ Brand created successfully",
      brand,
    });
  } catch (error) {
    console.error("❌ Error creating brand:", error);
    res.status(500).json({ message: "Server error while creating brand" });
  }
};

/* ---------------- UPDATE BRAND ---------------- */
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      success: true,
      message: "✅ Brand updated successfully",
      brand: updated,
    });
  } catch (error) {
    console.error("❌ Error updating brand:", error);
    res.status(500).json({ message: "Server error while updating brand" });
  }
};

/* ---------------- DELETE BRAND ---------------- */
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    await brand.deleteOne();

    res.status(200).json({
      success: true,
      message: "🗑️ Brand deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting brand:", error);
    res.status(500).json({ message: "Server error while deleting brand" });
  }
};
