const expess = require("express");
const router = expess.Router();
const classController = require("../Controller/classes.controller");
const authMiddleware = require("../Middleware/authMiddleware");

//GET all classes
router.get("/", authMiddleware, classController.getAllClasses);

//GET a class by ID
router.get("/:id", authMiddleware, classController.getClassById);

//CREATE a new class
router.post("/", authMiddleware, classController.createClass);

//UPDATE a class by ID
router.put("/:id", authMiddleware, classController.updateClass);

module.exports = router;
