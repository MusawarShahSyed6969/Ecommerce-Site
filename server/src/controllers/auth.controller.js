import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config, durations, getAccessTokenCookieOptions, getRefreshTokenCookieOptions } from '../config/env.js';

function signAccessToken(user) {
  return jwt.sign({ role: user.role }, config.jwtAccessSecret, {
    subject: String(user._id),
    expiresIn: config.accessTokenTtl,
  });
}

function signRefreshToken(user) {
  return jwt.sign({ type: 'refresh' }, config.jwtRefreshSecret, {
    subject: String(user._id),
    expiresIn: config.refreshTokenTtl,
  });
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'name, email, password required' });
  }
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ success: false, message: 'Email already in use' });
  const user = await User.create({ name, email, password });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  res.cookie('accessToken', accessToken, getAccessTokenCookieOptions());
  res.cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
  return res.status(201).json({ success: true, data: { user: sanitize(user), accessToken, refreshToken } });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  res.cookie('accessToken', accessToken, getAccessTokenCookieOptions());
  res.cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
  return res.json({ success: true, data: { user: sanitize(user), accessToken, refreshToken } });
}

export async function logout(req, res) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.json({ success: true, message: 'Logged out' });
}

export async function getMe(req, res) {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return res.json({ success: true, data: { user } });
}

export async function refresh(req, res) {
  try {
    const token = req.cookies?.refreshToken || (req.body?.refreshToken);
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const payload = jwt.verify(token, config.jwtRefreshSecret);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    res.cookie('accessToken', accessToken, getAccessTokenCookieOptions());
    res.cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
    return res.json({ success: true, data: { accessToken, refreshToken } });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

function sanitize(user) {
  const obj = user.toObject();
  delete obj.password;
  return obj;
}
