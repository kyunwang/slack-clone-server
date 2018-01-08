import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import models from './models';
// import resolvers from './graphql/resolvers';
import { typeDefs, resolvers } from './graphql';

// import environmental variables from our variables.env file
require('dotenv').config({ path: './variables.env' });

// The schema and resolvers are combined together
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const graphqlEndpoint = '/graphql';

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({ schema }), // Here we handle our endpoint
);

app.use(
  '/graphical',
  graphiqlExpress({ endpointURL: graphqlEndpoint }), // Tell graphical where our graphql endpoint is
);

// sync() will create all table if they doesn't exist in database
models.sequelize.sync({ force: true }).then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
