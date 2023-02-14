import { Op } from 'sequelize';
import { AuthUser } from '../models';
import { response } from 'express';

export async function validateToken(args: {
  token: string;
  uid: string;
}): Promise<AuthUser> {
  try {
    const { token, uid } = args;

    const currentAuthUser = await AuthUser.authenticate(token, uid);

    return currentAuthUser;
  } catch (e) {
    throw new Error(e.message);
  }
}
