import jwt from 'jsonwebtoken';

import models from '../models';
import { SECRET, SECRET2 } from './CONSTANTS';

import { refreshTokens } from './auth';

async function addUser(req, res, next) {
// Get the header token sent from the client
  const token = req.headers['x-token'];

  if (token) {
    try {
      // Check wether the token is not expired
      // And wether it is signed with SECRET
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      // If token is invalid
      const refreshToken = req.header['x-refresh-token'];
      // Attempt to refresh the tokens
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);

      // If the tokens are alright
      if (newTokens.token && newTokens.refreshToken) {
        // Make the tokens available for the client as headers
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      // Set the user as we receive a new one from newTokens
      req.user = newTokens.user;
    }
  }

  next();
}


export {
  addUser,
};
