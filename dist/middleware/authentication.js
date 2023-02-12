// import { ApolloError, AuthenticationError } from 'apollo-server-core';
// import * as admin from 'firebase-admin';
// export async function validateToken(idToken: string): Promise<string> {
//   let token: admin.auth.DecodedIdToken;
//   try {
//     token = await admin.auth().verifyIdToken(idToken);
//     return token.uid;
//   } catch (e) {
//     throw new AuthenticationError(e.message);
//   }
// }
// export async function createUserAuth(email: string): Promise<string> {
//   try {
//     const result = await admin.auth().createUser({ email: email });
//     return result.uid;
//   } catch (error) {
//     console.error(error);
//     throw new ApolloError(error.message);
//   }
// }
// export async function validateUser(user: {
//   id: string;
//   email: string;
// }): Promise<boolean> {
//   try {
//     const userById = await admin.auth().getUser(user.id);
//     const userByEmail = await admin.auth().getUserByEmail(user.email);
//     const isSameId = userById.uid === userByEmail.uid;
//     const isSameEmail = userById.email === userByEmail.email;
//     return isSameId && isSameEmail;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }
//# sourceMappingURL=authentication.js.map