import { Router } from 'express';
import { body, param } from 'express-validator';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../utils/validators.js';
import { createOrder, getMyOrders, getOrderById, listAllOrders, updateOrderStatus } from '../controllers/order.controller.js';

const router = Router();

router.use(requireAuth);

router.post('/', [body('items').optional().isArray()], validate, createOrder);
router.get('/', getMyOrders);
router.get('/admin/all', requireRole('admin'), listAllOrders);
router.get('/:id', [param('id').isString()], validate, getOrderById);
router.patch('/:id/status', requireRole('admin'), [param('id').isString(), body('status').isString()], validate, updateOrderStatus);

export default router;
