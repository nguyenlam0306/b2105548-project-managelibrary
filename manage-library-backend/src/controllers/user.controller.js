import * as userService from "../services/user.service.js";

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUserById = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await userService.updateUserById(req.params.id, req.body);
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
};

export const deleteUserById = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await userService.deleteUserById(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
};

export const moveToActiveTransactions = async (req, res) => {
  if (req.body.isAdmin) {
    try {
      await userService.moveToActiveTransactions(
        req.body.userId,
        req.params.id
      );
      res.status(200).json("Added to Active Transaction");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only Admin can add a transaction");
  }
};

export const moveToPrevTransactions = async (req, res) => {
  if (req.body.isAdmin) {
    try {
      await userService.moveToPrevTransactions(req.body.userId, req.params.id);
      res.status(200).json("Added to Prev transaction Transaction");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only Admin can do this");
  }
};
