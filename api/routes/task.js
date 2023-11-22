const express = require("express");
const { getTasks, createTask, updateTask } = require("../controllers/task");
const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.put("/:id", updateTask);

module.exports = router;
