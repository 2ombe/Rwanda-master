const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: { type: String, required: true },
  requestedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, default: Date.now, required: true },
  status: { type: String, enum: ["pending", "in progress", "approved"] },
  accepted: { Boolean, default: false },
  remarks: {
    type: String,
    default: "",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
