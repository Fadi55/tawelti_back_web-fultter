const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/events/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-TAWELTI-events-${file.originalname}`);
  },
});

var uploadFileEvent = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFileEvent;
 