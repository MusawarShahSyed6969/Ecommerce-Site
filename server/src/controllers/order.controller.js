import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';

function computeTotals(items, shippingFee = 0, taxRate = 0) {
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + shippingFee + tax;
  return { subtotal, shippingFee, tax, total };
}

export async function createOrder(req, res) {
  const userId = req.user.id;
  const { items: bodyItems, shippingAddress, billingAddress, payment = { provider: 'cod' }, shippingFee = 0, taxRate = 0 } = req.body || {};

  let items = [];
  if (Array.isArray(bodyItems) && bodyItems.length > 0) {
    // Build from body items
    const productIds = bodyItems.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const map = new Map(products.map((p) => [String(p._id), p]));
    for (const item of bodyItems) {
      const product = map.get(String(item.productId));
      if (!product || !product.isActive) return res.status(400).json({ success: false, message: 'Invalid product in items' });
      if (product.stock < item.quantity) return res.status(400).json({ success: false, message: 'Insufficient stock' });
      const unitPrice = product.price - Math.round((product.price * (product.discountPercent || 0)) / 100);
      items.push({
        product: product._id,
        title: product.title,
        image: product.images?.[0],
        quantity: item.quantity,
        unitPrice,
        totalPrice: unitPrice * item.quantity,
      });
    }
  } else {
    // Build from cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ success: false, message: 'Cart is empty' });
    for (const ci of cart.items) {
      if (!ci.product.isActive) return res.status(400).json({ success: false, message: 'Inactive product in cart' });
      if (ci.product.stock < ci.quantity) return res.status(400).json({ success: false, message: 'Insufficient stock in cart item' });
      const unitPrice = ci.priceAtAddition || ci.product.price - Math.round((ci.product.price * (ci.product.discountPercent || 0)) / 100);
      items.push({
        product: ci.product._id,
        title: ci.product.title,
        image: ci.product.images?.[0],
        quantity: ci.quantity,
        unitPrice,
        totalPrice: unitPrice * ci.quantity,
      });
    }
  }

  const totals = computeTotals(items, shippingFee, taxRate);

  // Decrement stock (simple approach; for high load, use transactions)
  for (const i of items) {
    const p = await Product.findById(i.product);
    if (!p || p.stock < i.quantity) return res.status(400).json({ success: false, message: 'Insufficient stock during checkout' });
    p.stock -= i.quantity;
    await p.save();
  }

  const order = await Order.create({
    user: userId,
    items,
    shippingAddress,
    billingAddress,
    status: payment?.provider === 'cod' ? 'pending' : 'paid',
    subtotal: totals.subtotal,
    shippingFee: totals.shippingFee,
    tax: totals.tax,
    total: totals.total,
    payment: {
      provider: payment?.provider || 'cod',
      providerId: payment?.providerId,
      status: payment?.status || (payment?.provider === 'cod' ? 'pending' : 'succeeded'),
    },
  });

  // Clear cart if used
  await Cart.updateOne({ user: userId }, { $set: { items: [] } });

  return res.status(201).json({ success: true, data: { order } });
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  return res.json({ success: true, data: { orders } });
}

export async function getOrderById(req, res) {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  if (String(order.user) !== String(req.user.id) && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  return res.json({ success: true, data: { order } });
}

export async function listAllOrders(req, res) {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Math.min(100, Number(limit)));
  const [items, total] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
    Order.countDocuments(),
  ]);
  return res.json({ success: true, data: { items, total, page: pageNum, pages: Math.ceil(total / limitNum) } });
}

export async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const valid = ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'];
  if (!valid.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  return res.json({ success: true, data: { order } });
}
