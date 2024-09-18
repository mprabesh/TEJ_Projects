const { nanoid } = require("nanoid");

const generateShortUrl = () => {
  const URLCode = nanoid(9);
  return URLCode;
};

module.exports = generateShortUrl;
