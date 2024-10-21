const Student = require("../models/Student");
const StudentService = require("../services/StudentService");

const dataStudent = async (req, res) => {
  return res.status(200).json({
    data: {
      fullName: "Nguyen Ngoc Duy",
      studentCode: "QE170221",
    },
  });
};

const createStudent = async (req, res) => {
  const { name, studentCode, isActive } = req.body;
  try {
    // Validate if fullName, studentCode, and isActive are present
    if (!name || !studentCode || typeof isActive === "undefined") {
      return res.status(400).json({
        success: false,
        message: "name, studentCode, and isActive are required",
      });
    }
    const student = await Student.findOne({ studentCode });
    if (student) {
      return res.status(409).json({
        success: false,
        message: "Student code already exists, please try another one",
      });
    }

    const studentCreate = await StudentService.createStudent(
      name,
      studentCode,
      isActive
    );

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: studentCreate,
    });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error during student creation:", error);
    res.status(500).json({
      success: false,
      message: "Creation failed due to server error",
    });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const allStudent = await StudentService.getAllStudent();
    return res.status(200).json({
      success: true,
      data: allStudent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await StudentService.getStudentById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "404 Not Found" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, isActive } = req.body;
  if (!id || !name || typeof isActive === "undefined") {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
    });
  }

  try {
    const studentAfterUpdate = await StudentService.updateStudent(
      id,
      name,
      isActive
    );
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: studentAfterUpdate,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid student code format" });
  }
  try {
    const deletedStudent = await StudentService.deleteStudent(id);
    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong on the server" });
  }
};

module.exports = {
  dataStudent,
  createStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
