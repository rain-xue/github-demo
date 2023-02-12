"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.User = exports.AuthUser = exports.AuthAdmin = exports.Account = void 0;
const Account_1 = require("./Account");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return Account_1.Account; } });
const AuthAdmin_1 = require("./AuthAdmin");
Object.defineProperty(exports, "AuthAdmin", { enumerable: true, get: function () { return AuthAdmin_1.AuthAdmin; } });
const AuthUser_1 = require("./AuthUser");
Object.defineProperty(exports, "AuthUser", { enumerable: true, get: function () { return AuthUser_1.AuthUser; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
function initModels(sequelize) {
    const Account = Account_1.Account.initModel(sequelize);
    const AuthAdmin = AuthAdmin_1.AuthAdmin.initModel(sequelize);
    const AuthUser = AuthUser_1.AuthUser.initModel(sequelize);
    const User = User_1.User.initModel(sequelize);
    const models = {
        Account: Account,
        AuthAdmin: AuthAdmin,
        AuthUser: AuthUser,
        User: User,
    };
    Object.keys(models).forEach(modelName => {
        models[modelName].associate(models);
    });
    return models;
}
exports.initModels = initModels;
//# sourceMappingURL=init-models.js.map