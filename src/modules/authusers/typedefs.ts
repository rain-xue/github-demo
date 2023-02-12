import { gql } from "graphql-modules";

export const authusersTypeDefs = gql`
  type AuthUser {
    id: ID!
    email: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthUserPayload {
    success: boolean!
    authuser: AuthUser
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: string!
  }

  scalar DateTime

  type Mutation {
    signUp(input: SignUpInput!): AuthUserPayload!
    signIn(input: SignInInput!): AuthUserPayload!
    signOut(id: String!): Boolean!
  }

  type Query {
    _dummy: String
  }
`;
