const urlRoute = require("express").Router();
const URL = require("../models/URL");
const { BASE_URL } = require("../utils/config");
const { urlValidator } = require("../utils/middleware");

urlRoute.get("/", async (req, res) => {
  try {
    const response = await URL.find({});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});

urlRoute.get("/:shortCode", async (req, res) => {
  let shortParams = req.params.shortCode;
  try {
    const response = await URL.find({ URLCode: shortParams });
    if (response.length > 0) {
      await URL.findOneAndUpdate(
        { URLCode: shortParams },
        { clickCount: response[0].clickCount + 1 }
      );
      return res.status(307).redirect(response[0].originalURL);
    }
    return res.status(404).json({ message: "Resource not available" });
  } catch (error) {
    res.status(400).json(error);
  }
});

urlRoute.post("/shorten/", urlValidator, async (req, res) => {
  try {
    console.log(BASE_URL);
    let shortURL = `${BASE_URL}/${req.URLCode}`;
    let response = await URL.create({
      originalURL: req.body.originalURL,
      URLCode: req.URLCode,
      shortURL: shortURL,
      clickCount: 0,
      dateCreated: new Date(),
    });
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = urlRoute;
