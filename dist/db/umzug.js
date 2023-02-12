"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrator = void 0;
const env = process.env.NODE_ENV || 'development';
const sequelize_1 = require("sequelize");
const config = require(`./config/db.config.${env}.json`);
const { Umzug, SequelizeStorage } = require('umzug');
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize = new sequelize_1.Sequelize(config);
exports.migrator = new Umzug({
    migrations: {
        glob: ['migrations/*.ts', { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
        sequelize,
    }),
    logger: console,
    create: {
        folder: 'migrations',
        template: filepath => [
            // read template from filesystem
            [filepath, fs_1.default.readFileSync(path_1.default.join(__dirname, 'template/migration-template.ts')).toString()],
        ],
    },
});
//# sourceMappingURL=umzug.js.map