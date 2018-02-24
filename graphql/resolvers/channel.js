export default {
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        console.log('Channel created');
        await models.Channel.create(args);
        return true;
      } catch (err) {
        console.log('Channelcreate error: ', err);
        return false;
      }
    },
  },
};
