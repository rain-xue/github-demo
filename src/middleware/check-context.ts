import { Op } from 'sequelize';
import { AuthUser } from '../models';
import { ApolloResponseError } from '../utils/error-handler';
// import { redisClient } from '..';
import { ContextObject } from './context';

import { validateToken } from './authentication';
// import { authoriseUser } from './authorization';
export async function GetValidContext(
  headers: {[key: string]: string},
): Promise<ContextObject> {

  const token = headers.token;
  const uid = headers.uid;
  const client = headers.client

  try {
    const bearerToken = token.replace('Bearer ', '');

    const authUser = await validateToken({token: bearerToken, uid: uid, client: client});

    return { authUser };
  } catch (e) {
    throw new ApolloResponseError(e.message, "AUTHENTICATION_ERROR");
  }
}
