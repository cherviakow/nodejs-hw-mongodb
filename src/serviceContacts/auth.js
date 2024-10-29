import httpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export async function registerUser(payload) {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw httpError(409, 'Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (user === null) {
    throw httpError(401, 'Email or password is incorrect!');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch !== true) {
    throw httpError(401, 'Email or password is incorrect');
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 720 * 60 * 60 * 1000),
  });
}

export function logoutUser(sessionId) {
  return Session.deleteOne({ _id: sessionId });
}

export async function refreshSession(sessionId, refreshToken) {
  const session = Session.findById(sessionId);

  if (session === null) {
    throw httpError(401, 'Session not found');
  }

  if (session.refreshToken !== refreshToken) {
    throw httpError(401, 'Session not found');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw httpError(401, 'Access token expired');
  }

  await Session.deleteOne({_id: session._id});


  return Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 720 * 60 * 60 * 1000),
  });
};
