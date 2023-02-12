"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEncryptedPassword = void 0;
const sequelize_1 = require("sequelize");
const bcrypt = require("bcrypt");
const DEFAULT_OPTIONS = {
    field: 'password',
    rounds: 12,
    compare: 'authenticateByPassword',
};
const useEncryptedPassword = (Model, options = DEFAULT_OPTIONS) => {
    const opts = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    const hashField = function (instance) {
        try {
            const changedKey = Array.from(instance._changed).find(key => key === opts.field);
            if (!changedKey)
                return;
            const fieldDefinition = instance.rawAttributes[changedKey];
            if (!fieldDefinition)
                return;
            const plainValue = instance[changedKey];
            if (!plainValue)
                return;
            const salt = bcrypt.genSaltSync(opts.rounds);
            const hashedValue = bcrypt.hashSync(plainValue, salt);
            instance[changedKey] = hashedValue;
        }
        catch (err) {
            throw new sequelize_1.ValidationError(err.message, [err]);
        }
    };
    Model.prototype[opts.compare] = function (plainValue) {
        return bcrypt.compareSync(plainValue, this._previousDataValues[opts.field]);
    };
    Model.addHook('beforeSave', hashField);
};
exports.useEncryptedPassword = useEncryptedPassword;
//# sourceMappingURL=passwordable.js.map