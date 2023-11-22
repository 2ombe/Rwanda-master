const express = require("express");
const router = express.Router();

const {
  login,
  register,
  getSingleUser,
  updateProfile,
  updatedUser,
  followUser,
  getAllUsers,
  searchUsers,
} = require("../controllers/auth");
const { isAuth } = require("../middleware/authentication");

router.post("/register", register);
router.get("/user", getSingleUser);
router.put("/profile", updateProfile);
router.put("/akazi", updatedUser);
router.put("/:id/follow", isAuth, followUser);
router.get("/", isAuth, searchUsers);
router.post("/login", login);
router.get("/all", isAuth, getAllUsers);

module.exports = router;
