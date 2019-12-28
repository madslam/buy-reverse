import {ApolloServer, AuthenticationError} from 'apollo-server-express';
import * as admin from 'firebase-admin';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import resolvers from './data/resolvers';
import typeDefs from './data/schema';
function configureServer() {
  // invoke express to create our server
  const app = express();
  //use the cors middleware
  app.use(bodyParser.json());

  const db = admin.firestore();

  app.use(cors());
  const context = async ({req}: any) => {
    // get the user token from the headers

    try {
      return {
        db,
      };
    } catch (e) {
      throw new AuthenticationError(
        'Authentication invalide, veuillez vous reconnecter'
      );
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context,
  });
  // now we take our newly instantiated ApolloServer and apply the   // previously configured express application
  server.applyMiddleware({
    app,
  });

  // finally return the application
  return app;
}
export default configureServer;
