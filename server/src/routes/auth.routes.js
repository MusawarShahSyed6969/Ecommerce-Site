import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, refresh, register, getMe } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validate } from '../utils/validators.js';

const router = Router();

router.post(
  '/register',
  [
    body('name').isString().isLength({ min: 2 }).trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  validate,
  register
);

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').isString().isLength({ min: 6 })],
  validate,
  login
);

router.post('/logout', logout);
router.get('/me', requireAuth, getMe);
router.post('/refresh', refresh);

export default router;
