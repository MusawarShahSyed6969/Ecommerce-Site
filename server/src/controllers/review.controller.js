import mongoose from 'mongoose';
import { Review } from '../models/Review.js';
import { Product } from '../models/Product.js';

export async function addReview(req, res) {
  const { productId, rating, comment } = req.body;
  if (!productId || !rating) return res.status(400).json({ success: false, message: 'productId and rating required' });
  const review = await Review.create({ user: req.user.id, product: productId, rating, comment });
  await recalcProductRating(productId);
  return res.status(201).json({ success: true, data: { review } });
}

export async function updateReview(req, res) {
  const { id } = req.params;
  const review = await Review.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true });
  if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
  await recalcProductRating(review.product);
  return res.json({ success: true, data: { review } });
}

export async function deleteReview(req, res) {
  const { id } = req.params;
  const review = await Review.findOneAndDelete({ _id: id, user: req.user.id });
  if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
  await recalcProductRating(review.product);
  return res.json({ success: true, message: 'Review deleted' });
}

export async function listProductReviews(req, res) {
  const { productId } = req.params;
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ success: false, message: 'Invalid productId' });
  }
  const reviews = await Review.find({ product: productId }).populate('user', 'name');
  return res.json({ success: true, data: { reviews } });
}

async function recalcProductRating(productId) {
  const productObjectId = new mongoose.Types.ObjectId(productId);
  const agg = await Review.aggregate([
    { $match: { product: productObjectId } },
    { $group: { _id: '$product', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  const { avg = 0, count = 0 } = agg[0] || {};
  await Product.findByIdAndUpdate(productId, { ratingAvg: avg, ratingCount: count });
}
