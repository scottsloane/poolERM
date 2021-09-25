let DB_URI = "mongodb://localhost:27017/microservices";
let DB_NAME = "microservice";

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}
if (process.env.MONGO_DB_NAME) {
  DB_NAME = process.MONGO_DB_NAME;
}

module.exports = {
  DB_URI,
  DB_NAME,
};
