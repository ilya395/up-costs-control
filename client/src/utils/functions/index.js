export const strangeNumber = (type, str) => {
  if (type === "tel" && str && str[0] === "8") {
    return str.replace("8", "+7");
  }
  return str;
}