const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { DB_URI, DB_NAME } = require("./config");
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(DB_URI);

const User = require("./models/user");
const crypto = require("crypto");

const Joaat = (b) => {
  let jhash = 0,
    i,
    chr;
  if (b.length === 0) return jhash.toString(16);
  for (i = 0; i < b.length; i += 1) {
    chr = b.charCodeAt(i);
    jhash = (jhash << 5) - jhash + chr;
    jhash |= 0; // Convert to 32bit integer
  }
  return jhash.toString(12).replace("-", "0");
};

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
app.post("/api/v1/user/create", async (req, res) => {
  let body = req.body;

  // process body?

  /**
   * email: string,
   * name: {fist:string, middle:?string, last:string}
   * password: string
   */

  if (
    typeof body.email !== "string" ||
    typeof body.name !== "object" ||
    typeof body.name.first !== "string" ||
    typeof body.name.last !== "string" ||
    typeof body.password !== "string"
  )
    return res.sendStatus(403);

  let credential = ((password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return `${salt}.${hash}`;
  })(body.password);

  /**
   * _id
   * name: {first, middle, last}
   * email
   * default_tenant
   * status
   * auth: {credentail, validated, token}
   */

  const token = `${Joaat(body.email + Date.now())}-${Math.floor(
    (Date.now() * 1122) / 1000
  ).toString(12)}`;

  // TODO: Send to mail service activation email with code

  let user = await User(db, {
    name: body.name,
    email: body.email,
    default_tenant: 0,
    status: 0,
    auth: {
      credential,
      validated: false,
      token,
    },
  }).catch((err) => {
    console.error(err);
    return res.sendStatus(500);
  });

  await user.save().catch((err) => {
    return res.sendStatus(500);
  });

  return res
    .status(201)
    .setHeader({ Location: `/api/v1/user/${user.data._id}` })
    .send(user.data);
});

app.post('/api/v1/user/login', async (req, res) => {
  let body = req.body;
  /**
   * email: string,
   * password: string
  */

  if(typeof body.email !== 'string' || typeof body.password !== 'string') {
    console.log('invalid body')
    return res.sendStatus(403);
  }

  const user = await User(db);
  console.log(user);
  await user.lookup(body.email);

  let credentials = user.data.auth.credential.split('.');
  const hash = crypto.pbkdf2Sync(body.password,  
    credentials[0], 1000, 64, `sha512`).toString(`hex`); 
  if(hash !== credentials[1]) {
    console.log('invalid password')
    return res.sendStatus(403);
  }

  // if(user.status !== 1) {
  //   console.log('user inactive')
  //   return res.sendStatus(403);
  // }

  // TODO: setup JWT

  return res.send(user.getSafe());

})

app.get("/api/v1/user/test", (req, res) => {
  res.json({
    msg: "",
  });
});

module.exports = app;
