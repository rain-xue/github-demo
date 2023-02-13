import { ApolloResponseError } from "../utils/error-handler";
import { ContextObject } from "./context";
import { validateToken } from "./authentication";
import { IncomingHttpHeaders } from "http";

interface CustomHttpHeaders extends IncomingHttpHeaders {
  uid?: string;
  client?: string;
}

export async function GetContext(args: {
  headers: CustomHttpHeaders;
}): Promise<ContextObject> {
  try {
    const { headers } = args;

    const token = headers.authorization;
    const uid = headers.uid;

    let authUser = null;

    if (token) {
      const bearerToken = token.replace("Bearer ", "");
      authUser = await validateToken({
        token: bearerToken,
        uid: uid,
      });
    }

    return { authUser };
  } catch (e) {
    throw new ApolloResponseError(e.message, "AUTHENTICATION_ERROR");
  }
}
