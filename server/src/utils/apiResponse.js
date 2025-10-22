export function success(res, data = {}, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function fail(res, message = 'Bad Request', status = 400, details) {
  const payload = { success: false, message };
  if (details) payload.details = details;
  return res.status(status).json(payload);
}

export class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
