const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { DB_URI, DB_NAME } = require("./config");
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(DB_URI);

// const ModelName = require('./models/modelname');

let db = null;

(async () => {
  let client = await mongoClient.connect().catch((err) => {
    console.log(err);
  });
  db = client.db(DB_NAME);
})();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    msg: "",
  });
});

// Routes for entire collection

app.get("/api/v1/appointment/test", (req, res) => {
  res.json({
    msg: "",
  });
});

module.exports = app;
