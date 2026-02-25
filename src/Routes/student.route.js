const expree = require("express");
const router = expree.Router();
const studentController = require("../Controller/student.controller");

//GET all students
router.get("/", studentController.getAllStudents);

//GET a student by ID
router.get("/:id", studentController.getStudentById);

//CREATE a new student
router.post("/", studentController.createStudent);

//UPDATE a student by ID
router.put("/:id", studentController.updateStudent);

module.exports = router;
