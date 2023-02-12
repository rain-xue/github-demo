"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedModule = void 0;
const graphql_modules_1 = require("graphql-modules");
const typedefs_1 = require("./typedefs");
exports.sharedModule = (0, graphql_modules_1.createModule)({
    id: 'shared-module',
    dirname: __dirname,
    typeDefs: [typedefs_1.sharedTypeDefs],
});
//# sourceMappingURL=shared.module.js.map