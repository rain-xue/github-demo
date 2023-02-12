"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
// you can put some team-specific imports/code here to be included in every migration
const up = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING
        },
        AuthUserId: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'AuthUsers', key: 'id' }
        },
        AccountId: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: 'Accounts', key: 'id' }
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
    }).then(() => sequelize.getQueryInterface().addIndex('Users', ['AuthUserId', 'AccountId'], {
        unique: true
    }));
};
exports.up = up;
const down = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('Users');
};
exports.down = down;
//# sourceMappingURL=2023.01.29T08.03.18.create-user.js.map