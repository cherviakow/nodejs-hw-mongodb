import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  // requestResetPassword,
  requestResetEmail,
  resetPassword,
} from '../serviceContacts/auth.js';

export async function registerController(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const newUser = await registerUser(payload);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data: newUser,
  });
}

export async function loginController(req, res) {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Successfully logged in an user',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function logoutController(req, res) {
  const { sessionId } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).end();
}

export async function refreshController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Session refresh',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function requestResentEmailController(req, res) {
  const { email } = req.body;

  // await requestResetPassword(email)
  await requestResetEmail(email);


  res.send({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
}

export async function resetPasswordController(req, res){
const {password, token} = req.body;

await resetPassword(password, token);

  res.status(200).json({
    status: 200,
    message: "Password has been reset",
    data: {}
  });
}
