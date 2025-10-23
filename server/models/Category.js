// src/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    image: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    featured: {
      type: Boolean,
      default: false, // ✅ Mark category as featured for your component
    },
    isActive: {
      type: Boolean,
      default: true, // Soft-delete categories
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Category', categorySchema);
