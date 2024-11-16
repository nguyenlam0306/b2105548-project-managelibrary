import User from "../models/user.model.js";
import bcrypt from "bcrypt";

class UserService {
  // Lấy người dùng theo ID
  async getUserById(id) {
    return await User.findById(id);
  }

  // Lấy tất cả người dùng
  async getAllUsers() {
    return await User.find({});
  }

  // Cập nhật người dùng theo ID
  async updateUserById(id, data) {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    return await User.findByIdAndUpdate(id, { $set: data });
  }

  // Xóa người dùng theo ID
  async deleteUserById(id) {
    return await User.findByIdAndDelete(id);
  }

}

export default new UserService();
