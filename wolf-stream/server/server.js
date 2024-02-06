//---Dependecies required----
const express = require("express");
const bodyParser = require("body-parser");
var http = require("http");
const cors = require("cors");
const ejs = require("ejs");
const multer = require("multer");
const axios = require("axios"); // Import axios
//---MongoDB---
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn"); //our database

//---Express--/
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
const user = require("./controllers/userController");
const video = require("./controllers/videoController");
const home = require("./controllers/homeController");
const creator = require("./controllers/creatorController");
const playback = require("./controllers/playbackController");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.json({
    message: "Connected",
  });
});
app.get("/test", async (req, res) => {
  let db_connect = dbo.getDb("wolfstreamDB");
  console.log("AAAAAAAAAAAA");
  console.log(db_connect);
  let obj = await db_connect.collection("videos").find({}).toArray();
  res.json(obj);
  console.log(obj);
});

app.use("/user", user); //Handles login and register functionalities
app.use("/home",home);
app.use("/playback", playback);

app.use("/upload", video);
// // app.use("/Home",creator);
// //  app.use("/playback",playback)
