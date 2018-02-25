import { tryLogin } from '../../config/auth';
import { formatErrors } from '../../config/helpers';

// (parent, args, context, info)
export default {
  Query: {
    // Finds a user based on the id
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    getAllUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
	 login: async (parent, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),

    register: async (parent, args, { models }) => {
      try {
        // Create/insert the user in the database (other args are username, email ect)
        // Args are from our schema/user/mutation
        const user = await models.User.create(args);

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
