const exprees = require("express");
const router = exprees.Router();
const subjectController = require("../Controller/subject.controller");
const authMiddleware = require("../Middleware/authMiddleware");

//GET all subjects
router.get("/", authMiddleware, subjectController.getAllSubjects);

//GET a subject by ID
router.get("/:id", authMiddleware, subjectController.getSubjectById);

//CREATE a new subject
router.post("/", authMiddleware, subjectController.createSubject);

//UPDATE a subject by ID
router.put("/:id", authMiddleware, subjectController.updateSubject);

module.exports = router;
