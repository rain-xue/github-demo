import { createModule } from 'graphql-modules';
import { authUsersResolvers } from './resolvers';
import { authusersTypeDefs } from './typedefs';

export const authUsersModule = createModule({
  id: 'authusers-module',
  dirname: __dirname,
  typeDefs: [authusersTypeDefs],
  resolvers: authUsersResolvers,
});
