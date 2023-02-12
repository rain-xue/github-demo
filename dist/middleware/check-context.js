"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetValidContext = void 0;
// import { validateToken } from './authentication';
// import { authoriseUser } from './authorization';
async function GetValidContext(authorizationHeader, userId) {
    const token = authorizationHeader;
    return { token };
    // if (!token || !token.length) {
    //   throw new ApolloResponseError(
    //     'No Token Provided in Headers.Authentication!'
    //   );
    // }
    // if (!token.startsWith('Bearer ')) {
    //   throw new ApolloResponseError(
    //     "Token must be in the form of 'Bearer XXXTOKENXXX' "
    //   );
    // }
    // try {
    //   const bearerToken = token.replace('Bearer ', '');
    //   const userAuthId = await validateToken(bearerToken);
    //   const userAuth = await authoriseUser(userAuthId, userId);
    //   return { userAuth, prisma, token, redis: null };
    // } catch (e) {
    //   throw new AuthenticationError(e);
    // }
}
exports.GetValidContext = GetValidContext;
//# sourceMappingURL=check-context.js.map