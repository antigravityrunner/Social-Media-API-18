const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  makeFriends,
  deleteFriends,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

router
  .route("/:userId/friends/:friendId")
  .post(makeFriends)
  .delete(deleteFriends);

module.exports = router;
