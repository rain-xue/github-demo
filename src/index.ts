import Redis from "ioredis";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { execute, subscribe } from "graphql";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createApplication } from "graphql-modules";
import { GetContext } from "./middleware";
import { resvuModules } from "./modules";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { initModels } from "./models/init-models";
import db from "./db/db";
import { applyMiddleware } from "graphql-middleware";
import { allow, rule, shield } from "graphql-shield";

// const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
// const REDIS_PORT: number = +process.env.REDIS_PORT || 6379;
// const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

// export const redisClient = new Redis({
//   host: REDIS_HOST,
//   port: REDIS_PORT,
//   password: REDIS_PASSWORD,
// });

// export const pubsub = new RedisPubSub({
//   publisher: new Redis({
//     host: REDIS_HOST,
//     port: REDIS_PORT,
//     password: REDIS_PASSWORD,
//     retryStrategy: (times) => {
//       return Math.min(times * 50, 2000);
//     },
//   }),
//   subscriber: new Redis({
//     host: REDIS_HOST,
//     port: REDIS_PORT,
//     password: REDIS_PASSWORD,
//     retryStrategy: (times) => {
//       return Math.min(times * 50, 2000);
//     },
//   }),
// });
async function bootstrap() {
  initModels(db);

  const app = express();
  const httpServer = createServer(app);
  const application = createApplication({
    modules: resvuModules,
  });

  let schema = application.createSchemaForApollo();

  const isAuthenticated = rule()(async (parent, args, ctx, info) => {
    return ctx.authUser;
  });

  schema = applyMiddleware(
    schema,
    shield({
      Query: { "*": isAuthenticated },
      Mutation: { "*": isAuthenticated, signIn: allow, signUp: allow },
    })
  );

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(connectionParams) {
        // const token = connectionParams["Authorization"];
        // const userId = connectionParams["user"] as string;
        if (!connectionParams) {
          return;
        }
        const context = await GetContext(connectionParams);
        return context;
      },
    },
    {
      server: httpServer,
      path: "/graphql",
    }
  );

  const server = new ApolloServer({
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

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => {
        const context: { [key: string]: any } = await GetContext({
          headers: req.headers,
        });
        return context;
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
}

bootstrap().catch(console.error);
