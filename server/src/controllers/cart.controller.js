import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

export async function getCart(req, res) {
  const cart = await getOrCreateCart(req.user.id);
  return res.json({ success: true, data: { cart } });
}

export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  if (!productId) return res.status(400).json({ success: false, message: 'productId required' });
  const qty = Math.max(1, Number(quantity));
  const product = await Product.findById(productId);
  if (!product || !product.isActive) return res.status(404).json({ success: false, message: 'Product not found' });
  if (product.stock < qty) return res.status(400).json({ success: false, message: 'Insufficient stock' });

  const cart = await getOrCreateCart(req.user.id);
  const idx = cart.items.findIndex((i) => String(i.product?._id || i.product) === String(product._id));
  const unitPrice = product.price - Math.round((product.price * (product.discountPercent || 0)) / 100);

  if (idx >= 0) {
    cart.items[idx].quantity += qty;
  } else {
    cart.items.push({ product: product._id, quantity: qty, priceAtAddition: unitPrice });
  }

  await cart.save();
  await cart.populate('items.product');
  return res.status(201).json({ success: true, data: { cart } });
}

export async function updateCartItem(req, res) {
  const { productId, quantity } = req.body;
  if (!productId || quantity === undefined) return res.status(400).json({ success: false, message: 'productId and quantity required' });
  const qty = Number(quantity);
  const cart = await getOrCreateCart(req.user.id);
  const idx = cart.items.findIndex((i) => String(i.product?._id || i.product) === String(productId));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Item not in cart' });

  if (qty <= 0) {
    cart.items.splice(idx, 1);
  } else {
    const product = await Product.findById(productId);
    if (!product || !product.isActive) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.stock < qty) return res.status(400).json({ success: false, message: 'Insufficient stock' });
    cart.items[idx].quantity = qty;
  }

  await cart.save();
  await cart.populate('items.product');
  return res.json({ success: true, data: { cart } });
}

export async function removeFromCart(req, res) {
  const { productId } = req.params;
  const cart = await getOrCreateCart(req.user.id);
  const before = cart.items.length;
  cart.items = cart.items.filter((i) => String(i.product?._id || i.product) !== String(productId));
  if (cart.items.length === before) return res.status(404).json({ success: false, message: 'Item not in cart' });
  await cart.save();
  await cart.populate('items.product');
  return res.json({ success: true, data: { cart } });
}

export async function clearCart(req, res) {
  const cart = await getOrCreateCart(req.user.id);
  cart.items = [];
  await cart.save();
  return res.json({ success: true, data: { cart } });
}
