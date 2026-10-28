const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User'); // User model import kiya
const ExpertEvaluation = require('./models/ExpertEvaluation'); // Expert Evaluation model import kiya

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (MongoDB Atlas Cloud via .env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Cloud Database Connected Successfully!"))
  .catch((err) => console.log("Database Connection Error: ", err));

// Register API Route
app.post('/api/register', async (req, res) => {
  try {
    const { role, email, password, startupName, diiptNumber, yearFounded, sector, ministryName, departmentType, officialEmail, nodalDesignation } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already registered!" });
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      role,
      email,
      password: hashedPassword,
      startupName,
      diiptNumber,
      yearFounded,
      sector,
      ministryName,
      departmentType,
      officialEmail,
      nodalDesignation
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully under GovTech Sandbox!", userId: newUser._id });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Server error during registration." });
  }
});

// Expert Evaluation API Route (Saves expert review scores & final decisions to MongoDB)
app.post('/api/expert/evaluations', async (req, res) => {
  try {
    const evaluation = new ExpertEvaluation(req.body);
    await evaluation.save();
    res.status(201).json({ success: true, message: "Expert evaluation saved successfully in MongoDB cloud!" });
  } catch (err) {
    console.error("Expert Evaluation Save Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all registered users/startups (For viewing in browser)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Fetch Users Error:", err);
    res.status(500).json({ error: "Failed to fetch users from database." });
  }
});

// Test Route
app.get('/', (req, res) => {
  res.json({ message: "ProcurePilot Backend API & Database are running successfully!" });
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});