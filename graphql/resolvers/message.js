export default {
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
      try {
        console.log('Message created');
		  await models.Message.create({ ...args, userId: user.id });
        return true;
      } catch (err) {
        console.log('Create message error: ', err);
        return false;
      }
    },
  },
};
