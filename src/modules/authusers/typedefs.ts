import { gql } from "graphql-modules";

export const authusersTypeDefs = gql`
  type AuthUser {
    id: ID!
    email: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthUserPayload {
    success: Boolean!
    uid: String
    token: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  scalar DateTime

  type Mutation {
    signUp(input: SignUpInput!): AuthUserPayload!
    signIn(input: SignInInput!): AuthUserPayload!
    signOut: Boolean!
  }

  type Query {
    _dummy: String
  }
`;
