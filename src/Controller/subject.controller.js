const Subject = require("../Models/subject");

//GET all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//GET a subject by ID
const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//CREATE a new subject
const createSubject = async (req, res) => {
  try {
    const { subjectName } = req.body;

    if (!subjectName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Subject.findOne({ subjectName });
    if (exists) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const newSubject = new Subject({ subjectName });

    await newSubject.save();

    res.status(201).json({
      message: "Subject created successfully",
      subject: newSubject,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//UPDATE a subject by ID
const updateSubject = async (req, res) => {
  try {
    const { subjectName } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { subjectName },
      { new: true },
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({
      message: "Subject updated successfully",
      subject: updatedSubject,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
};
