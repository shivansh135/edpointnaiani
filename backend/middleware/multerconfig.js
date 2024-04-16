const multer = require('multer');

// Set up multer for handling file uploads in memory
const upload = multer({
  storage: multer.memoryStorage()
});

module.exports = upload;
