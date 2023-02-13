import type { Migration } from "../umzug";
import { DataTypes, Transaction } from "sequelize";
import { AuthUser } from "../../models/init-models";

// you can put some team-specific imports/code here to be included in every migration

export const up: Migration = async ({ context: sequelize }) => {
  try {
    const result = await sequelize
      .getQueryInterface()
      .transaction(
        { isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
        async (t) => {
          const user1 = await AuthUser.create(
            { email: "test1@test.com", password: "qweqwe" },
            { transaction: t }
          );

          await user1.refreshToken();

          const user2 = await AuthUser.create(
            { email: "test2@test.com", password: "qweqwe" },
            { transaction: t }
          );

          await user2.refreshToken();

          return [user1, user2];
        }
      );
  } catch (error) {
    console.log("Rollback!", error.message);
  }
};

export const down: Migration = async ({ context: sequelize }) => {
  await AuthUser.destroy({ where: {}, truncate: true });
};
