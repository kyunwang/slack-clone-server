import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const createTokens = (user, secret, secret2) => {
  // Picking the id to strore in the token
  const createToken = jwt.sign(
    { user: _.pick(user, ['id']) },
    secret,
    { expiresIn: '20m' }, // Expires in ..minutes
  );

  const createRefreshToken = jwt.sign(
	  { user: _.pick(user, 'id') },
	  secret2,
	  { expiresIn: '7d' },
  );

  return [createToken, createRefreshToken];
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
