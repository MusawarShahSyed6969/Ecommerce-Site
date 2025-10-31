const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// ✅ Configure storage to directly upload to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce_products", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
