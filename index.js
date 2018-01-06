import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';

// The schema and resolvers are combined together
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const PORT = 8081;
const graphqlEndpoint = '/graphql';

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({ schema }), // Here we handle our endpoint
);

app.use(
  '/graphical',
  graphiqlExpress({ endpointURL: '/graphql' }), // Tell graphical where our graphql endpoint is
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
