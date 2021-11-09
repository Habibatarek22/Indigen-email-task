const path = require("path");

const multerConfig = {
  destination: function (req, file, callback) {
    callback(null, path.resolve("images")); //path of folder el finalized
  }, // foldername
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname); //for assigning unique file name  when upload images
  },
};

module.exports = multerConfig;
