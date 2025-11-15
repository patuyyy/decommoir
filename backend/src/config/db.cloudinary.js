const dotenv = require('dotenv');
dotenv.config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloudinariy_url: process.env.CLOUDINARY_URL,
});

module.exports = { cloudinary };