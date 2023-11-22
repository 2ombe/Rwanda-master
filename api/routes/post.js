const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  userPosts,
  getSinlePost,
} = require("../controllers/post");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), createPost);

router.route("/").get(getAllPosts);
router.route("/:id").patch(updatePost).delete(deletePost);
router.get("/:id", getSinlePost);
router.route("/:id/like").put(likePost);
router.route("/mypost").get(userPosts);

module.exports = router;
