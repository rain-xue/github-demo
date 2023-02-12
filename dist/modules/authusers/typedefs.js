"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authusersTypeDefs = void 0;
const graphql_modules_1 = require("graphql-modules");
exports.authusersTypeDefs = (0, graphql_modules_1.gql) `
  type AuthUser {
    id: ID!
    email: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthUserPayload {
    authuser: AuthUser
  }

  input SignInInput {
    email: String!
    password: String!
  }

  scalar DateTime

  type Mutation {
    signIn(input: SignInInput!): AuthUserPayload!
    signOut(id: String!): Boolean!
  }

  type Query {
    _dummy: String
  }
`;
//# sourceMappingURL=typedefs.js.map