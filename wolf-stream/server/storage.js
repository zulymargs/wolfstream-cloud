const multer = require("multer");

// Path to the storage folder
const uploadPath = "server/static/uploads";

// This function decides the destination and name of the uploaded file
function createMulterStorage(destinationPath) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      // Uses the original file name
      const filename = file.originalname;
      cb(null, filename);
    },
  });
}

// Creates the multer storage configuration on the uploadPath given.
const generalStorage = createMulterStorage(uploadPath);

module.exports = generalStorage;
