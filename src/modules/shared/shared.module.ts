import { createModule } from 'graphql-modules';
import { sharedTypeDefs } from './typedefs';

export const sharedModule = createModule({
  id: 'shared-module',
  dirname: __dirname,
  typeDefs: [sharedTypeDefs],
});
