const express = require("express");
const connectDB = require("./config/db.config");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// app.use(express.json()); // JSON body parser
// app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and log connection status
connectDB();

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
