"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
        models['User'].belongsTo(models['Account']);
        models['User'].belongsTo(models['AuthUser']);
    }
    static initModel(sequelize) {
        return User.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            firstName: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            AuthUserId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            AccountId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
        }, {
            sequelize,
            tableName: 'Users',
            schema: 'public',
            timestamps: true,
            paranoid: true,
        });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map