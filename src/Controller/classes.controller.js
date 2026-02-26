const Classes = require("../Models/classes");
const Teacher = require("../Models/teacher");
const Student = require("../Models/student");
const teacherAssignment = require("../Models/teacherAssignment");

//GET all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Classes.find().populate("teacherId", "username");

    res.status(200).json({
      classes: classes.map((Class) => ({
        classId: Class._id,
        className: Class.className,
        academicYear: Class.academicYear,
        // teacherName: Class.teacherId.username,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET all classes data
const getAllClassesData = async (req, res) => {
  try {
    const classes = await Classes.find();

    const result = await Promise.all(
      classes.map(async (cls) => {
        // get students by classId
        const students = await Student.find(
          { classId: cls._id, isActive: true },
          "student_Name",
        );

        const assignments = await teacherAssignment
          .find({ classId: cls._id })
          .populate("teacherId", "username")
          .populate("subjectId", "subjectName");

        return {
          classId: cls._id,
          className: cls.className,
          academicYear: cls.academicYear,

          students: students.map((s) => s.student_Name),

          teachingAssignments: assignments.map((a) => ({
            teacher: a.teacherId?.username ?? "",
            subject: a.subjectId?.subjectName ?? "",
          })),
        };
      }),
    );

    res.status(200).json({ classes: result });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET a class by ID
const getClassById = async (req, res) => {
  try {
    const cls = await Classes.findById(req.params.id);

    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }

    // get students by classId
    const students = await Student.find(
      { classId: cls._id, isActive: true },
      "student_Name",
    );

    const assignments = await teacherAssignment
      .find({ classId: cls._id })
      .populate("teacherId", "username")
      .populate("subjectId", "subjectName");

    const result = {
      classId: cls._id,
      className: cls.className,
      academicYear: cls.academicYear,

      students: students.map((s) => s.student_Name),

      teachingAssignments: assignments.map((a) => ({
        teacher: a.teacherId?.username ?? "",
        subject: a.subjectId?.subjectName ?? "",
      })),
    };

    res.status(200).json({ class: result });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//CREATE a new class
const createClass = async (req, res) => {
  try {
    const { className, academicYear } = req.body;

    // if (!req.user?.is_teacher)
    //   return res.status(403).json({ error: "Access denied" });

    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "Forbidden" });
    // }

    if (!className || !academicYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check class exists (VERY IMPORTANT)
    // const teacherExists = await Teacher.findById(teacherId);
    // if (!teacherExists) {
    //   return res.status(404).json({ message: "Teacher not found" });
    // }

    const newClass = new Classes({
      className,
      academicYear,
      // teacherId,
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
    const { classId, className, academicYear, teacherId } = req.body;

    const updatedClass = await Classes.findByIdAndUpdate(
      req.params.id,
      { classId, className, academicYear, teacherId },
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
  getAllClassesData,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
