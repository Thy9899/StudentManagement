const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  academyYear: {
    type: String,
    required: true,
  },
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
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  teachingAssignment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeachingAssignment",
    },
  ],
});

module.exports = mongoose.model("Class", classSchema);
