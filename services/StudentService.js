const Student = require("../models/Student");

const createStudent = (fullName, studentCode, isActive) => {
  return new Promise(async (resolve, reject) => {
    const newStudent = new Student({ fullName, studentCode, isActive });
    try {
      const student = await newStudent.save();
      const result = {
        _id: student._id,
        name: student.fullName,
        studentCode: student.studentCode,
        isActive: student.isActive,
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllStudent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allStudents = await Student.find();
      if (Array.isArray(allStudents)) {
        const result = allStudents.map((student) => ({
          _id: student._id,
          name: student.fullName,
          studentCode: student.studentCode,
          isActive: student.isActive,
        }));
        return resolve(result);
      }
      const result = {
        _id: allStudents._id,
        name: allStudents.fullName,
        studentCode: allStudents.studentCode,
        isActive: allStudents.isActive,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const getStudentById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await Student.findById(id);
      if (!student) {
        return resolve({
          status: 404,
          message: "Student does not exist",
        });
      }
      const result = {
        _id: student._id,
        name: student.fullName,
        studentCode: student.studentCode,
        isActive: student.isActive,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const updateStudent = async (id, name, isActive) => {
  return new Promise(async (resolve, reject) => {
    try {
      let student = await Student.findById(id);
      if (!student) {
        return resolve({
          status: 404,
          message: "Not Found",
        });
      }

      student.fullName = name;
      student.isActive = isActive;

      const updatedStudent = await student.save();
      const result = {
        _id: updatedStudent._id,
        name: updatedStudent.fullName,
        studentCode: updatedStudent.studentCode,
        isActive: updatedStudent.isActive,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteStudent = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        return resolve({
          status: 404,
          message: "Student not found",
        });
      }
      resolve(student);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
