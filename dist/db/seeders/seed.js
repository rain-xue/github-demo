"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const init_models_1 = require("../../models/init-models");
// you can put some team-specific imports/code here to be included in every migration
const up = async ({ context: sequelize }) => {
    try {
        const result = await sequelize.getQueryInterface().transaction({ isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, async (t) => {
            const user1 = await init_models_1.AuthUser.create({ email: "test1@test.com", password: "123123" }, { transaction: t });
            const user2 = await init_models_1.AuthUser.create({ email: "test2@test.com", password: "123123" }, { transaction: t });
            return [user1, user2];
        });
    }
    catch (error) {
        console.log("Rollback!", error.message);
    }
};
exports.up = up;
const down = async ({ context: sequelize }) => {
    await init_models_1.AuthUser.destroy({ where: {}, truncate: true });
};
exports.down = down;
//# sourceMappingURL=seed.js.map