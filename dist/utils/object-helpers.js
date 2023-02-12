"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmptyValues = void 0;
function removeEmptyValues(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
exports.removeEmptyValues = removeEmptyValues;
//# sourceMappingURL=object-helpers.js.map