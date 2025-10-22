import { ApiError } from '../utils/apiResponse.js';

// eslint-disable-next-line no-unused-vars
export function notFoundHandler(req, res, next) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ success: false, message: err.message, details: err.details });
  }
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'test') {
    // Minimal logging; rely on morgan for requests
    // eslint-disable-next-line no-console
    console.error('[Error]', { message: err.message, stack: err.stack });
  }
  return res.status(status).json({ success: false, message });
}
