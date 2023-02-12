import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional, ModelStatic } from "sequelize";
import type { User, UserId } from "./User";

export interface AccountAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  name?: string;
}

export type AccountPk = "id";
export type AccountId = Account[AccountPk];
export type AccountOptionalAttributes =
  | "id"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "name";
export type AccountCreationAttributes = Optional<
  AccountAttributes,
  AccountOptionalAttributes
>;

export class Account
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes
{
  id!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;
  name?: string;

  // Account hasMany User via accountId
  Users!: User[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<User>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<User, UserId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<User, UserId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<User, UserId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<User>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<User, UserId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<User, UserId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<User, UserId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<User, UserId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static associate(models: { [key: string]: ModelStatic<Model> }) {
    models["Account"].hasMany(models["User"]);
    models["Account"].belongsToMany(models["AuthUser"], {
      through: models["User"],
    });
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Account {
    return Account.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Accounts",
        schema: "public",
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
