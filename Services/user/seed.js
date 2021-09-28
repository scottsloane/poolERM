const fs = require('fs');

const {
    DB_URI,
    DB_NAME,
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
    db = client.db(DB_NAME);
    await db.collection(DB_NAME).remove({});
    
    if(fs.existsSync('./seed.data.json')) {
        let seedData = JSON.parse(fs.readFileSync('./seed.data.json','utf-8'));
        await db.collection(DB_NAME).insertMany(seedData.appointment);
    }
})();