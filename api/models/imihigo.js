const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeline: {
    type: Date,
    required: true,
  },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    evaluators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    beneficiaries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  performance: {
    type: String,
    enum: ["Not started", "In progress", "Completed"],
    default: "Not started",
  },
});

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
