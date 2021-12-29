const supportMessageTemplate = data => {
  const { problem = "-", userEmail = "-" } = data;
  return `
    Описание затруднения от ${userEmail}: ${problem} \n
  `;
}

module.exports = supportMessageTemplate;