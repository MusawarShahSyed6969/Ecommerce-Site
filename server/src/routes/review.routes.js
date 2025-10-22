import { Router } from 'express';
import { body, param } from 'express-validator';
import { addReview, deleteReview, listProductReviews, updateReview } from '../controllers/review.controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validate } from '../utils/validators.js';

const router = Router();

router.get('/product/:productId', [param('productId').isString()], validate, listProductReviews);

router.post(
  '/',
  requireAuth,
  [body('productId').isString(), body('rating').isInt({ min: 1, max: 5 }), body('comment').optional().isString()],
  validate,
  addReview
);

router.put(
  '/:id',
  requireAuth,
  [param('id').isString(), body('rating').optional().isInt({ min: 1, max: 5 }), body('comment').optional().isString()],
  validate,
  updateReview
);

router.delete('/:id', requireAuth, [param('id').isString()], validate, deleteReview);

export default router;
