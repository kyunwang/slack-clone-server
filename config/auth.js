import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const createTokens = (user, secret, secret2) => {
// Picking the id to strore in the token
  const createToken = jwt.sign(
    { user: _.pick(user, ['id']) }, // We pass the id to user
    secret, // Signs the token with secret
    { expiresIn: '20m' }, // Expires in ..minutes
  );

  const createRefreshToken = jwt.sign(
    { user: _.pick(user, 'id') },
    secret2,
    { expiresIn: '7d' },
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, models, SECRET, SECRET2) => {
  let userId = 0;
  try {
	 // Grab the token to get the id
	 // Decodes the payload without verifying
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  // Check wether the id is ok
  if (!userId) {
    return {};
  }

  // Find our user
  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  // Return if bad user
  if (!user) {
    return {};
  }


  const refreshSecret = user.password + SECRET2;

  try {
    // Check whether the refresh token is not expired and is signed with refreshSecret
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  // Create new /refresh tokens
  const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
// Search for a user with 'this email'
// Get raw data only without the extra functions forupdate, delete, associations ect.
  const user = await models.User.findOne({ where: { email }, raw: true });

  if (!user) {
    return {
      ok: false,
      errors: [{ path: 'email', message: 'No such user exists' }],
    };
  }

  // Bcrypt will compare these two passwords and return a bool
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Incorrect email and login combination' }],
    };
  }

  // user.password is the hashed password
  // Now tje token will auto expire if the password changes
  const refreshTokenSecret = user.password + SECRET2;

  // All ok? Create the JWT token for the user
  const [token, refreshToken] = createTokens(user, SECRET, refreshTokenSecret);

  return {
    ok: true,
    token,
    refreshToken,
  };
};
