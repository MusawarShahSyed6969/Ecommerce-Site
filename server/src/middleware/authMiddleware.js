import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.accessToken || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : undefined);
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const payload = jwt.verify(token, config.jwtAccessSecret);
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

export function optionalAuth(req, res, next) {
  try {
    const token = req.cookies?.accessToken || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : undefined);
    if (!token) return next();
    const payload = jwt.verify(token, config.jwtAccessSecret);
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch (err) {
    return next();
  }
}

export function requireRole(roles) {
  const roleSet = new Set(Array.isArray(roles) ? roles : [roles]);
  return function roleMiddleware(req, res, next) {
    if (!req.user || !roleSet.has(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    return next();
  };
}
