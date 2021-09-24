const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.json({msg : "search"});
});

app.get("/api/v1/search/test", (req, res)=>{
    res.json({msg : "search"});
});

module.exports = app;