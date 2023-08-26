require("dotenv").config();
const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: "dj-sanghvi-college",
//   api_key: "559884216729385",
//   api_secret: "YguaZqEqHRDRuvkMEL7Fst1ZI0s",
// });
cloudinary.config({
  cloud_name: "dhrhibq1y",
  api_key: "764392159885981",
  api_secret: "7XgDVKh0ljNBo_4f70KwY22oB6I",
});

module.exports = { cloudinary };
