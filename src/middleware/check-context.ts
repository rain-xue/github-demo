import { ApolloResponseError } from '../utils/error-handler';
import { ContextObject } from './context';
import { validateToken } from './authentication';
import { IncomingHttpHeaders } from 'http';
import { Request, Response } from 'express';

export async function GetContext(args: {
  req: Request;
  res: Response;
}): Promise<ContextObject> {
  try {
    const { req, res } = args;

    const token = req.headers['token'] as string;
    const uid = req.headers['uid'] as string;

    let authUser = null;

    if (token) {
      const bearerToken = token.replace('Bearer ', '');
      authUser = await validateToken({
        token: bearerToken,
        uid: uid,
      });
    }

    return { authUser, req, res };
  } catch (e) {
    throw new ApolloResponseError(e.message, 'AUTHENTICATION_ERROR');
  }
}
