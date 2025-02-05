const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const uploadFolder = path.join(__dirname, "../public/uploads/users");
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true }); // Creates the directory and nested folders if needed
}
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder); // Use the dynamically created folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
  
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error("Only image files are allowed"), false);
        }
        cb(null, true);
    }
}).single('image');

// Register User
exports.register = async (req, res) => {
  try {
    const { first_name,last_name, username, email, password } = req.body;
    console.log("***************** Request Body ***********************",req.body);

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ status: "error", message: "User already exists" });
    console.log("***************** Request file ***********************",req.file);
    await new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                console.error("********************Error during image upload: *******************", err);
                reject(new Error("Image upload failed"));
            } else {
                resolve();
            }
        });
    });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userImage = req.file ? req.file.filename : null;
    // Create new user
    user = new User({ first_name, last_name, username, email, password: hashedPassword, image: userImage, });
    await user.save();

    res.status(201).json({ status: "success", message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("********************* Request Body *********************", req.body);
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: "error", message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: "error", message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ status: "success", message: "Login Successful!", token, user: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// User Profile
exports.profile = async (req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(400).json({ status: "error", message: "User Not Found" });
        const responseUser = { id: user._id, email: user.email, username: user.username, first_name: user.first_name, last_name: user.last_name };
        res.status(201).json({ status: "success", message: "User Find successfully", user: responseUser });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.upload = upload;