const mongoose = require("mongoose");
const classes = require("./classes");

const studentSchema = new mongoose.Schema({
  student_Code: {
    type: String,
    required: true,
  },
  student_Name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
