const mongoose = require("mongoose");
const Subject = require("./subject");
const Teacher = require("./teacher");
const Class = require("./classes");

const teacherAssignmentSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

module.exports = mongoose.model("TeacherAssignment", teacherAssignmentSchema);
