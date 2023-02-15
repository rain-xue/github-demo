import { Account, AuthUser, User } from "../../models/init-models";
import { SignInInput, SignUpInput } from "../../generated/graphql-types";
import { ContextObject } from "../../middleware/context";
import { ApolloResponseError } from "../../utils/error-handler";

interface AuthUserQueryResponse {
  authUser: AuthUser;
  success: boolean;
}

export const authUsersResolvers = {
  Mutation: {
    signIn,
    signOut,
    signUp,
  },
  Query: {
    getAuthUser,
  },
};

async function getAuthUser(
  root: any,
  {},
  context: ContextObject
): Promise<AuthUserQueryResponse> {
  try {
    return { authUser: context.authUser, success: true };
  } catch (e) {
    throw new ApolloResponseError(e.message);
  }
}

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

    return { token: "Bearer " + token, uid: uid, success: true };
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

  return { token: "Bearer " + token, uid: uid, success: true };
}

async function signOut(root: any, {}, context: ContextObject) {
  const authUser = context.authUser;

  const token = context.req.headers["token"] as string;

  const bearerToken = token.replace("Bearer ", "");

  const success = await authUser.revokeToken(bearerToken);

  return success;
}
