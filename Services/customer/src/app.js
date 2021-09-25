const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const {
    DB_URI
} = require("./config");
const {
    MongoClient
} = require('mongodb');
const mongoClient = new MongoClient(DB_URI);
const Customer = require('./models/customer');
let db = null;

(async () => {
    let client = await mongoClient.connect().catch(err => {
        console.log(err);
    });
    db = client.db('customer');
})();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        msg: "customer"
    });
});

// Routes for entire collection

app.get("/api/v1/customer", async (req, res) => {

    let customer = await Customer(db);

    customer.fetch().then(data => {
        res.send(data);
    }).catch(err => {
        res.sendStatus(500)
    });

});

app.post("/api/v1/customer", async (req, res) => {

    // needs 

    let body = req.body;

    // process body?

    let customer = await Customer(db, body).catch(err => {
        return res.sendStatus(500);
    });

    await customer.save().catch(err => {
        return res.sendStatus(500);
    });

    return res.status(201).setHeader({Location: `/api/v1/customer/${customer.data._id}`}).send(customer.data);

});

app.put("/api/v1/customer", async (req, res) => {
    return res.sendStatus(405);
});

app.patch("/api/v1/customer", async (req, res) => {
    return res.sendStatus(405);
});

app.delete("/api/v1/customer", async (req, res) => {
    res.sendStatus(405);
});

// Routes for individual records


app.get("/api/v1/customer/:id", async (req, res) => {

    // needs 404 for not found

    let customer = await Customer(db);

    customer.fetch().then(data => {
        res.send(data);
    }).catch(err => {
        res.sendStatus(500)
    });

});

app.post("/api/v1/customer/:id", async (req, res) => {

    return res.sendStatus(409);

});

app.put("/api/v1/customer/:id", async (req, res) => {

    // needs 404 for not found

    let _id = req.params.id;
    let body = req.body;

    //process body?

    let customer = await Customer(db, _id).catch(err => {
        return res.sendStatus(500);
    });

    customer.update(body);

    await customer.save().catch(err => {
        return res.sendStatus(500);
    });

    return res.send(customer.data);
});

app.patch("/api/v1/customer/:id", async (req, res) => {

    // needs 404 for not found

    let _id = req.params.id;
    let body = req.body;

    //process body?

    let customer = await Customer(db, _id).catch(err => {
        return res.sendStatus(500);
    });

    customer.update(body);

    await customer.save().catch(err => {
        return res.sendStatus(500);
    });

    return res.send(customer.data);
});

app.delete("/api/v1/customer/:id", async (req, res) => {

    // TODO: needs 404 error for not found

    let _id = req.params.id;

    let customer = await Customer(db, _id).catch(err => {
        return res.sendStatus(500);
    });

    customer.data.status = 2;
    
    await customer.save().catch(err => {
        return res.sendStatus(500);
    });

    return res.sendStatus(200);

});

app.get("/api/v1/customer/meta", (req, res) => {
    res.json([{
            title: "id",
            field: "id",
            hidden: true
        },
        {
            title: "First name",
            field: "firstName"
        },
        {
            title: "Last name",
            field: "lastName"
        },
        {
            title: "email",
            field: "email"
        }
    ]);
});

app.get("/api/v1/customer/test", (req, res) => {
    res.json({
        msg: "customer"
    });
});

module.exports = app;