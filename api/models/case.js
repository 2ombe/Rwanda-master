const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    chapter: { type: String, required: true },
    article: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in progress", "resolved", "open", "escalated"],
      default: "pending",
    },

    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: { type: String, required: true },

    lastUpdatedOn: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
