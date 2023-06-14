require("dotenv").config();
const { MongoClient } = require("mongodb");

let databaseConnection;

module.exports = {
  // establish connection to db
  connectToDatabase: (func) => {
    MongoClient.connect(process.env.MONGO_URI)
      .then((client) => {
        databaseConnection = client.db();
        return func();
      })
      .catch((error) => {
        console.error(error);
        return func(error);
      });
  },

  // return connect
  getDatabase: () => databaseConnection,
};
