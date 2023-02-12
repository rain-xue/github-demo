import type { Migration } from '../umzug';
import { DataTypes } from 'sequelize';

// you can put some team-specific imports/code here to be included in every migration

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('Accounts', {
		id: {
		  allowNull: false,
		  autoIncrement: true,
		  primaryKey: true,
		  type: DataTypes.INTEGER
		},
		name: {
		  type: DataTypes.STRING
		},
		createdAt: {
		  allowNull: false,
		  type: DataTypes.DATE
		},
		updatedAt: {
		  allowNull: false,
		  type: DataTypes.DATE
		},
		deletedAt: {
		  type: DataTypes.DATE
		}
	  });
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('Accounts');
};