const dotenv = require("dotenv");
const path = require("path");
const envPath = path.resolve(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.BACK_END_PORT;
const mongodb_url = process.env.MONGODB_URL_V2;

const router = require("./src/routes/routes");

const app = express();
app.set(port || 80);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
mongoose
  .connect(mongodb_url, { useNewUrlParser: true })
  .then(() => {
    console.log("Connect to MongoDB successfull!");
  })
  .catch((error) => {
    console.log("Connect to MongoDB failed!" + error);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});
