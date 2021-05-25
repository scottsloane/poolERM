const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { DB_URI } = require("./config");
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(DB_URI);
const Customer = require('./models/customer');
let db = null;

(async()=>{
    let client = await mongoClient.connect().catch(err=>{
        console.log(err);
    });
    db = client.db('customer');
})();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "customer" });
});

app.get("/api/v1/customer", (req, res) => {
    res.json({
        data: [
            {firstName: 'Scott', lastName: 'Sloane', email: 'scott@scottsloane.com'}
        ]
    });
});

app.get("/api/v1/customer/meta", (req, res) => {
    res.json([
        {title: "id", field: "id", hidden: true},
        {title: "First name", field: "firstName"},
        {title: "Last name", field: "lastName"},
        {title: "email", field: "email"}
    ]);
});

app.get("/api/v1/customer/test", (req, res) => {
    res.json({ msg: "customer" });
});

module.exports = app;
