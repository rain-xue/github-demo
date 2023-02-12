import { Account, AuthUser, User } from '../../models/init-models';
import { SignInInput } from '../../generated/graphql-types';
import { ContextObject } from '../../utils/context'
import { ApolloResponseError } from '../../utils/error-handler';

export const authUsersResolvers = {
  Mutation: {
    signIn,
    signOut,
  },
  Query: {}
};

async function signIn(root: any, { input }, context: ContextObject) {
  const { email, password } = input as SignInInput;

  const newUser = await AuthUser.create({email: email, password: password})

  console.log(await User.findAll())

  const authUser = await AuthUser.findOne({ where: { email: email } });

  console.log(await authUser.getUsers())

  if(!authUser){
    throw new ApolloResponseError('Invalid User', "UNAUTHORIZED");
  }

  //TODO validate password
  const isValidUser = authUser;

  if(!isValidUser){
    throw new ApolloResponseError('Invalid User', "UNAUTHORIZED");
  }

  return { authuser: authUser };
}

async function signOut(root: any, { id }, context: ContextObject) {

  const authUser = await AuthUser.findOne({ where: { id: id } });

  return true;
}
