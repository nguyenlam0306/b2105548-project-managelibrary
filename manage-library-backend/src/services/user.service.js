import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUserById = async (id) => {
  return await User.findById(id)
    .populate("activeTransactions")
    .populate("prevTransactions");
};

export const getAllUsers = async () => {
  return await User.find({})
    .populate("activeTransactions")
    .populate("prevTransactions")
    .sort({ _id: -1 });
};

export const updateUserById = async (id, data) => {
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
  }
  return await User.findByIdAndUpdate(id, { $set: data });
};

export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const moveToActiveTransactions = async (userId, transactionId) => {
  const user = await User.findById(userId);
  await user.updateOne({ $push: { activeTransactions: transactionId } });
};

export const moveToPrevTransactions = async (userId, transactionId) => {
  const user = await User.findById(userId);
  await user.updateOne({ $pull: { activeTransactions: transactionId } });
  await user.updateOne({ $push: { prevTransactions: transactionId } });
};
