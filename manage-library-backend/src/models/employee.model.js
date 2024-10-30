const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  EmployeeID: { type: String, required: true, unique: true },
  FullName: { type: String, required: true },
  Password: { type: String, required: true },
  Position: { type: String, required: true },
  Address: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
