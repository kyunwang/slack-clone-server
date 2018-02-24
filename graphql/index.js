// Importing our schemas and resolvers to merge them to one item/object each
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

// Getting all the schemas
const schemaArray = fileLoader(path.join(__dirname, './schema'));
// Merging the schemas to one 'file'
const typeDefs = mergeTypes(schemaArray);

// Getting all the resolvers
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));
// Merging the resolvers into one 'file'
const resolvers = mergeResolvers(resolversArray);

export { typeDefs, resolvers };
