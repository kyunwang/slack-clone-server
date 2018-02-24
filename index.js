import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';

// Import our sequelize database models for postgres
import models from './models';

// Import the all merged schemas and resolvers
import { typeDefs, resolvers } from './graphql';

require('dotenv').config({ path: './variables.env' });

// import environmental variables from our variables.env file

// The schema and resolvers are combined together
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// In case we ever change the endpoint
const graphqlEndpoint = '/graphql';

// Initialize our express app
const app = express();

// Allow cors on localhost
app.use(cors('http://localhost'));

// Here we create our endpoint and handle it with graphqlExpress
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema, // Here we pass in our schema
    context: {
      models, // We pass in our sequelize/postgres models
      user: {
        id: 1,
      },
    },
  }),
);

// Set our graphiql endpoint and tell it what our graphql endpoint is
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));


// sync() will create all tables if they don't exist in the database
models.sequelize.sync({ force: false }).then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
