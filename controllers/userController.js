const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.deleteOne({ _id: req.params.userId });
      res.json(deletedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async makeFriends(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Have a falling out
  async deleteFriends(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pullAll: { friends: [req.params.friendId] } },
        { new: true }
      );
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addThoughtToUser(userId, thoughtId) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { thoughts: thoughtId } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
    }
  },

  async removeThoughtFromUser(username, thoughtId) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { username: username },
        { $pullAll: { thoughts: [thoughtId] } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
