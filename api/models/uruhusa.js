const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  impamvu: {
    type: String,
    required: true,
    enum: [
      "kuganira",
      "Uruhushya",
      "Guhura numuyobozi",
      "icyangombwa",
      "Ubusobanuro",
    ],
    default: "kuganira",
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
