require("dotenv").config();

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;
const BASE_URL = process.env.BASE_URL;

module.exports = { PORT, DB_URL, BASE_URL };
