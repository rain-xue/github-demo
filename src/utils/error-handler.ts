import { GraphQLError } from 'graphql';

export class ApolloResponseError extends GraphQLError {
  constructor(message: string, statusCode?: string, extensions?: {[key: string]: string} ) {
    super(message, {extensions: {
      ...extensions,
      statusCode: statusCode || "BAD_REQUEST",
    }});
   
    Object.defineProperty(this, 'name', { value: 'ApolloResponseError' });
  }
}
