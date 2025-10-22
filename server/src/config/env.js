import dotenv from 'dotenv';

dotenv.config();

function parseBoolean(value, fallback = false) {
  if (value === undefined) return fallback;
  const normalized = String(value).trim().toLowerCase();
  return ['true', '1', 'yes', 'y', 'on'].includes(normalized);
}

function parseNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseDurationToMs(value, fallbackMs) {
  if (!value) return fallbackMs;
  const match = String(value).trim().toLowerCase().match(/^(\d+)(ms|s|m|h|d)?$/);
  if (!match) return fallbackMs;
  const amount = Number(match[1]);
  const unit = match[2] || 'ms';
  const unitMap = { ms: 1, s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return amount * (unitMap[unit] || 1);
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: (process.env.NODE_ENV || 'development') === 'production',
  port: parseNumber(process.env.PORT, 5000),
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_URI || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'change_me_access',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change_me_refresh',
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || '7d',
  cookies: {
    domain: process.env.COOKIE_DOMAIN || undefined,
    sameSite: (process.env.COOKIE_SAME_SITE || 'Lax'),
    secure: parseBoolean(process.env.COOKIE_SECURE, false),
  },
  logging: {
    morganFormat: process.env.MORGAN_FORMAT || 'dev',
  },
};

export const durations = {
  accessTokenMs: parseDurationToMs(config.accessTokenTtl, 15 * 60_000),
  refreshTokenMs: parseDurationToMs(config.refreshTokenTtl, 7 * 24 * 60 * 60_000),
};

export function getAccessTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: config.cookies.secure || config.isProduction,
    sameSite: config.cookies.sameSite,
    domain: config.cookies.domain,
    path: '/',
    maxAge: durations.accessTokenMs,
  };
}

export function getRefreshTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: config.cookies.secure || config.isProduction,
    sameSite: config.cookies.sameSite,
    domain: config.cookies.domain,
    path: '/',
    maxAge: durations.refreshTokenMs,
  };
}
