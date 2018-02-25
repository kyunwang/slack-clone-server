import _ from 'lodash';

function formatErrors(err, models) {
  // Check if err is a ValidationError
  if (err instanceof models.sequelize.ValidationError) {
	  // _.pick({ a: 1, b: 2 }, 'a') => { a: 1 }
	  // get path and message from the error
	  return err.errors.map(x => _.pick(x, ['path', 'message']));
  }

  return [{ path: 'name', message: 'Something went wrong' }];
}

export { formatErrors };

