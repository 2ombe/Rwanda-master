const express = require("express");
const { allMessages, sendMessage } = require("../controllers/message");

const router = express.Router();

router.route("/").post(sendMessage);
router.get("/:chatId", allMessages);

module.exports = router;
