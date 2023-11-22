const express = require("express");
const router = express.Router();
const {
  ubusabe,
  ubusabeBwose,
  request,
  accessIganiriro,
  createGroupConversation,
  chillWithLeader,
  renameGroup,
  addNewParticipants,
  removeFromGroup,
} = require("../controllers/iganiriro");

router.route("/").post(accessIganiriro).get(ubusabeBwose);
router.route("/itsinda").post(createGroupConversation);
router.post("/ubuyobozi", chillWithLeader);
router.put("/rename", renameGroup);
router.put("/add", addNewParticipants);
router.put("/siba", removeFromGroup);

module.exports = router;
