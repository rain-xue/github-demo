"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
// you can put some team-specific imports/code here to be included in every migration
const up = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn("Accounts", "name");
};
exports.up = up;
const down = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn("Accounts", "name", { type: sequelize_1.DataTypes.STRING });
};
exports.down = down;
//# sourceMappingURL=2023.01.29T11.41.46.remove-account-name.js.map