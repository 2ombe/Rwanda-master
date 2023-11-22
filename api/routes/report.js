const express = require("express");
const router = express.Router();
const {
  createReport,
  updateReport,
  getReportReceived,
  deleteReport,
  getUsersReport,
} = require("../controllers/report");

router.route("/").post(createReport);
router.get("/mine", getReportReceived);
router.get("/received", getUsersReport);
router.route("/:id").patch(updateReport).delete(deleteReport);

module.exports = router;
