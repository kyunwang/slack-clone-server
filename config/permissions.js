import { createResolver } from './helpers';

// To wrap a resolver
// Is the user logged in?
const requiresAuth = createResolver((parent, args, context) => {
  if (!context.user || !context.user.id) {
    throw new Error('Not authenticated');
  }
});

// const requiresAdmin = requiresAuth.createResolver((parent, args, context) => {
//   if (!context.user.isAdmin) {
//     throw new Error('Is not a Admin');
//   }
// });


export {
  requiresAuth,
//   requiresAdmin,
};
