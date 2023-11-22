const express = require("express");
const router = express.Router();
const {
  subiza,
  aboMwasubije,
  vugIgisubizo,
  igisubizo,
  sibaIgisubizo,
} = require("../controllers/subiza");

router.route("/").post(subiza).get(aboMwasubije);
router.route("/:id").patch(vugIgisubizo).delete(sibaIgisubizo).get(igisubizo);
module.exports = router;
