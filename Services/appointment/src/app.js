const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "appointment" });
});

app.get("/api/v1/appointment/test", (req, res) => {
    res.json({ msg: "appointment" });
});

module.exports = app;