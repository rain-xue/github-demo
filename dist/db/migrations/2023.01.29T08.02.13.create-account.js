"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
// you can put some team-specific imports/code here to be included in every migration
const up = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('Accounts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        name: {
            type: sequelize_1.DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE
        },
        deletedAt: {
            type: sequelize_1.DataTypes.DATE
        }
    });
};
exports.up = up;
const down = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('Accounts');
};
exports.down = down;
//# sourceMappingURL=2023.01.29T08.02.13.create-account.js.map