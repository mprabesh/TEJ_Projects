const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
  URLCode: { type: String, required: true },
  originalURL: { type: String, required: true },
  shortURL: { type: String, required: true },
  clickCount: { type: Number, required: true },
  dateCreated: { type: Date, required: true },
});

const URL = mongoose.model("URL", URLSchema);

module.exports = URL;
