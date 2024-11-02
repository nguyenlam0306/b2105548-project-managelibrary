import User from "../models/user.model.js";
import bcrypt from "bcrypt";

class UserService {
  // Lấy người dùng theo ID
  async getUserById(id) {
    return await User.findById(id)
      .populate("activeTransactions")
      .populate("prevTransactions");
  }

  // Lấy tất cả người dùng
  async getAllUsers() {
    return await User.find({})
      .populate("activeTransactions")
      .populate("prevTransactions")
      .sort({ _id: -1 });
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

  // Thêm giao dịch vào danh sách giao dịch hiện tại
  async moveToActiveTransactions(userId, transactionId) {
    const user = await User.findById(userId);
    await user.updateOne({ $push: { activeTransactions: transactionId } });
  }

  // Chuyển giao dịch vào danh sách giao dịch trước đây và xóa khỏi giao dịch hiện tại
  async moveToPrevTransactions(userId, transactionId) {
    const user = await User.findById(userId);
    await user.updateOne({ $pull: { activeTransactions: transactionId } });
    await user.updateOne({ $push: { prevTransactions: transactionId } });
  }
}

export default new UserService();
