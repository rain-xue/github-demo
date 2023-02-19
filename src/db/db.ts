import { Sequelize, Options } from "sequelize";

const prodConfigs = require("./config/db.config.production.json");
const testConfigs = require("./config/db.config.test.json");
const devConfigs = require("./config/db.config.dev.json");

const env = process.env.NODE_ENV || "development";

let configs = {} as { [key: string]: Options };

if (env === "production") {
  configs = prodConfigs;
} else if (env === "test") {
  configs = testConfigs;
} else {
  configs = devConfigs;
}

const db: Sequelize = new Sequelize(configs);

export default db;
