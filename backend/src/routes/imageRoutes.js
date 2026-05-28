const express = require("express");
const imageController = require("../controllers/imageController");
const validate = require("../middleware/validate");
const { authenticate, optionalAuthenticate } = require("../middleware/authMiddleware");
const { uploadImage, validateMagicBytes } = require("../middleware/uploadMiddleware");
const imageValidation = require("../validations/imageValidation");

const router = express.Router();

router.get("/feed", optionalAuthenticate, validate(imageValidation.feed), imageController.feed);
router.get("/search", optionalAuthenticate, imageController.searchImages);
router.post("/upload", authenticate, uploadImage, validateMagicBytes, validate(imageValidation.createUpload), imageController.upload);
router.get("/:id", optionalAuthenticate, validate(imageValidation.imageId), imageController.getImage);
router.delete("/:id", authenticate, validate(imageValidation.imageId), imageController.deleteImage);
router.get("/admin/seed-indian-50", require("../controllers/seedController").seedIndian);

router.get("/admin/nuke-bad", async (req, res) => {
  try {
    const { pool } = require("../config/database");
    await pool.query("DELETE FROM images WHERE title LIKE '%Virat%' OR title LIKE '%Spice%' OR title LIKE '%Mehndi%'");
    res.json({ success: true, message: "Nuked bad images!" });
  } catch(e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
