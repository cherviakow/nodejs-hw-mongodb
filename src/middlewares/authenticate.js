// import createHttpError from 'http-errors';
// import { Session } from '../models/session.js';
// import { User } from '../models/user.js';

// // export async function authenticate(req, res, next) {
// //   const { authorization } = req.headers;

// export async function authenticate (req, res, next) {
// const authHeader = req.headers;

// console.log(authHeader);




//   if (authHeader !== 'string') {
//     return next(createHttpError(401, 'Please provide access token'));
//   }

//   // const [bearer, accessToken] = authorization.split(' ', 2);
// const bearer = authHeader.split(' ')[0];
// const accessToken = authHeader.split(' ')[2];



//   if (bearer !== 'Bearer' || !accessToken) {
//     return next(createHttpError(401, 'Please provide access token'));
//   }

//   const session = await Session.findOne({accessToken: accessToken });

//   if (session === null) {
//     return next(createHttpError(401, 'Session not found'));
//   }

//   if (new Date() > session.accessTokenValidUntil) {
//     return next(createHttpError(401, 'Access token is expired'));
//   }

//   const user = await User.findById(session.userId);

//   if (user === null) {
//     return next(createHttpError(401, 'Session not found'));
//   }


//   // req.user = {id: user._id, name: user.name};
//   req.user = user;



//   next();
// }


import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';


export async function authenticate (req, res, next) {
const authHeader = req.headers.authorization;


  if (!authHeader) {
    return next(createHttpError(401, 'Please provide access token!!'));
  }

  // const [bearer, accessToken] = authorization.split(' ', 2);
const bearer = authHeader.split(' ')[0];
const accessToken = authHeader.split(' ')[1];



  if (bearer !== 'Bearer' || !accessToken) {
    return next(createHttpError(401, 'Please provide access token'));
  }

  const session = await Session.findOne({accessToken: accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'Session not found'));
  }


  // req.user = {id: user._id, name: user.name};
  req.user = user;

  next();
}
