const express = require("express");
const router = express.Router();
const teacherController = require("../Controller/teacher.controller");
// const authMiddleware = require("../Middleware/authMiddleware");
// const roleMiddleware = require("../Middleware/roleMiddleware");

// Register a new teacher
router.post("/register", teacherController.register);

// Login a teacher
router.post("/login", teacherController.login);

// Get all teachers
router.get("/", teacherController.getAllTeachers);

// Get a teacher by ID
router.get("/:id", teacherController.getTeacherById);

// Update a teacher by ID
router.put("/:id", teacherController.updateTeacher);

module.exports = router;
