"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUsersModule = void 0;
const graphql_modules_1 = require("graphql-modules");
const resolvers_1 = require("./resolvers");
const typedefs_1 = require("./typedefs");
exports.authUsersModule = (0, graphql_modules_1.createModule)({
    id: 'authusers-module',
    dirname: __dirname,
    typeDefs: [typedefs_1.authusersTypeDefs],
    resolvers: resolvers_1.authUsersResolvers,
});
//# sourceMappingURL=authusers.module.js.map