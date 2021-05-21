const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "customer" });
});

module.exports = app;