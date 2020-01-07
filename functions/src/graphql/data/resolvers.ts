import * as productQuery from './resolvers/product/query';
import * as productMutation from './resolvers/product/mutation';
import * as userQuery from './resolvers/user/query';
import * as userMutation from './resolvers/user/mutation';
import User from './resolvers/user';

const resolveFunctions = {
  ...User,
  Query: {
    ...productQuery,
    ...userQuery,
  },
  Mutation: {
    ...productMutation,
    ...userMutation,
  },
};

export default resolveFunctions;
