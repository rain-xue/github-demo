import { Op } from "sequelize";
import { AuthUser } from "../models";

export async function validateToken(args: {
  client: string;
  token: string;
  uid: string;
}): Promise<AuthUser> {
  try {
    const { client, token, uid } = args;

    const currentAuthUser = await AuthUser.authenticate(client, token, uid);

    if (!currentAuthUser) {
      throw new Error("Token is invalid");
    }
    return currentAuthUser;
  } catch (e) {
    throw new Error(e.message);
  }
}
