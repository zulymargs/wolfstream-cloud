const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
 
var _db;
 
module.exports = {
  connectToServer: async function (callback) {
    try {
      client.connect().then((db) => {
        // Verify we got a "db" object
        if (db)
        {
          _db = db.db("wolfstreamDB");
          console.log("Successfully connected to MongoDB."); 
        }
        return callback(db);
      });

    } catch(e) {
      console.log(" jiji ")
    }
    
  },
 
  getDb: function () {
    return _db;
  },
};