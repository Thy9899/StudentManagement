require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./src/util/db");
const teacherRoutes = require("./src/Routes/teacher.route");
const studentRoutes = require("./src/Routes/student.route");
const classRoutes = require("./src/Routes/classes.route");
const subjectRoutes = require("./src/Routes/subject.route");
const teacherAssignmentRoutes = require("./src/Routes/teacherAssignment.route");
const cors = require("cors");

const app = express();

app.use(cors());

/* ============================================================
   MIDDLEWARE
   ============================================================ */

// Parse incoming JSON from requests
app.use(express.json());

// Logger — prints request info (method, route, time)
app.use(morgan("dev"));

/* ============================================================
   CONNECT TO MONGODB
   ============================================================ */

connectDB();

/* ============================================================
   ROUTES
   ============================================================ */

// TEACHER ROUTES
app.use("/api/teacher", teacherRoutes);

// STUDENT ROUTES
app.use("/api/students", studentRoutes);

// CLASS ROUTES
app.use("/api/classes", classRoutes);

// SUBJECT ROUTES
app.use("/api/subjects", subjectRoutes);

// TEACHER ASSIGNMENT ROUTES
app.use("/api/teacher-assignment", teacherAssignmentRoutes);

/* ============================================================
   START SERVER
   ============================================================ */

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Application running on port ${PORT}`));
