import bcrypt from 'bcrypt';

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    getAllUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, context, info) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await context.models.User.create({
          ...otherArgs,
          password: hashedPassword,
        }); // Args are from our schema/user/mutation
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
