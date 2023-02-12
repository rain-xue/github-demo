const env = process.env.NODE_ENV || 'development';

import { Sequelize } from 'sequelize';
const config = require(`./config/db.config.${env}.json`);
const { Umzug, SequelizeStorage } = require('umzug');
import fs from 'fs';
import path from 'path';

const sequelize = new Sequelize(config);
export const migrator = new Umzug({
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
			[filepath, fs.readFileSync(path.join(__dirname, 'template/migration-template.ts')).toString()],
		],
	},
});

export type Migration = typeof migrator._types.migration;