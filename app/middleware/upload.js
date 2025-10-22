const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // Limit file size
  fileFilter: function (req, file, cb) {
    // Validate file type
    const filetypes = /jpeg|jpg|png|pdf|doc|docx|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Invalid file type'));
    }
  }
});

module.exports = upload;
