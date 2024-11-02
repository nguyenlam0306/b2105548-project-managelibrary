import authService from "../services/auth.service.js";

class AuthController {

  async register(req, res) {
    try {
      const user = await authService.registerUser(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json("Error registering user");
    }
  }

  async login(req, res) {
    try {
      const { admissionId, employeeId, password } = req.body;
      const user = await authService.loginUser(
        admissionId,
        employeeId,
        password
      );
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(404).json(err.message);
    }
  }
}

export default new AuthController();
