import { ValidationError } from "sequelize";
import bcrypt = require("bcrypt");

const DEFAULT_OPTIONS = {
  field: "password",
  rounds: 12,
  compare: "authenticateByPassword",
};

export const useEncryptedPassword = (Model, options = DEFAULT_OPTIONS) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const hashField = function (instance: any) {
    try {
      const changedKey: string = Array.from(instance._changed).find(
        (key) => key === opts.field
      ) as string;

      if (!changedKey) return;

      const fieldDefinition = instance.rawAttributes[changedKey];
      if (!fieldDefinition) return;

      const plainValue = instance[changedKey];
      if (!plainValue) return;

      const salt = bcrypt.genSaltSync(opts.rounds);
      const hashedValue = bcrypt.hashSync(plainValue, salt);
      instance[changedKey] = hashedValue;
    } catch (err) {
      throw new ValidationError(err.message, [err]);
    }
  };

  Model.prototype[opts.compare] = function (plainValue) {
    return bcrypt.compareSync(plainValue, this._previousDataValues[opts.field]);
  };

  Model.addHook("beforeSave", hashField);
};
