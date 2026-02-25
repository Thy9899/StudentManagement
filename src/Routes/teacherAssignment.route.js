const express = require("express");
const router = express.Router();
const teacherAssignmentController = require("../Controller/teacherAssignment.controller");

//GET all teacher assignments
router.get("/", teacherAssignmentController.getAllTeacherAssignments);

//GET a teacher assignment by ID
router.get("/:id", teacherAssignmentController.getTeacherAssignmentById);

//CREATE a new teacher assignment
router.post("/", teacherAssignmentController.createTeacherAssignment);

module.exports = router;
