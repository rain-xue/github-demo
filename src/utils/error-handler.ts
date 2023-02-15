import { GraphQLError } from 'graphql';

export class ApolloResponseError extends GraphQLError {
  constructor(
    message: string,
    code?: string,
    extensions?: { [key: string]: string }
  ) {
    super(message, {
      extensions: {
        ...extensions,
        code: code || 'BAD_REQUEST',
      },
    });

    Object.defineProperty(this, 'name', { value: 'ApolloResponseError' });
  }
}
