"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const configs = {
    dialect: "postgres",
    database: "resvu_api_dev",
    username: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432
};
const config = configs;
const db = new sequelize_1.Sequelize(config);
exports.default = db;
//# sourceMappingURL=db.js.map