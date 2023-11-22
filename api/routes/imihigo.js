const express = require("express");
const {
  createGoal,
  getGoal,
  updateGoal,
  getAllGoal,
} = require("../controllers/imihigo");
const router = express.Router();

router.route("/").post(createGoal).get(getAllGoal);

router.get("/:id", getGoal);

router.put("/:id", updateGoal);

module.exports = router;
