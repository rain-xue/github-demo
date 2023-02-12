import type { Migration } from '../umzug';
import { DataTypes } from 'sequelize';

// you can put some team-specific imports/code here to be included in every migration

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('AuthAdmins', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		  },
		  email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		  },
		  password: {
			type: DataTypes.STRING
		  },
		  tokens: {
			type: DataTypes.ARRAY
		  },
		  confirmed: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
			defaultValue: false
		  },
		  createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		  },
		  updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		  }
	});
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('AuthAdmins');
};