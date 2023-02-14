import { validate } from 'graphql';
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional, Op, ModelStatic } from 'sequelize';
import { Account } from './Account';
import { verifyPassword, useEncryptedPassword } from './concerns/passwordable';
import { User, UserId } from './User';
import jwt from 'jsonwebtoken';
import bcrypt = require('bcrypt');

export interface AuthUserAttributes {
  id: number;
  email: string;
  password?: string;
  confirmed: boolean;
  tokens: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type AuthUserPk = 'id';
export type AuthUserId = AuthUser[AuthUserPk];
export type AuthUserOptionalAttributes =
  | 'id'
  | 'password'
  | 'createdAt'
  | 'updatedAt';
export type AuthUserCreationAttributes = Optional<
  AuthUserAttributes,
  AuthUserOptionalAttributes
>;

export class AuthUser
  extends Model<AuthUserAttributes, AuthUserCreationAttributes>
  implements AuthUserAttributes
{
  id!: number;
  email!: string;
  password?: string;
  confirmed!: boolean;
  tokens: string[];
  createdAt!: Date;
  updatedAt!: Date;

  // AuthUser hasMany User via authUserId
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

  static async authenticate(token: string, uid: string): Promise<AuthUser> {
    const authUser = await AuthUser.findOne({
      where: {
        id: { [Sequelize.Op.eq]: uid },
        tokens: {
          [Sequelize.Op.contains]: [token],
        },
      },
    });

    return authUser;
  }

  static async authenticateByPassword(
    email: string,
    password: string
  ): Promise<AuthUser> {
    const authUser = await AuthUser.findOne({
      where: {
        email: email,
      },
    });

    if (!authUser) {
      throw new Error('Email or password is invalid');
    }

    const validPassword = verifyPassword(password, authUser.password);

    if (!validPassword) {
      throw new Error('Email or password is invalid');
    }

    return authUser;
  }

  static associate(models: { [key: string]: ModelStatic<Model> }) {
    models['AuthUser'].hasMany(models['User']);
    models['AuthUser'].belongsToMany(models['Account'], {
      through: models['User'],
    });
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof AuthUser {
    AuthUser.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true,
            isEmail: {
              msg: 'Must be a email',
            },
          },
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            is: /^[a-z]+$/i,
            notNull: true,
            notEmpty: true,
          },
        },
        tokens: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          defaultValue: [],
        },
        confirmed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          validate: {
            isIn: [[true, false]],
          },
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
        tableName: 'AuthUsers',
        schema: 'public',
        timestamps: true,
      }
    );

    useEncryptedPassword(AuthUser);

    return AuthUser;
  }

  async refreshToken(): Promise<{
    token: string;
    uid: number;
  }> {
    //example
    const newToken = jwt.sign({ id: this.id }, 'secret');
    const uid = this.id;
    const newTokens = this.tokens.concat(newToken);

    await this.update({ tokens: newTokens }, { where: { id: this.id } });

    return { token: newToken, uid: uid };
  }

  async revokeToken(removedToken: string): Promise<boolean> {
    console.log(removedToken);
    const newTokens = this.tokens.filter((token) => token != removedToken);
    await this.update({ tokens: newTokens });
    return true;
  }
}
