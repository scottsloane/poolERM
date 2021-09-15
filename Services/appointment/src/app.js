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
const Appointment = require('./models/appointment');
let db = null;

(async () => {
    let client = await mongoClient.connect().catch(err => {
        console.log(err);
    });
    db = client.db('appointment');
})();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        msg: "appointment"
    });
});

// Routes for entire collection

app.get("/api/v1/appointment", async (req, res) => {

    let appointment = await Appointment(db);

    appointment.fetch().then(data => {
        res.send(data);
    }).catch(err => {
        res.sendStatus(500)
    });

});

app.post("/api/v1/appointment", async (req, res) => {

    // needs 

    let body = req.body;

    // process body?

    let appointment = await Appointment(db, body).catch(err => {
        return res.sendStatus(500);
    });

    await appointment.save().catch(err => {
        return res.sendStatus(500);
    });

    return res.status(201).setHeader({Location: `/api/v1/appointment/${appointment.data._id}`}).send(appointment.data);

});

app.put("/api/v1/appointment", async (req, res) => {
    return res.sendStatus(405);
});

app.patch("/api/v1/appointment", async (req, res) => {
    return res.sendStatus(405);
});

app.delete("/api/v1/appointment", async (req, res) => {
    res.sendStatus(405);
});

// Routes for individual records


app.get("/api/v1/appointment/:id", async (req, res) => {

    // needs 404 for not found

    let appointment = await Appointment(db);

    appointment.fetch().then(data => {
        res.send(data);
    }).catch(err => {
        res.sendStatus(500)
    });

});

app.post("/api/v1/appointment/:id", async (req, res) => {

    return res.sendStatus(409);

});

app.put("/api/v1/appointment/:id", async (req, res) => {

    // needs 404 for not found

    let _id = req.params.id;
    let body = req.body;

    //process body?

    let appointment = await Appointment(db, _id).catch(err => {
        return res.sendStatus(500);
    });

    appointment.update(body);

    await appointment.save().catch(err => {
        return res.sendStatus(500);
    });

    return res.send(appointment.data);
});

app.patch("/api/v1/appointment/:id", async (req, res) => {

    // needs 404 for not found

    let _id = req.params.id;
    let body = req.body;

    //process body?

    let appointment = await Appointment(db, _id).catch(err => {
        return res.sendStatus(500);
    });

    appointment.update(body);

    await appointment.save().catch(err => {
        return res.sendStatus(500);
    });

    return res.send(appointment.data);
});

app.delete("/api/v1/appointment/:id", async (req, res) => {

    // TODO: needs 404 error for not found

    let _id = req.params.id;

    let appointment = await Appointment(db, _id).catch(err => {
        return res.sendStatus(500);
    });

    appointment.data.status = 2;
    
    await appointment.save().catch(err => {
        return res.sendStatus(500);
    });

    return res.sendStatus(200);

});

app.get("/api/v1/appointment/meta", (req, res) => {
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

app.get("/api/v1/appointment/test", (req, res) => {
    res.json({
        msg: "appointment"
    });
});

module.exports = app;