const Classes = require("../Models/classes");
const Teacher = require("../Models/teacher");

//GET all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Classes.find().populate("teacherId", "username");

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET a class by ID
const getClassById = async (req, res) => {
  try {
    const classData = await Classes.findById(req.params.id).populate(
      "teacherId",
      "username",
    );

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//CREATE a new class
const createClass = async (req, res) => {
  try {
    const { className, academyYear, teacherId } = req.body;

    if (!className || !academyYear || !teacherId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check class exists (VERY IMPORTANT)
    const teacherExists = await Teacher.findById(teacherId);
    if (!teacherExists) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const newClass = new Classes({
      className,
      academyYear,
      teacherId,
    });

    await newClass.save();

    res.status(201).json({
      message: "Class created successfully",
      class: newClass,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//UPDATE a class by ID
const updateClass = async (req, res) => {
  try {
    const { classId, className, academyYear, teacherId } = req.body;

    const updatedClass = await Classes.findByIdAndUpdate(
      req.params.id,
      { classId, className, academyYear, teacherId },
      { new: true },
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({
      message: "Class updated successfully",
      class: updatedClass,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//DELETE a class by ID
const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Classes.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
