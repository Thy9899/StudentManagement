const Student = require("../Models/student");
const Class = require("../Models/classes");

//GET all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate(
      "classId",
      "className academyYear",
    );

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET a student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "classId",
      "className academyYear",
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//CREATE a new student
const createStudent = async (req, res) => {
  try {
    const { student_Code, student_Name, gender, date_of_birth, classId } =
      req.body;

    if (
      !student_Code ||
      !student_Name ||
      !gender ||
      !date_of_birth ||
      !classId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check class exists (VERY IMPORTANT)
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: "Class not found" });
    }

    const newStudent = new Student({
      student_Code,
      student_Name,
      gender,
      date_of_birth,
      classId,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//UPDATE a student by ID
const updateStudent = async (req, res) => {
  try {
    const { student_Code, student_Name, gender, date_of_birth, classId } =
      req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { student_Code, student_Name, gender, date_of_birth, classId },
      { new: true },
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//DELETE a student by ID
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
