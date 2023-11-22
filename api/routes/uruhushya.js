const express = require("express");
const {
  createEvent,
  getAllEvents,
  updateEvent,
} = require("../controllers/uruhushya");
const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.put("/:id", updateEvent);

module.exports = router;
