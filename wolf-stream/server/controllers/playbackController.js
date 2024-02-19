const express = require("express");
const bodyParser = require("body-parser");
const playback = express.Router();
const fs = require("fs");
const dbo = require("../db/conn"); //database
const cors = require("cors");
playback.use(bodyParser.urlencoded({ extended: true }));
playback.use(express.json());

// playback.get("/", (req, res) => {
//   res.json({
//     message: "Connected",
//   });
// });

playback.get("/:videoID", async (req, res) => {
  const videoID = req.params.videoID;
  console.log("Received Video ID:", videoID);

  try {
    let db_connect = dbo.getDb("wolfstreamDB");
    const video = await db_connect
      .collection("videos")
      .findOne({ _id: videoID });

    if (video) {
      console.log("Video Details:", video);
      res.json(video);
    } else {
      console.log("Video not found");
      res.status(404).json({ error: "Video not found" });
    }
  } catch (error) {
    console.error("Error fetching video details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = playback;
