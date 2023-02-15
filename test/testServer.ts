import { resvuModules } from "../src/modules";
import { createApplication } from "graphql-modules";
import { ApolloServer } from "@apollo/server";
import { ContextObject } from "../src/middleware";

const application = createApplication({
  modules: resvuModules,
});

let schema = application.createSchemaForApollo();

export const testServer = new ApolloServer<ContextObject>({
  schema,
});
