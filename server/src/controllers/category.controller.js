import mongoose from 'mongoose';
import { Category } from '../models/Category.js';

export async function listCategories(req, res) {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });
  return res.json({ success: true, data: { categories } });
}

export async function getCategory(req, res) {
  const { idOrSlug } = req.params;
  const byId = mongoose.isValidObjectId(idOrSlug) ? { _id: idOrSlug } : null;
  const category = await Category.findOne(byId ? byId : { slug: idOrSlug });
  if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
  return res.json({ success: true, data: { category } });
}

export async function createCategory(req, res) {
  const { name, description, imageUrl } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'name required' });
  const category = await Category.create({ name, description, imageUrl });
  return res.status(201).json({ success: true, data: { category } });
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
  if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
  return res.json({ success: true, data: { category } });
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
  return res.json({ success: true, message: 'Category deleted' });
}
