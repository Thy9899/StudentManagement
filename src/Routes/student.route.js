const expree = require("express");
const router = expree.Router();
const studentController = require("../Controller/student.controller");
const authMiddleware = require("../Middleware/authMiddleware");

//GET all students
router.get("/", authMiddleware, studentController.getAllStudents);

//GET a student by ID
router.get("/:id", authMiddleware, studentController.getStudentById);

//CREATE a new student
router.post("/", authMiddleware, studentController.createStudent);

//UPDATE a student by ID
router.put("/:id", authMiddleware, studentController.updateStudent);

//DELETE a student by ID
router.delete("/:id", authMiddleware, studentController.deleteStudent);

module.exports = router;
