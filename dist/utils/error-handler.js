"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloResponseError = void 0;
const graphql_1 = require("graphql");
class ApolloResponseError extends graphql_1.GraphQLError {
    constructor(message, statusCode, extensions) {
        super(message, { extensions: Object.assign(Object.assign({}, extensions), { statusCode: statusCode || "BAD_REQUEST" }) });
        Object.defineProperty(this, 'name', { value: 'ApolloResponseError' });
    }
}
exports.ApolloResponseError = ApolloResponseError;
//# sourceMappingURL=error-handler.js.map