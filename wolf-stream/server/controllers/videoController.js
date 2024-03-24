const express = require("express");
const bodyParser = require("body-parser");
const video = express.Router();
const fs = require("fs");
const dbo = require("../db/conn"); // database
video.use(bodyParser.urlencoded({ extended: true }));
video.use(express.json());
const multer = require("multer");

// Multer configuration for storing files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for handling file uploads and saving data to the database
video.post("/video", upload.single("image"), async (req, res) => {
  try {
    // Access uploaded file via req.file
    console.log("Uploaded file:", req.file);

    // Access other form data sent along with the file
    const { title, description, category } = req.body;
    console.log("Form data:", title, description, category);

    // Here you can save the file to disk, database, or perform other operations

    res.send("File and video information were uploaded successfully to the server and database!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = video;
