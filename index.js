require("dotenv").config();
const mongo = require("mongoose");
const express = require("express");
const cors = require("cors");
const upload = require("express-fileupload")
const router = require("./routes/index");
const path = require('path')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(upload({debug: true}))
app.use("/image", express.static(path.resolve(__dirname, "image")))
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(router);


async function start() {
  await mongo.connect(process.env.MONGO_PORT);
  app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}...`);
  });
}
start();