"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdmin = void 0;
const sequelize_1 = require("sequelize");
class AuthAdmin extends sequelize_1.Model {
    static associate(models) {
    }
    static initModel(sequelize) {
        return AuthAdmin.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            confirmed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
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
            tableName: 'AuthAdmins',
            schema: 'public',
            timestamps: true,
        });
    }
}
exports.AuthAdmin = AuthAdmin;
//# sourceMappingURL=AuthAdmin.js.map