import { Router } from 'express';
import { body, param } from 'express-validator';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validate } from '../utils/validators.js';
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from '../controllers/cart.controller.js';

const router = Router();

router.use(requireAuth);

router.get('/', getCart);
router.post('/', [body('productId').isString(), body('quantity').optional().isInt({ min: 1 })], validate, addToCart);
router.patch('/', [body('productId').isString(), body('quantity').isInt()], validate, updateCartItem);
router.delete('/item/:productId', [param('productId').isString()], validate, removeFromCart);
router.delete('/', clearCart);

export default router;
