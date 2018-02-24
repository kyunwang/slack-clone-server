export default {


  Mutation: {
    createTeam: async (parent, args, { models, user }) => {
      try {
        console.log('Team created');
        await models.Team.create({ ...args, owner: user.id });
        return true;
      } catch (err) {
        console.log('Create team error: ', err);
        return false;
      }
    },
  },
};
