const teacherAssignment = require("../Models/teacherAssignment");

//GET all teacher assignments
const getAllTeacherAssignments = async (req, res) => {
  try {
    const assignments = await teacherAssignment
      .find()
      .populate("teacherId", "username")
      .populate("subjectId", "subjectName")
      .populate("classId", "className academicYear");

    res.status(200).json({
      assignments: assignments.map((assignment) => ({
        assignmentId: assignment._id,
        teacherName: assignment.teacherId?.username ?? "No teacher assigned",
        subjectName: assignment.subjectId?.subjectName ?? "No subject assigned",
        className: assignment.classId?.className ?? "No class assigned",
        academicYear:
          assignment.classId?.academicYear ?? "No academy year assigned",
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET a teacher assignment by ID
const getTeacherAssignmentById = async (req, res) => {
  try {
    const assignment = await teacherAssignment
      .findById(req.params.id)
      .populate("teacherId", "username")
      .populate("subjectId", "subjectName")
      .populate("classId", "className academicYear");

    if (!assignment) {
      return res.status(404).json({ message: "Teacher assignment not found" });
    }

    res.status(200).json({
      assignmentId: assignment._id,
      teacherName: assignment.teacherId?.username ?? "No teacher assigned",
      subjectName: assignment.subjectId?.subjectName ?? "No subject assigned",
      className: assignment.classId?.className ?? "No class assigned",
      academicYear:
        assignment.classId?.academicYear ?? "No academy year assigned",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//CREATE a new teacher assignment
const createTeacherAssignment = async (req, res) => {
  try {
    const { teacherId, subjectId, classId } = req.body;

    if (!teacherId || !subjectId || !classId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await teacherAssignment.findOne({
      teacherId,
      subjectId,
      classId,
    });

    if (exists) {
      return res.status(409).json({
        message: "This assignment already exists",
      });
    }

    const newAssignment = new teacherAssignment({
      teacherId,
      subjectId,
      classId,
    });

    await newAssignment.save();

    res.status(201).json({
      message: "Teacher assignment created successfully",
      assignment: newAssignment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//DELETE a teacher assignment by ID
const deleteTeacherAssignment = async (req, res) => {
  try {
    const deletedAssignment = await teacherAssignment.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedAssignment) {
      return res.status(404).json({ message: "Teacher assignment not found" });
    }

    res
      .status(200)
      .json({ message: "Teacher assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllTeacherAssignments,
  createTeacherAssignment,
  getTeacherAssignmentById,
  deleteTeacherAssignment,
};
