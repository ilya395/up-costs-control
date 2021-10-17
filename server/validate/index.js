const checkEmail = require("./checkEmail/checkEmail");
const checkName = require("./checkName/checkName");
const checkNumbers = require("./checkNumbers/checkNumbers.validate");
const checkPassword = require("./checkPassword/checkPassword");
const checkPhoneNum = require("./checkPhone/checkPhone");

module.exports = {
  checkEmail,
  checkName,
  checkNumbers,
  checkPassword,
  checkPhoneNum
}