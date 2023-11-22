const express = require("express");
const router = express.Router();

const {
  cUmushyitsi,
  getAllBashy,
  sibaUmushyitsi,
  vugAmakuru,
  getUmushyitsi,
} = require("../controllers/umushyitsi");

router.route("/").post(cUmushyitsi).get(getAllBashy);
router
  .route("/:id")
  .delete(sibaUmushyitsi)
  .patch(vugAmakuru)
  .get(getUmushyitsi);

module.exports = router;
