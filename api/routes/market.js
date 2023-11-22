const express = require("express");
const {
  createMarket,
  updateMarket,
  getMarket,
} = require("../controllers/market");
const router = express.Router();

router.post("/", createMarket);
router.put("/:id", updateMarket);

router.get("/", getMarket);
// router.get('/markets/:id', getMarketById);

module.exports = router;
