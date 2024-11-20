import UserService from "../services/user.service.js";

class UserController {
 static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }

 static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }


  static async updateUserById(req, res) {
    // console.log(req.body.userId);
   
      try {
        await UserService.updateUserById(req.params.id, req.body);
        res.status(200).json("Account has been updated");
      } catch (err) {
        res.status(500).json(err);
      }
    
  }

static  async deleteUserById(req, res) {
    
      try {
        await UserService.deleteUserById(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
   
  }
}

export default UserController;
