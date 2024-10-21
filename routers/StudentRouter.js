const StudentController = require("../controllers/StudentController");
const express = require("express");
const router = express.Router(); // Add the missing parentheses

router.get("/info", StudentController.dataStudent);
router.post("/students", StudentController.createStudent);
router.get("/students", StudentController.getAllStudent);
router.get("/students/:id", StudentController.getStudentById);
router.put("/students/:id", StudentController.updateStudent);
router.delete("/students/:id", StudentController.deleteStudent);

module.exports = router; // Ensure this is exported correctly
