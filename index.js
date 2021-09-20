require("dotenv").config();
const mongo = require("mongoose");
const express = require("express");
const cors = require("cors");
const router = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 4003;

app.use(express.json());
app.use(router);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

async function start() {
  await mongo.connect(process.env.MONGO_PORT);
  app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}...`);
  });
}
start();