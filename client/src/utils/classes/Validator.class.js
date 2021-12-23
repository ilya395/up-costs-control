import validator from "validator";
import { BAD_WORDS } from "../../constants";

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
  checkText(arg) {
    let validate = true;
    if (!arg || typeof arg === "string") {
      return validate = false;
    }
    for (let i = 0; i < BAD_WORDS.length; i++) {
      if (String(arg).indexOf(BAD_WORDS[i]) !== -1) {
          validate = false;
          break;
      }
    }
    return validate;
  }
}

export const cheekiBreekiValidator = new Validator();