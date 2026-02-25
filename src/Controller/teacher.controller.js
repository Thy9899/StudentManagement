const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../Models/teacher");

// JWT secret and options
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";
const SALT_ROUNDS = 10;

// Register a new teacher
const register = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    // Check if the email or username already exists
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Email, username, and password are required" });
    }

    // Check if email or username already exists
    const exists = await Teacher.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Email must be a Gmail address" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new teacher
    const newTeacher = new Teacher({
      email,
      username,
      password: hashedPassword,
      role: role || "teacher",
    });

    await newTeacher.save();
    res.status(201).json({
      message: "Teacher registered successfully",
      teacher: {
        id: newTeacher._id,
        email: newTeacher.email,
        username: newTeacher.username,
        role: newTeacher.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login a teacher
const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res
        .status(400)
        .json({ message: "Login and password are required" });
    }

    // Find user by email or username
    const user = await Teacher.findOne({
      $or: [{ email: login }, { username: login }],
    });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET a teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select("-password");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//UPDATE a teacher by ID
const updateTeacher = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    const updatedData = { email, username, role };

    if (password) {
      updatedData.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    ).select("-password");

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  login,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
};
