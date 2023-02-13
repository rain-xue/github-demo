import type { Migration } from "../umzug";
import { DataTypes } from "sequelize";

// you can put some team-specific imports/code here to be included in every migration

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      AuthUserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "AuthUsers", key: "id" },
      },
      AccountId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Accounts", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    })
    .then(() =>
      sequelize
        .getQueryInterface()
        .addIndex("Users", ["AuthUserId", "AccountId"], {
          unique: true,
        })
    );
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("Users");
};
