import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional, ModelStatic } from 'sequelize';
import type { Account, AccountId } from './Account';
import { AuthUser, AuthUserId } from './AuthUser';

export interface UserAttributes {
  id: number;
  firstName?: string;
  lastName?: string;
  AuthUserId: number;
  AccountId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "id" | "firstName" | "lastName" | "createdAt" | "updatedAt" | "deletedAt";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  firstName?: string;
  lastName?: string;
  AuthUserId!: number;
  AccountId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // User belongsTo Account via accountId
  account!: Account;
  getAccount!: Sequelize.BelongsToGetAssociationMixin<Account>;
  setAccount!: Sequelize.BelongsToSetAssociationMixin<Account, AccountId>;
  createAccount!: Sequelize.BelongsToCreateAssociationMixin<Account>;
  // User belongsTo AuthUser via authUserId
  authUser!: AuthUser;
  getAuthUser!: Sequelize.BelongsToGetAssociationMixin<AuthUser>;
  setAuthUser!: Sequelize.BelongsToSetAssociationMixin<AuthUser, AuthUserId>;
  createAuthUser!: Sequelize.BelongsToCreateAssociationMixin<AuthUser>;

  static associate(models: { [key: string]: ModelStatic<Model> }){
    models['User'].belongsTo(models['Account']);
    models['User'].belongsTo(models['AuthUser'])
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      AuthUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
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
