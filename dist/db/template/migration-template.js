"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
// you can put some team-specific imports/code here to be included in every migration
const up = async ({ context: sequelize }) => {
    await sequelize.query(`raise fail('up migration not implemented')`);
};
exports.up = up;
const down = async ({ context: sequelize }) => {
    await sequelize.query(`raise fail('down migration not implemented')`);
};
exports.down = down;
//# sourceMappingURL=migration-template.js.map