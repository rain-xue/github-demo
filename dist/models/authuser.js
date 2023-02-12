"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const sequelize_1 = require("sequelize");
const passwordable_1 = require("./concerns/passwordable");
class AuthUser extends sequelize_1.Model {
    static associate(models) {
        models['AuthUser'].hasMany(models['User']);
        models['AuthUser'].belongsToMany(models['Account'], { through: models['User'] });
    }
    static initModel(sequelize) {
        AuthUser.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    notNull: true,
                    notEmpty: true,
                    isEmail: {
                        msg: "Must be a email"
                    },
                }
            },
            password: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    is: /^[a-z]+$/i,
                    notNull: true,
                    notEmpty: true,
                }
            },
            confirmed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                validate: {
                    isIn: [[true, false]]
                }
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
            scopes: {
                confirmed: {
                    where: {
                        confirmed: true
                    }
                }
            },
            hooks: {
                afterCreate: (authUser, options) => {
                    //TODO send email
                },
            },
            sequelize,
            tableName: 'AuthUsers',
            schema: 'public',
            timestamps: true,
        });
        (0, passwordable_1.useEncryptedPassword)(AuthUser);
        AuthUser.addHook("afterCreate", "sendEmailToUser", (authUser, options) => {
            //TODO send user email
        });
        AuthUser.addHook("afterCreate", "sendEmailToAdmin", (authUser, options) => {
            //TODO send admin email
        });
        return AuthUser;
    }
}
exports.AuthUser = AuthUser;
//# sourceMappingURL=AuthUser.js.map