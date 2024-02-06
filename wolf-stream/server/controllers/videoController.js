const express = require("express");
const bodyParser = require("body-parser");
const video = express.Router();
const fs = require("fs");
const dbo = require("../db/conn"); //database
video.use(bodyParser.urlencoded({ extended: true }));
video.use(express.json());
const multer = require("multer");

// Multer storage setup (you need to define `generalStorage` in your storage.js)
const generalStorage = require("../storage");
const upload = multer({ storage: generalStorage });

// Route for handling file uploads and saving data to the database
video.route("/upload").post(upload.single("videoFile"), async (req, res) => {
  try {
    let db_connect = dbo.getDb("wolfstreamDB");

    // Create a new video document with data from the request
    const newVideo = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      // Add other fields as needed
    };

    // Insert the new video document into the collection
    await collection.insertOne(newVideo);

    res.send(
      "File and video information were uploaded successfully to the server and database!"
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});
// const express = require("express");
// const bodyParser = require("body-parser");
// const video = express();
// const fs = require("fs");
// const multer = require("multer"); // Require the multer package

// video.set('view engine', 'ejs');
// video.use(bodyParser.urlencoded({ extended: true }));
// video.use(express.json());

// // Create a storage engine for multer to specify where to save the uploaded file
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'videos'); // Save the file in the "videos" folder
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// function writeTo(file, data) {
//   fs.writeFile(file, JSON.stringify(data), "utf8", (err) => {
//     throw err;
//   });
// }

// function readFrom(file) {
//   if (fs.existsSync(file)) {
//     let data = fs.readFileSync(file, "utf-8");
//     data = JSON.parse(data);
//     return data;
//   }
// }

// /*------ GET: / ------
// - Retrieves the home with
//   videos and options
//   available.
// - Render home view
// -------------------------*/
// // video.get('/', function(req, res) {
// //      res.render('home');
// // })

// /*------ POST: /login ------
// - Handle data of existing video
// - Verify if existing video in
//   video.json file
// -------------------------*/
// video.post('/uploaded', upload.single('videoFile'), (req, res) => {
//   // video.post('/uploaded', (req, res) => {
//   try {
//     console.log(req.body)
//     let title = req.body.title;
//     let category = req.body.category;//? es un array
//     let description = req.body.description;
//     let src = req.body.videoFile;

//     if (title != "" && category != "" && description != "" && src != "") {
//       const data = readFrom("././data/videos.json");
//       const videos = data.users;
//       // console.log(users);
//       let userExists = false;
//       let lastIndex = 0;

//       for (let index in videos) {
//         if (videos[index].src == src) {
//           userExists = true;
//           res.send("Username exists");
//         }

//         lastIndex = parseInt(index);
//       }

//       if (!userExists) {
//         let video = {
//           title: title,
//           category: category,//? es un array
//           description: description,
//           src: src,
//           likes:0,
//           comments:[]
//         };

//         data.videos[`${lastIndex + 1}`] = video;

//         writeTo("././data/videos.json", data);
//         res.redirect("http://localhost:3000/Home")
//       }
//     }

//     else {
//       res.send('The title, category, description, and src can`t be empty');
//     }
//   }
//   catch (error) {
//     res.status(400).send('Invalid JSON data dude');
//   }
// })
// video.post('/uploaded', (req, res) => {
//   try {
//     console.log(req.body)
//     let title = req.body.title;
//     let category = req.body.category;//? es un array
//     let description = req.body.description;
//     let videoFile = req.body.videoFile;

//     if (title != "" && category != "" && description != "" && src != "") {
//       const data = readFrom("././data/videos.json");
//       const videos = data.users;
//       // console.log(users);
//       let userExists = false;
//       let lastIndex = 0;

//       for (let index in videos) {
//         if (videos[index].src == src) {
//           userExists = true;
//           res.send("Username exists");
//         }

//         lastIndex = parseInt(index);
//       }

//       if (!userExists) {
//         let video = {
//           title: title,
//           category: category,//? es un array
//           description: description,
//           src: src,
//           likes:0,
//           comments:[]
//         };

//         data.videos[`${lastIndex + 1}`] = video;

//         writeTo("././data/videos.json", data);
//         res.redirect("http://localhost:3000/Home")
//       }
//     }

//     else {
//       res.send('The title, category, description, and src can`t be empty');
//     }
//   }
//   catch (error) {
//     res.status(400).send('Invalid JSON data dude');
//   }
// })

//esto funcniona, just testing!!!!
// video.get("/test", (req, res) => {
//   let id = req.query.id;

//   //busqueda simulada
//   res.send({
//     message: "success",
//     video: {
//       name: "ismael",
//       lastname: "lopez",
//     },
//   });
// });

 module.exports = video;
