const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "execution" });
});

app.get("/api/v1/execution/test", (req, res) => {
    res.json({ msg: "execution" });
});

module.exports = app;