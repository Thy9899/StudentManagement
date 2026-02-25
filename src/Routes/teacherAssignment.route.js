const express = require("express");
const router = express.Router();
const teacherAssignmentController = require("../Controller/teacherAssignment.controller");
const authMiddleware = require("../Middleware/authMiddleware");

//GET all teacher assignments
router.get(
  "/",
  authMiddleware,
  teacherAssignmentController.getAllTeacherAssignments,
);

//GET a teacher assignment by ID
router.get(
  "/:id",
  authMiddleware,
  teacherAssignmentController.getTeacherAssignmentById,
);

//CREATE a new teacher assignment
router.post(
  "/",
  authMiddleware,
  teacherAssignmentController.createTeacherAssignment,
);

module.exports = router;
