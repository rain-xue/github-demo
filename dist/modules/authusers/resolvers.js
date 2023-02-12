"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUsersResolvers = void 0;
const init_models_1 = require("../../models/init-models");
const error_handler_1 = require("../../utils/error-handler");
exports.authUsersResolvers = {
    Mutation: {
        signIn,
        signOut,
    },
    Query: {}
};
async function signIn(root, { input }, context) {
    const { email, password } = input;
    const newUser = await init_models_1.AuthUser.create({ email: email, password: password });
    console.log(await init_models_1.User.findAll());
    const authUser = await init_models_1.AuthUser.findOne({ where: { email: email } });
    console.log(await authUser.getUsers());
    if (!authUser) {
        throw new error_handler_1.ApolloResponseError('Invalid User', "UNAUTHORIZED");
    }
    //TODO validate password
    const isValidUser = authUser;
    if (!isValidUser) {
        throw new error_handler_1.ApolloResponseError('Invalid User', "UNAUTHORIZED");
    }
    return { authuser: authUser };
}
async function signOut(root, { id }, context) {
    const authUser = await init_models_1.AuthUser.findOne({ where: { id: id } });
    return true;
}
//# sourceMappingURL=resolvers.js.map