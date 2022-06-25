const fs = require('fs');

const {
    DB_URI
} = require("./src/config");
const {
    MongoClient
} = require('mongodb');

const mongoClient = new MongoClient(DB_URI);

let db = null;
(async()=>{
    let client = await mongoClient.connect().catch(err => {
        console.log(err);
    });
    db = client.db('poolERM');
    await db.collection('appointment').remove({});
    await db.collection('task').remove({});
    if(fs.existsSync('./seed.data.json')) {
        let seedData = JSON.parse(fs.readFileSync('./seed.data.json','utf-8'));
        await db.collection('appointment').insertMany(seedData.appointment);
        await db.collection('task').insertMany(seedData.task);
    }
})();