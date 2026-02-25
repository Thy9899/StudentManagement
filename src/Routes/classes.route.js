const expess = require("express");
const router = expess.Router();
const classController = require("../Controller/classes.controller");

//GET all classes
router.get("/", classController.getAllClasses);

//GET a class by ID
router.get("/:id", classController.getClassById);

//CREATE a new class
router.post("/", classController.createClass);

//UPDATE a class by ID
router.put("/:id", classController.updateClass);

module.exports = router;
