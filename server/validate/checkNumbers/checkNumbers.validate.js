// const validator = require("validator");

function checkNumbers(str) {
  return str && (typeof +str === 'number' && isFinite(+str));
};

module.exports = checkNumbers;