import { Router } from 'express';
import { body, param } from 'express-validator';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../utils/validators.js';
import { createCategory, deleteCategory, getCategory, listCategories, updateCategory } from '../controllers/category.controller.js';

const router = Router();

router.get('/', listCategories);
router.get('/:idOrSlug', getCategory);

router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  [body('name').isString().isLength({ min: 2 })],
  validate,
  createCategory
);

router.put(
  '/:id',
  requireAuth,
  requireRole('admin'),
  [param('id').isString()],
  validate,
  updateCategory
);

router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  [param('id').isString()],
  validate,
  deleteCategory
);

export default router;
