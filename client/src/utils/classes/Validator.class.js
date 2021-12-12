import validator from "validator";

class Validator {
  checkEmail(arg) {
    return arg && validator.isEmail(arg);
  }
  checkName(arg, min = 5, max = 16) {
    return arg && validator.isLength(arg, min, max); // && /[\u4e00-\u9fa5]/.test(arg);
  }
  checkNumber(arg) {
    return arg && (typeof +arg === 'number' && isFinite(+arg));
  }
  checkPassword(arg, min = 5, max = 32) {
    return arg && validator.isLength(arg, min, max) && /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,}/.test(arg);
  }
  checkPhone(arg) {
    return arg && validator.isNumeric(arg.toString());
    // return arg && validator.isMobilePhone(arg.toString(), 'ru-RU');
  }
}

export const cheekiBreekiValidator = new Validator();