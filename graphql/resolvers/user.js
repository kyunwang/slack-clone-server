import bcrypt from 'bcrypt'; // Bcrypt to hash the password
import _ from 'lodash';

const formatErrors = (err, models) => {
  console.log(err);

  // Check if err is a ValidationError
  if (err instanceof models.sequelize.ValidationError) {
    // _.pick({ a: 1, b: 2 }, 'a') => { a: 1 }
    // get path and message from the error
    return err.errors.map(x => _.pick(x, ['path', 'message']));
  }

  return [{ path: 'name', message: 'Something went wrong' }];
};

// (parent, args, context, info)
export default {
  Query: {
    // Finds a user based on the id
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    getAllUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { models }) => {
		 console.log(otherArgs);

      try {
        // Check the length of the password
        if (password.length < 6 || password.length > 100) {
          // Return an error if ...
          return {
            ok: false,
            errors: [
              {
                path: 'password',
                message: 'The password needs to be between 6 and 100 characters long',
              },
            ],
          };
        }
        // Hash the password with 12 saltrounds
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create/insert the user in the database (other args are username, email ect)
        // Args are from our schema/user/mutation
        const user = await models.User.create({
          ...otherArgs,
          password: hashedPassword,
        });

        return {
          ok: true,
          user,
        };
      } catch (err) {
        // If an error occured
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
  RegisterResponse: {},
};
