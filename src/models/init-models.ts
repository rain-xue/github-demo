import type { Sequelize } from "sequelize";
import { Account as _Account } from "./Account";
import type { AccountAttributes, AccountCreationAttributes } from "./Account";
import { AuthAdmin as _AuthAdmin } from "./AuthAdmin";
import type { AuthAdminAttributes, AuthAdminCreationAttributes } from "./AuthAdmin";
import { AuthUser as _AuthUser } from "./AuthUser";
import type { AuthUserAttributes, AuthUserCreationAttributes } from "./AuthUser";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";

export {
  _Account as Account,
  _AuthAdmin as AuthAdmin,
  _AuthUser as AuthUser,
  _User as User,
};

export type {
  AccountAttributes,
  AccountCreationAttributes,
  AuthAdminAttributes,
  AuthAdminCreationAttributes,
  AuthUserAttributes,
  AuthUserCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Account = _Account.initModel(sequelize);
  const AuthAdmin = _AuthAdmin.initModel(sequelize);
  const AuthUser = _AuthUser.initModel(sequelize);
  const User = _User.initModel(sequelize);

  const models = {
    Account: Account,
    AuthAdmin: AuthAdmin,
    AuthUser: AuthUser,
    User: User,
  };

  Object.keys(models).forEach(modelName => {
    models[modelName].associate(models)
  });

  return models
}
