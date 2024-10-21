const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  fullName: String,
  studentCode: String,
  isActive: Boolean,
});
module.exports = mongoose.model("Student", StudentSchema);
