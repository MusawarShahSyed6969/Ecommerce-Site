// src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      text: true,
    },
    description: {
      type: String,
      text: true,
      default: '',
    },
    long_description: {
      type: String,
      text: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountedPrice: {
      type: Number,
      min: [0, 'Discounted price cannot be negative'],
      default: 0,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String },
      },
    ],
    // 👇 Use reference to Category schema instead of plain string
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    countInStock: {
      type: Number,
      default: 0,
      min: [0, 'Stock count cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true, // helps soft-delete products later
    },
  },
  { timestamps: true } // 👈 Automatically adds createdAt and updatedAt
);

// 🔍 Text index for better search
productSchema.index({ name: 'text', description: 'text' });

// 🧮 Virtual field for discount percentage (not stored in DB)
productSchema.virtual('discountPercent').get(function () {
  if (!this.discountedPrice || this.discountedPrice >= this.price) return 0;
  return Math.round(((this.price - this.discountedPrice) / this.price) * 100);
});

module.exports = mongoose.model('Product', productSchema);
