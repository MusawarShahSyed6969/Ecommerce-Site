import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, min: 0, max: 100, default: 0 },
    stock: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: String },
    ratingAvg: { type: Number, min: 0, max: 5, default: 0 },
    ratingCount: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
    specs: { type: Map, of: String },
  },
  { timestamps: true }
);

productSchema.virtual('priceAfterDiscount').get(function priceAfterDiscount() {
  if (!this.discountPercent) return this.price;
  return Math.round((this.price * (100 - this.discountPercent)) / 100);
});

productSchema.pre('save', function generateSlug(next) {
  if (!this.isModified('title')) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export const Product = mongoose.model('Product', productSchema);
