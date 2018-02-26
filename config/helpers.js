import _ from 'lodash';

// A function to format errors
function formatErrors(err, models) {
  // Check if err is a ValidationError
  if (err instanceof models.sequelize.ValidationError) {
	  // _.pick({ a: 1, b: 2 }, 'a') => { a: 1 }
	  // get path and message from the error
	  return err.errors.map(x => _.pick(x, ['path', 'message']));
  }

  return [{ path: 'name', message: 'Something went wrong' }];
}

// Takes a resolver to create another one
function createResolver(resolver) {
  const baseResolver = resolver;

  // Adding a function createResolver to resolver
  // Which takes a child resolver and return a new resolver. Childresolver
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context, info) => {
		 // First execute the resolver passed in the createResolver params
      await resolver(parent, args, context, info);
      // Then resolve the passed in resolver/childresolver in madeResolver.createResolver(...)
      return childResolver(parent, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
}

export {
  formatErrors,
  createResolver,
};

