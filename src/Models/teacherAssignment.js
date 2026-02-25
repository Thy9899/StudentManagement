const mongoose = require("mongoose");

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

  // optional but professional
  assignedAt: {
    type: Date,
    default: Date.now,
  },
});

// prevent duplicate assignment
teacherAssignmentSchema.index(
  { teacherId: 1, subjectId: 1, classId: 1 },
  { unique: true },
);

module.exports = mongoose.model("TeacherAssignment", teacherAssignmentSchema);
