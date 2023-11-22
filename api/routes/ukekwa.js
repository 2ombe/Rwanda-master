const express = require("express");
const router = express.Router();

const {
  ukekwa,
  updateUkekwa,
  andikaUkekwa,
  abakekwa,
  deleteAbakekwa,
  markUcyekwa,
  unMarkUcyekwa,
  abanjye,
  ibyaha,
} = require("../controllers/ukekwa");

router.route("/").get(abakekwa).post(andikaUkekwa);
router.route("/:id").get(ukekwa).patch(updateUkekwa).delete(deleteAbakekwa);
router.route("/:id/mark").put(markUcyekwa);
router.get("/ibyaha", ibyaha);
router.route("/:id/unmark").put(unMarkUcyekwa);
router.route("/abanjye/bose").get(abanjye);

module.exports = router;
