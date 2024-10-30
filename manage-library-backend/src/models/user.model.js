const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // Vai trò của người dùng, có thể là 'user', 'admin', v.v.
  createdAt: { type: Date, default: Date.now }, // Ngày tạo tài khoản
  updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật cuối cùng
});

// Middleware để cập nhật trường updatedAt trước khi lưu
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
