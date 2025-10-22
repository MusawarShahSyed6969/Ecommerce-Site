import { Router } from 'express';
import { body, param } from 'express-validator';
import { requireAuth, requireRole, optionalAuth } from '../middleware/authMiddleware.js';
import { validate } from '../utils/validators.js';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/product.controller.js';

const router = Router();

router.get('/', optionalAuth, listProducts);
router.get('/:idOrSlug', optionalAuth, getProduct);

router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  [
    body('title').isString().isLength({ min: 2 }),
    body('price').isNumeric(),
    body('stock').isInt({ min: 0 }),
    body('category').isString(),
  ],
  validate,
  createProduct
);

router.put(
  '/:id',
  requireAuth,
  requireRole('admin'),
  [param('id').isString()],
  validate,
  updateProduct
);

router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  [param('id').isString()],
  validate,
  deleteProduct
);

export default router;
