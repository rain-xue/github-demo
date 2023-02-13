import { Account, AuthUser, User } from "../../models/init-models";
import { SignInInput, SignUpInput } from "../../generated/graphql-types";
import { ContextObject } from "../../middleware/context";
import { ApolloResponseError } from "../../utils/error-handler";
import { response } from "express";

export const authUsersResolvers = {
  Mutation: {
    signIn,
    signOut,
    signUp,
  },
  Query: {},
};

async function signUp(root: any, { input }, context: ContextObject) {
  try {
    const { email, password } = input as SignUpInput;

    const authUser = await AuthUser.create({
      email: email,
      password: password,
    });

    if (!authUser) {
      throw new ApolloResponseError("Invalid User", "UNAUTHORIZED");
    }

    const { token, uid } = await authUser.refreshToken();

    return { token: token, uid: uid, success: true };
  } catch (e) {
    throw new ApolloResponseError(e.message);
  }
}

async function signIn(root: any, { input }, context: ContextObject) {
  const { email, password } = input as SignInInput;

  const authUser = await AuthUser.authenticateByPassword(email, password);

  if (!authUser) {
    throw new ApolloResponseError("Invalid User", "UNAUTHORIZED");
  }

  const { token, uid } = await authUser.refreshToken();

  return { token: token, uid: uid, success: true };
}

async function signOut(root: any, {}, context: ContextObject) {
  const authUser = context.authUser;
  console.log(response.getHeaders());
  const token = response.getHeader("Authorization") as string;
  const success = await authUser.revokeToken(token);
  if (success) {
    response.setHeader("authorization", "");
    response.setHeader("uid", "");
  }

  return true;
}
