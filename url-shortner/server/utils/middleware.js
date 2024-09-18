const generateShortUrl = require("./generateURL");
const isValidURL = require("./validateURL");
const URL = require("../models/URL");

const urlValidator = async (req, res, next) => {
  const { originalURL } = req.body;
  try {
    if (!originalURL) throw "No URL provided";
    if (isValidURL(originalURL)) {
      const checkDuplicate = await URL.findOne({ originalURL });
      if (checkDuplicate) {
        return res.status(201).json(checkDuplicate);
      }
      const shortCode = generateShortUrl();
      req.URLCode = shortCode;
      req.originalURL = originalURL;
      return next();
    } else {
      throw "NOT a valid URL";
    }
  } catch (error) {
    return res.status(400).json(error);
  }
  next();
};

module.exports = { urlValidator };
