const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  //   classId: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //   },
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
});

module.exports = mongoose.model("Class", classSchema);
