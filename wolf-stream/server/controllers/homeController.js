const express = require("express");
const bodyParser = require("body-parser");
const home = express.Router();
const fs = require("fs");
const dbo = require("../db/conn"); //database


home.use(bodyParser.urlencoded({ extended: true }));
home.use(express.json());
home.use(express.static('public'));

/*------ GET: / ------
- Retrieves the home with
  videos and options
  available.
- Render home view 
-------------------------*/
home.route("/videos").get(async (req, res) => {
  try {
    const dbConnect = await dbo.getDb("wolfstreamDB");
    console.log(dbConnect); // Logging the database connection might not be necessary
    const videos = await dbConnect
      .collection("videos")
      .find({})
      .toArray();
   console.log(videos);
    res.json(videos);
    
  } catch (error) {
    console.error('Error fetching videos from the database:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Testing route
home.get("/test", (req, res) => {
  const author = {
    name: 'Zuly',
    skills: ['JavaScript', 'C++', 'Node.js', 'jQuery']
  };

  res.render('test.ejs', { author });
});

module.exports = home;
