import bcrypt from "bcrypt";
import User from "../models/user.model.js";

class authService {
  async registerUser(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = new User({
      ...data,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  async loginUser(admissionId, employeeId, password) {
    const user = admissionId
      ? await User.findOne({ admissionId })
      : await User.findOne({ employeeId });

    if (!user) throw new Error("User not found");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Wrong password");

    return user;
  }
}

export default new authService();
