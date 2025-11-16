const multer = require("multer");
const path = require("path");
const fs = require("fs");

// pastikan folder tmp ada
const tmpDir = path.join(__dirname, "..", "tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

module.exports = multer({ storage });
