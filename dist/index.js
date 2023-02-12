"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const graphql_1 = require("graphql");
const http_1 = require("http");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const graphql_modules_1 = require("graphql-modules");
const middleware_1 = require("./middleware");
const modules_1 = require("./modules");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express4_1 = require("@apollo/server/express4");
const init_models_1 = require("./models/init-models");
const db_1 = __importDefault(require("./db/db"));
async function bootstrap() {
    (0, init_models_1.initModels)(db_1.default);
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    const application = (0, graphql_modules_1.createApplication)({
        modules: modules_1.resvuModules,
    });
    const schema = application.createSchemaForApollo();
    const subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
        schema,
        execute: graphql_1.execute,
        subscribe: graphql_1.subscribe,
        async onConnect(connectionParams) {
            const token = connectionParams['Authorization'];
            const userId = connectionParams['user'];
            if (!token) {
                return;
            }
            const context = await (0, middleware_1.GetValidContext)(token, userId);
            return context;
        },
    }, {
        server: httpServer,
        path: '/graphql',
    });
    const server = new server_1.ApolloServer({
        schema,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        },
                    };
                },
            },
        ],
    });
    await server.start();
    app.use('/', (0, cors_1.default)(), body_parser_1.default.json(), 
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }));
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}/graphql`));
}
bootstrap().catch(console.error);
//# sourceMappingURL=index.js.map