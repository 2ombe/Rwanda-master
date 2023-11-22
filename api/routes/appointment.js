const express = require("express");
const {
  requestAppointment,
  approveAppointment,
  getAppointments,
  getAppointmentsRequestedTo,
} = require("../controllers/appointment");
const router = express.Router();

router.post("/", requestAppointment);
router.put("/:id", approveAppointment);
router.get("/", getAppointments);
router.get("/requested", getAppointmentsRequestedTo);

module.exports = router;
