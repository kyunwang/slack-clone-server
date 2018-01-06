// resolvers should match the schema
export default {
  Query: {
    hi: (parent, args, context, info) => 'Hi there',
    bye: (parent, args, context, info) => 'Bye mate',
  },
};
