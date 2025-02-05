const express = require("express");
const { register, login, profile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single('image'), register);
router.post("/login", login);
router.post("/profile",authMiddleware, profile);

module.exports = router;
