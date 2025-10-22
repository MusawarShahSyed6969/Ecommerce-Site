import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import slugify from 'slugify';

export async function listProducts(req, res) {
  const { page = 1, limit = 12, category, search, sort } = req.query;
  const query = { isActive: true };
  if (category) {
    const byId = mongoose.isValidObjectId(category) ? { _id: category } : null;
    const cat = await Category.findOne(byId ? byId : { slug: category });
    if (cat) query.category = cat._id;
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
    ];
  }
  const sortMap = {
    newest: { createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating: { ratingAvg: -1 },
  };
  const sorting = sortMap[sort] || { createdAt: -1 };
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Math.min(100, Number(limit)));
  const [items, total] = await Promise.all([
    Product.find(query).sort(sorting).skip((pageNum - 1) * limitNum).limit(limitNum).populate('category'),
    Product.countDocuments(query),
  ]);
  return res.json({ success: true, data: { items, total, page: pageNum, pages: Math.ceil(total / limitNum) } });
}

export async function getProduct(req, res) {
  const { idOrSlug } = req.params;
  const byId = mongoose.isValidObjectId(idOrSlug) ? { _id: idOrSlug } : null;
  const product = await Product.findOne(byId ? byId : { slug: idOrSlug }).populate('category');
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  return res.json({ success: true, data: { product } });
}

export async function createProduct(req, res) {
  const data = req.body;
  if (!data.title || !data.price || !data.stock || !data.category) {
    return res.status(400).json({ success: false, message: 'title, price, stock, category required' });
  }
  data.slug = slugify(data.title, { lower: true, strict: true });
  const product = await Product.create(data);
  return res.status(201).json({ success: true, data: { product } });
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const data = { ...req.body };
  if (data.title) data.slug = slugify(data.title, { lower: true, strict: true });
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  return res.json({ success: true, data: { product } });
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  return res.json({ success: true, message: 'Product deleted' });
}
