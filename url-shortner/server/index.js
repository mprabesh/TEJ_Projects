const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, DB_URL } = require("./utils/config");
const urlRoute = require("./controllers/urlController");

// Enable CORS for all requests
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connected Successfully");
  })
  .catch((err) => console.log(err));

app.use("/prabeshURL", urlRoute);
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Unknown Endpoints" });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
