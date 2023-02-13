import { ValidationError } from "sequelize";
import bcrypt = require("bcrypt");

const DEFAULT_OPTIONS = {
  field: "password",
  rounds: 12,
};

export const useEncryptedPassword = (Model) => {
  const opts = { ...DEFAULT_OPTIONS };

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

      const hashedValue = encrptedField(plainValue);
      instance[changedKey] = hashedValue;
    } catch (err) {
      throw new ValidationError(err.message, [err]);
    }
  };

  // Model.prototype[opts.compare] = function (plainValue) {
  // return bcrypt.compareSync(plainValue, this._previousDataValues[opts.field]);
  // };

  Model.addHook("beforeSave", hashField);
};

export function verifyPassword(
  plainValue: string,
  originValue: string
): boolean {
  return bcrypt.compareSync(plainValue, originValue);
}

export function encrptedField(field: string): string {
  const salt = bcrypt.genSaltSync(DEFAULT_OPTIONS.rounds);
  const hashedValue = bcrypt.hashSync(field, salt);
  return hashedValue;
}
