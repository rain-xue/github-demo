import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional, ModelStatic } from 'sequelize';
import { useEncryptedPassword } from './concerns/passwordable';

export interface AuthAdminAttributes {
  id: number;
  email: string;
  password?: string;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthAdminPk = "id";
export type AuthAdminId = AuthAdmin[AuthAdminPk];
export type AuthAdminOptionalAttributes = "id" | "password" | "createdAt" | "updatedAt";
export type AuthAdminCreationAttributes = Optional<AuthAdminAttributes, AuthAdminOptionalAttributes>;

export class AuthAdmin extends Model<AuthAdminAttributes, AuthAdminCreationAttributes> implements AuthAdminAttributes {
  id!: number;
  email!: string;
  password?: string;
  confirmed!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static associate(models: { [key: string]: ModelStatic<Model> }){
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof AuthAdmin {
    AuthAdmin.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      tableName: 'AuthAdmins',
      schema: 'public',
      timestamps: true,
    });

    useEncryptedPassword(AuthAdmin)

    return AuthAdmin
  }
}
