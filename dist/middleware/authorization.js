// import {
//   Feature,
//   PermissionLevel,
//   PermissionsOnRoles,
//   PrismaClient,
//   ResvuFeature,
//   Role,
//   User,
// } from '@prisma/client';
// import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
// import { ContextObject } from '../models/context';
// import { UserAuth } from '../models/user-auth';
// import { getPermissionsMapFromList } from '../utils/permissions-helpers';
// // import { redisClient } from '..';
// const prisma = new PrismaClient();
// export async function authoriseUser(
//   authuserId: string,
//   userId?: string
// ): Promise<UserAuth> {
//   // const authData = await getCachedAuthData(authuserId, userId);
//   // if (!!authData) {
//   //   return authData;
//   // }
//   const authuser = await prisma.authuser.findUnique({
//     where: { id: authuserId },
//     include: {
//       role: { include: { permissions: true } },
//       users: {
//         include: { role: { include: { permissions: true } } },
//       },
//     },
//   });
//   const users = authuser.users;
//   let selectedUser: User & {
//     role: Role & {
//       permissions: PermissionsOnRoles[];
//     };
//   };
//   if (userId) {
//     const validUsers = users.filter((user) => user.id === userId);
//     if (validUsers.length) {
//       selectedUser = validUsers[0];
//     }
//   } else {
//     if (users.length === 1) {
//       selectedUser = users[0];
//     }
//   }
//   const subs = [];
//   const userSites = [];
//   if (!!selectedUser) {
//     subs.push(selectedUser?.id);
//     if (!selectedUser?.accountAdmin) {
//       const user = await prisma.user.findUnique({
//         where: { id: selectedUser.id },
//         select: { sites: { select: { id: true } } },
//       });
//       user.sites.map((site) => {
//         subs.push(site.id);
//         userSites.push(site.id);
//       });
//     } else {
//       subs.push(selectedUser?.accountId);
//     }
//   }
//   const permissions = getPermissionsMapFromList(
//     selectedUser?.role?.permissions
//   );
//   const resvuPermissions = authuser?.role?.permissions?.reduce((prev, curr) => {
//     prev[curr.feature] = curr.level;
//     return prev;
//   }, {});
//   const userData: UserAuth = {
//     id: authuserId,
//     email: authuser.email,
//     admin: selectedUser?.admin,
//     accountAdmin: selectedUser?.accountAdmin,
//     userId: selectedUser?.id,
//     accountId: selectedUser?.accountId,
//     permissions: permissions,
//     allSitesAccess:
//       selectedUser?.accountAdmin || selectedUser?.role?.allSitesAccess,
//     accountAdminAccess:
//       selectedUser?.accountAdmin || selectedUser?.role?.accountAdminAccess,
//     subscriptions: subs,
//     sites: userSites,
//     resvuStaff: authuser.resvuStaff,
//     resvuPermissions: resvuPermissions,
//   };
//   // if (!!authuserId && !!selectedUser?.id) {
//   //   const userDataJson = JSON.stringify(userData);
//   //   const key = `auth.${authuserId}.${selectedUser.id}`;
//   //   await redisClient.set(key, userDataJson, 'ex', 10);
//   // }
//   return userData;
// }
// // async function getCachedAuthData(
// //   accountId: string,
// //   userId: string
// // ): Promise<UserAuth> {
// //   const selectedUserId = userId || (await getValidUserId(accountId));
// //   if (!selectedUserId) {
// //     return;
// //   }
// //   const key = `auth.${accountId}.${selectedUserId}`;
// //   const userAuthJson = await redisClient.get(key);
// //   if (!userAuthJson) {
// //     return;
// //   }
// //   const userAuth = JSON.parse(userAuthJson) as UserAuth;
// //   return userAuth;
// // }
// async function getValidUserId(accountId: string): Promise<string> {
//   const accountUsers = await prisma.account.findUnique({
//     where: { id: accountId },
//     select: {
//       users: {
//         select: { id: true },
//       },
//     },
//   });
//   const selectedUser =
//     accountUsers?.users?.length == 1 ? accountUsers.users[0].id : null;
//   return selectedUser;
// }
// export function resvuUserCheck(context: ContextObject) {
//   const isResvuUser = context.userAuth?.resvuStaff || false;
//   if (!isResvuUser) {
//     throw new ForbiddenError('authorization error');
//   }
// }
// export function resvuUserReadCheck(
//   feature: ResvuFeature,
//   context: ContextObject
// ) {
//   if (!context.userAuth.resvuStaff) {
//     return;
//   }
//   if (!context.userAuth.resvuPermissions?.hasOwnProperty(feature)) {
//     throw new ForbiddenError('authorization error');
//   }
//   const permissionLevel = context.userAuth.resvuPermissions[
//     feature
//   ] as PermissionLevel;
//   if (permissionLevel === PermissionLevel.none) {
//     throw new ForbiddenError('authorization error');
//   }
// }
// export function resvuUserWriteCheck(
//   feature: ResvuFeature,
//   context: ContextObject
// ) {
//   if (!context.userAuth.resvuStaff) {
//     return;
//   }
//   if (!context.userAuth.resvuPermissions?.hasOwnProperty(feature)) {
//     throw new ForbiddenError('authorization error');
//   }
//   const permissionLevel = context.userAuth.resvuPermissions[
//     feature
//   ] as PermissionLevel;
//   if (permissionLevel !== PermissionLevel.write) {
//     throw new ForbiddenError('authorization error');
//   }
// }
// export function accountCheck(context: ContextObject) {
//   const isValid = context.userAuth?.id;
//   if (!isValid) {
//     throw new AuthenticationError('authentication failed');
//   }
// }
// export function userCheck(context: ContextObject) {
//   const isValid = context.userAuth?.userId;
//   if (!isValid) {
//     throw new AuthenticationError('authentication failed');
//   }
// }
// export function adminCheck(context: ContextObject) {
//   const isValid = context.userAuth?.userId && context.userAuth?.admin;
//   if (!isValid) {
//     throw new ForbiddenError('authorization error');
//   }
// }
// export function accountAdminCheck(context: ContextObject) {
//   const isValid = context.userAuth?.accountAdmin;
//   if (!isValid) {
//     throw new ForbiddenError('authorization error');
//   }
// }
// export function accountAdminAccessCheck(context: ContextObject) {
//   const isValid = context.userAuth?.accountAdminAccess;
//   if (!isValid) {
//     throw new ForbiddenError('authorization error');
//   }
// }
// export function readPermissionsCheck(feature: Feature, context: ContextObject) {
//   if (context.userAuth.accountAdmin) {
//     return;
//   }
//   if (!context.userAuth.permissions?.hasOwnProperty(feature)) {
//     throw new ForbiddenError('authorization error');
//   }
//   const permissionLevel = context.userAuth.permissions[
//     feature
//   ] as PermissionLevel;
//   if (permissionLevel === PermissionLevel.none) {
//     throw new ForbiddenError('authorization error');
//   }
// }
// export function writePermissionsCheck(
//   feature: Feature,
//   context: ContextObject
// ) {
//   if (context.userAuth.accountAdmin) {
//     return;
//   }
//   if (!context.userAuth.permissions?.hasOwnProperty(feature)) {
//     throw new ForbiddenError('authorization error');
//   }
//   const permissionLevel = context.userAuth.permissions[
//     feature
//   ] as PermissionLevel;
//   if (
//     permissionLevel === PermissionLevel.none ||
//     permissionLevel === PermissionLevel.read
//   ) {
//     throw new ForbiddenError('authorization error');
//   }
// }
//# sourceMappingURL=authorization.js.map