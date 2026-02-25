const exprees = require("express");
const router = exprees.Router();
const subjectController = require("../Controller/subject.controller");

//GET all subjects
router.get("/", subjectController.getAllSubjects);

//GET a subject by ID
router.get("/:id", subjectController.getSubjectById);

//CREATE a new subject
router.post("/", subjectController.createSubject);

//UPDATE a subject by ID
router.put("/:id", subjectController.updateSubject);

module.exports = router;
