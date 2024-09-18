const express = require("express");
const app = express();

PORT = process.env.PORT ? process.env.PORT : 8080;

app.use(express.static("assets"));

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
