const express = require("express");
const dbo = require("../db/conn"); //database
const social = express.Router();
social.get("/likes/videoID", async (req, res) => {
  const videoID = req.query.videoID;
  console.log("Received Video ID:", videoID);

  try {
    let db_connect = dbo.getDb("wolfstreamDB");
    const videoLikes = await db_connect
      .collection("videos")
      .findOneAndUpdate(
        { _id: videoID },
        { $inc: { likes: 1 } },
        { returnDocument: "after" }
      );
    console.log("Video Likes:", videoLikes);
    res.status(200).json(videoLikes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = social;
