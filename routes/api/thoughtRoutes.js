const router = require("express").Router();

const {
  getAllThoughts,
  createThought,
  getThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/Thought
router.route("/").get(getAllThoughts).post(createThought);

// /api/Thought/:thoughtId
router
  .route("/:thoughtId")
  .get(getThought)
  .delete(deleteThought)
  .put(updateThought);

router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
