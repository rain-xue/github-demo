"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_1 = require("sequelize");
class Account extends sequelize_1.Model {
    static associate(models) {
        models['Account'].hasMany(models['User']);
        models['Account'].belongsToMany(models['AuthUser'], { through: models['User'] });
    }
    static initModel(sequelize) {
        return Account.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
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
            tableName: 'Accounts',
            schema: 'public',
            timestamps: true,
            paranoid: true,
        });
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map