
import { formatErrors } from '../../config/helpers';
import { requiresAuth } from '../../config/permissions';

export default {
  Query: {},

  Mutation: {
    createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        console.log('Team created');
        await models.Team.create({ ...args, owner: user.id });
        return {
          ok: true,
        };
      } catch (err) {
        console.log('Create team error: ', err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
  },
};
