const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const photoController = require("../controllers/galleryPhotoControllers");

// ensure uploads dir
// In routes/galleryPhotoRoutes.js
const uploadDir = path.join(__dirname, "..", "Galleryphoto");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);


// multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, unique);
  }
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("photo"), photoController.addPhoto);
router.get("/show", photoController.getAllPhotos);
router.delete("/:id", photoController.deletePhoto);

module.exports = router;
